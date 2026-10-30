#!/usr/bin/env python3
"""X 告知用画像を生成する。

「ライララ(仮) 復活しました」の告知ポストに添える画像。
X のタイムラインで切られない 1200x675（16:9）と、
プロフィール固定用の 1200x1200（1:1）の2枚を出す。

    python3 scripts/generate-revive-announcement.py
"""

from __future__ import annotations

import argparse
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

BLACK = (0, 0, 0)
BLUE = (29, 155, 240)
WHITE = (231, 233, 234)
GRAY = (113, 118, 123)
MUTED = (138, 143, 148)
CARD = (12, 16, 20)
BORDER = (47, 51, 54)
PINK = (249, 24, 128)
GREEN = (0, 186, 124)

FONT_DIR = Path("/usr/share/fonts/noto-cjk")
BLACK_WEIGHT = FONT_DIR / "NotoSansCJK-Black.ttc"
BOLD = FONT_DIR / "NotoSansCJK-Bold.ttc"
MEDIUM = FONT_DIR / "NotoSansCJK-Medium.ttc"
REGULAR = FONT_DIR / "NotoSansCJK-Regular.ttc"

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = Path("/home/maebahesioru/Downloads")


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size, index=0)


def glow(size: tuple[int, int], center: tuple[int, int], radius: int, color, strength: int) -> Image.Image:
    """ぼかした円を1枚のレイヤーとして返す（背景の光だまり）。"""
    layer = Image.new("RGB", size, BLACK)
    d = ImageDraw.Draw(layer)
    d.ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        fill=color,
    )
    layer = layer.filter(ImageFilter.GaussianBlur(radius // 2))
    return Image.blend(Image.new("RGB", size, BLACK), layer, strength / 255)


def draw_logo(d: ImageDraw.ImageDraw, x: int, y: int, box: int, letter_size: int) -> None:
    d.rounded_rectangle([x, y, x + box, y + box], radius=int(box * 0.2), fill=BLACK)
    inset = int(box * 0.07)
    d.rounded_rectangle(
        [x + inset, y + inset, x + box - inset, y + box - inset],
        radius=int(box * 0.145),
        outline=BLUE,
        width=max(4, int(box * 0.065)),
    )
    if letter_size <= 0:
        return
    d.text(
        (x + box / 2, y + box / 2 + box * 0.01),
        "ラ",
        font=font(BLACK_WEIGHT, letter_size),
        fill=BLUE,
        anchor="mm",
    )


THUMB_UP_PATH = (
    "M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32"
    "c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10"
    "c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V10z"
)
THUMB_DOWN_PATH = (
    "M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2"
    "c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59"
    "c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
)


def _flatten_path(path: str, steps: int = 12) -> list[tuple[float, float]]:
    """SVG パス（M/L/H/V/C/Z、絶対・相対・暗黙の繰り返し）を点列に展開する。"""
    import re

    tokens = re.findall(r"[A-Za-z]|-?\d*\.?\d+", path)
    pts: list[tuple[float, float]] = []
    cx = cy = 0.0
    sx = sy = 0.0
    i = 0
    cmd = ""
    while i < len(tokens):
        if tokens[i].isalpha():
            cmd = tokens[i]
            i += 1
            if cmd in "Zz":
                if pts:
                    pts.append((sx, sy))
                cx, cy = sx, sy
                cmd = ""
                continue
        if not cmd:
            break
        nargs = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6}[cmd.upper()]
        chunk = tokens[i : i + nargs]
        if len(chunk) < nargs or any(t.isalpha() for t in chunk):
            break
        nums = [float(t) for t in chunk]
        i += nargs
        up = cmd.upper()
        rel = cmd.islower()

        if up == "M":
            x, y = nums
            if rel:
                x, y = cx + x, cy + y
            cx, cy = x, y
            sx, sy = x, y
            pts.append((x, y))
            cmd = "l" if rel else "L"
        elif up == "L":
            x, y = nums
            if rel:
                x, y = cx + x, cy + y
            cx, cy = x, y
            pts.append((x, y))
        elif up == "H":
            x = nums[0] + (cx if rel else 0)
            cx = x
            pts.append((cx, cy))
        elif up == "V":
            y = nums[0] + (cy if rel else 0)
            cy = y
            pts.append((cx, cy))
        elif up == "C":
            x1, y1, x2, y2, x3, y3 = nums
            if rel:
                x1, y1, x2, y2, x3, y3 = cx + x1, cy + y1, cx + x2, cy + y2, cx + x3, cy + y3
            for k in range(1, steps + 1):
                t = k / steps
                mt = 1 - t
                bx = mt**3 * cx + 3 * mt**2 * t * x1 + 3 * mt * t**2 * x2 + t**3 * x3
                by = mt**3 * cy + 3 * mt**2 * t * y1 + 3 * mt * t**2 * y2 + t**3 * y3
                pts.append((bx, by))
            cx, cy = x3, y3
    return pts


def draw_thumb(
    d: ImageDraw.ImageDraw,
    cx: float,
    cy: float,
    size: float,
    color,
    down: bool = False,
) -> None:
    """高評価（down=False）/ 低評価（down=True）のアイコンを描く。"""
    pts = _flatten_path(THUMB_DOWN_PATH if down else THUMB_UP_PATH)
    scale = size / 24.0
    poly = [(cx - size / 2 + x * scale, cy - size / 2 + y * scale) for x, y in pts]
    d.polygon(poly, fill=color)


def draw_bookmark(d: ImageDraw.ImageDraw, cx: float, cy: float, size: float, color, width: int = 2) -> None:
    r = size / 2
    pts = [(cx - r * 0.72, cy - r), (cx + r * 0.72, cy - r), (cx + r * 0.72, cy + r),
           (cx, cy + r * 0.45), (cx - r * 0.72, cy + r)]
    d.line(pts + [pts[0]], fill=color, width=width, joint="curve")


def draw_share(d: ImageDraw.ImageDraw, cx: float, cy: float, size: float, color, width: int = 2) -> None:
    r = size / 2
    # 上向き矢印
    d.line([(cx, cy + r * 0.95), (cx, cy - r * 0.75)], fill=color, width=width)
    d.line([(cx - r * 0.55, cy - r * 0.2), (cx, cy - r * 0.75)], fill=color, width=width)
    d.line([(cx + r * 0.55, cy - r * 0.2), (cx, cy - r * 0.75)], fill=color, width=width)
    # トレイ
    d.line([(cx - r * 0.85, cy + r * 0.2), (cx - r * 0.85, cy + r * 0.95)], fill=color, width=width)
    d.line([(cx + r * 0.85, cy + r * 0.2), (cx + r * 0.85, cy + r * 0.95)], fill=color, width=width)
    d.line([(cx - r * 0.85, cy + r * 0.95), (cx + r * 0.85, cy + r * 0.95)], fill=color, width=width)


def draw_reply_bubble(d: ImageDraw.ImageDraw, cx: float, cy: float, size: float, color, width: int = 2) -> None:
    """返信（吹き出し）アイコン。"""
    r = size / 2
    d.rounded_rectangle(
        [cx - r, cy - r * 0.85, cx + r, cy + r * 0.55],
        radius=int(r * 0.5),
        outline=color,
        width=width,
    )
    tail = [(cx - r * 0.55, cy + r * 0.5), (cx - r * 0.75, cy + r * 1.0), (cx - r * 0.1, cy + r * 0.52)]
    d.polygon(tail, fill=color)


CARD_NAME = "ヒカマー"
CARD_HANDLE = "@hikama"


def comment_card(d: ImageDraw.ImageDraw, box: tuple[int, int, int, int], scale: float = 1.0) -> None:
    """X 風のポストカードを1枚描く（本文は折り返して枠内に収める）。"""
    x0, y0, x1, y1 = box
    pad = int(28 * scale)
    d.rounded_rectangle([x0, y0, x1, y1], radius=int(24 * scale), fill=CARD, outline=BORDER, width=2)

    ax, ay = x0 + pad, y0 + pad
    ar = int(24 * scale)
    d.ellipse([ax, ay, ax + ar * 2, ay + ar * 2], fill=(32, 39, 45))

    name_font = font(BOLD, int(25 * scale))
    handle_font = font(REGULAR, int(21 * scale))
    d.text((ax + ar * 2 + int(14 * scale), ay + int(2 * scale)), CARD_NAME, font=name_font, fill=WHITE)
    handle_text = f"{CARD_HANDLE}  ・ 2時間" if CARD_HANDLE else "2時間"
    d.text(
        (ax + ar * 2 + int(14 * scale), ay + int(34 * scale)),
        handle_text,
        font=handle_font,
        fill=GRAY,
    )

    body_font = font(MEDIUM, int(26 * scale))
    max_w = (x1 - x0) - pad * 2
    lines = wrap("Twitter死んだらここに来るといいって聞いて来たけど", d, body_font, max_w) + ["マジで有能で草"]

    by = ay + ar * 2 + int(26 * scale)
    line_h = int(36 * scale)
    for i, line in enumerate(lines):
        d.text((ax, by + i * line_h), line, font=body_font, fill=WHITE)

    iy = by + len(lines) * line_h + int(12 * scale)
    icon = int(24 * scale)
    gap = int(22 * scale)
    ix = ax + int(2 * scale)

    # サイトのアクション列（高評価 / 低評価 / 返信 / 保存 / シェア）をそのまま並べる
    draw_thumb(d, ix + icon / 2, iy + icon / 2, icon * 0.95, MUTED)
    d.text((ix + icon + int(7 * scale), iy + int(1 * scale)), "8.3千", font=handle_font, fill=MUTED)
    x = ix + icon + int(7 * scale) + d.textlength("8.3千", font=handle_font) + gap

    draw_thumb(d, x + icon / 2, iy + icon / 2, icon * 0.95, MUTED, down=True)
    d.text((x + icon + int(7 * scale), iy + int(1 * scale)), "12", font=handle_font, fill=MUTED)
    x += icon + int(7 * scale) + d.textlength("12", font=handle_font) + gap

    draw_reply_bubble(d, x + icon / 2, iy + icon / 2, icon * 0.92, MUTED, width=max(2, int(2.2 * scale)))
    d.text((x + icon + int(7 * scale), iy + int(1 * scale)), "107", font=handle_font, fill=MUTED)
    x += icon + int(7 * scale) + d.textlength("107", font=handle_font) + gap

    draw_bookmark(d, x + icon / 2, iy + icon / 2, icon * 0.92, MUTED, width=max(2, int(2.2 * scale)))
    x += icon + gap
    draw_share(d, x + icon / 2, iy + icon / 2, icon * 0.92, MUTED, width=max(2, int(2.2 * scale)))


def fit_size(d: ImageDraw.ImageDraw, text: str, path: Path, max_size: int, max_width: int) -> int:
    """max_width に収まる最大のフォントサイズを返す。"""
    size = max_size
    while size > 10:
        if d.textlength(text, font=font(path, size)) <= max_width:
            return size
        size -= 2
    return 10


def wrap(text: str, d: ImageDraw.ImageDraw, f: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines, cur = [], ""
    for ch in text:
        if d.textlength(cur + ch, font=f) <= max_width:
            cur += ch
        else:
            lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    return lines


def build_wide() -> Image.Image:
    W, H = 1200, 675
    img = glow((W, H), (250, 120), 620, (0, 60, 120), 150)
    img = Image.blend(img, glow((W, H), (1120, 620), 520, (90, 10, 60), 120), 0.5)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, W, 6], fill=BLUE)

    # --- 左カラム（幅 560 に収める） ---------------------------------
    LEFT, LEFT_W = 84, 560

    draw_logo(d, LEFT, 62, 118, 74)

    kicker_font = font(BOLD, 27)
    d.text((LEFT + 150, 78), "YouTubeのコメントを", font=kicker_font, fill=GRAY)
    d.text((LEFT + 150, 116), "X/Twitter 風に", font=kicker_font, fill=GRAY)

    title_size = fit_size(d, "ライララ(仮)", BLACK_WEIGHT, 68, LEFT_W)
    d.text((LEFT, 196), "ライララ(仮)", font=font(BLACK_WEIGHT, title_size), fill=WHITE)

    revive_size = fit_size(d, "復活しました。", BLACK_WEIGHT, 104, LEFT_W)
    rf = font(BLACK_WEIGHT, revive_size)
    d.text((LEFT, 286), "復活しました。", font=rf, fill=WHITE)
    d.text((LEFT, 286), "復活", font=rf, fill=BLUE)

    sub_font = font(MEDIUM, 28)
    d.text((LEFT, 424), "あのコメント欄が、また読めます。", font=sub_font, fill=WHITE)

    meta_font = font(REGULAR, 23)
    meta_lines = wrap("重い所も壊れてた所も全部直して、動作も軽くなりました。", d, meta_font, LEFT_W)
    for i, line in enumerate(meta_lines):
        d.text((LEFT, 474 + i * 34), line, font=meta_font, fill=GRAY)

    # URL ピル
    pill_font = font(BOLD, 30)
    label = "lailala.hikamers.app"
    tw = d.textlength(label, font=pill_font)
    px0, py0 = LEFT, 566
    d.rounded_rectangle([px0, py0, px0 + tw + 104, py0 + 62], radius=31, fill=(14, 22, 30), outline=BLUE, width=3)
    d.ellipse([px0 + 24, py0 + 23, px0 + 40, py0 + 39], fill=GREEN)
    d.text((px0 + 60, py0 + 13), label, font=pill_font, fill=WHITE)

    # --- 右カラム（X 風カード） --------------------------------------
    comment_card(d, (700, 150, 1120, 448), scale=0.94)

    badge_font = font(BOLD, 22)
    badge = "2026.10.30 全面復旧"
    bw = d.textlength(badge, font=badge_font)
    d.rounded_rectangle([1120 - bw - 36, 74, 1120, 114], radius=20, fill=(16, 28, 36), outline=BORDER, width=2)
    d.text((1120 - bw - 18, 81), badge, font=badge_font, fill=BLUE)

    return img


def build_square() -> Image.Image:
    W = H = 1200
    img = glow((W, H), (300, 260), 700, (0, 70, 140), 160)
    img = Image.blend(img, glow((W, H), (1050, 1000), 620, (90, 10, 60), 110), 0.5)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=BLUE)

    LEFT, LEFT_W = 96, 1000

    draw_logo(d, LEFT, 120, 150, 96)

    kicker_font = font(BOLD, 36)
    d.text((LEFT + 190, 152), "YouTubeのコメントが、", font=kicker_font, fill=GRAY)
    d.text((LEFT + 190, 200), "Xみたいに読める。", font=kicker_font, fill=GRAY)

    title_size = fit_size(d, "ライララ(仮)", BLACK_WEIGHT, 96, LEFT_W)
    d.text((LEFT, 320), "ライララ(仮)", font=font(BLACK_WEIGHT, title_size), fill=WHITE)

    revive_size = fit_size(d, "復活しました", BLACK_WEIGHT, 150, LEFT_W)
    rf = font(BLACK_WEIGHT, revive_size)
    d.text((LEFT, 432), "復活", font=rf, fill=BLUE)
    x2 = LEFT + d.textlength("復活", font=rf) + 12
    d.text((x2, 432), "しました", font=rf, fill=WHITE)

    sub_font = font(MEDIUM, 40)
    d.text((LEFT, 632), "あのコメント欄が、また読める。", font=sub_font, fill=WHITE)

    meta_font = font(REGULAR, 30)
    meta_lines = wrap("重い所・壊れてた所は全部直しました。", d, meta_font, LEFT_W)
    for i, line in enumerate(meta_lines):
        d.text((LEFT, 700 + i * 44), line, font=meta_font, fill=GRAY)

    comment_card(d, (96, 796, 1104, 1058), scale=1.16)

    pill_font = font(BOLD, 38)
    label = "lailala.hikamers.app"
    tw = d.textlength(label, font=pill_font)
    d.rounded_rectangle([LEFT, 1104, LEFT + tw + 120, 1104 + 72], radius=36, fill=(14, 22, 30), outline=BLUE, width=3)
    d.ellipse([LEFT + 28, 1128, LEFT + 48, 1148], fill=GREEN)
    d.text((LEFT + 70, 1119), label, font=pill_font, fill=WHITE)

    return img


def main() -> None:
    global CARD_NAME, CARD_HANDLE
    parser = argparse.ArgumentParser(description="X 告知画像を生成する")
    parser.add_argument("--name", default=CARD_NAME, help="カードに出す表示名")
    parser.add_argument("--handle", default=CARD_HANDLE, help="カードに出す @ハンドル")
    parser.add_argument("--suffix", default="", help="出力ファイル名の接尾辞")
    args = parser.parse_args()
    CARD_NAME, CARD_HANDLE = args.name, args.handle

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    wide = build_wide()
    wide_path = OUT_DIR / f"lailala_revive_1200x675{args.suffix}.png"
    wide.save(wide_path, optimize=True)

    square = build_square()
    square_path = OUT_DIR / f"lailala_revive_1200x1200{args.suffix}.png"
    square.save(square_path, optimize=True)

    for p in (wide_path, square_path):
        with Image.open(p) as im:
            print(f"{p} {im.width}x{im.height} {p.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
