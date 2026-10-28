#!/usr/bin/env python3
"""OGP画像 (public/og-image.png, 1200x630) を生成する。

X(Twitter) のカードは SVG を受け付けないため、OGP は PNG で持つ必要がある。
favicon.svg と同じ「黒地 + 青枠 + ラ」の意匠を踏襲し、サイトの一言説明を焼き込む。

    python3 scripts/generate-og-image.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BLACK = (0, 0, 0)
BLUE = (29, 155, 240)
WHITE = (231, 233, 234)
GRAY = (113, 118, 123)
CARD = (15, 20, 25)
BORDER = (47, 51, 54)

FONT_DIR = Path("/usr/share/fonts/noto-cjk")
BOLD = FONT_DIR / "NotoSansCJK-Bold.ttc"
BLACK_WEIGHT = FONT_DIR / "NotoSansCJK-Black.ttc"
REGULAR = FONT_DIR / "NotoSansCJK-Regular.ttc"

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og-image.png"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size, index=0)


def main() -> None:
    img = Image.new("RGB", (W, H), BLACK)
    d = ImageDraw.Draw(img)

    # 背景の淡いグラデーション（左上から青が滲む）
    for i in range(0, 620):
        alpha = int(26 * (1 - i / 620) ** 2)
        d.line([(0, i), (W, i)], fill=(0, alpha // 4, alpha))

    # ロゴ（favicon.svg と同じ意匠）
    d.rounded_rectangle([80, 84, 80 + 168, 84 + 168], radius=34, fill=BLACK)
    d.rounded_rectangle(
        [80 + 12, 84 + 12, 80 + 156, 84 + 156], radius=24, outline=BLUE, width=11
    )
    logo_font = font(BLACK_WEIGHT, 112)
    d.text((80 + 84, 84 + 86), "ラ", font=logo_font, fill=BLUE, anchor="mm")

    title_font = font(BLACK_WEIGHT, 92)
    d.text((292, 128), "ライララ(仮)", font=title_font, fill=WHITE, anchor="lm")

    tagline_font = font(BOLD, 38)
    d.text(
        (296, 214),
        "YouTubeのコメントを X/Twitter 風に",
        font=tagline_font,
        fill=BLUE,
        anchor="lm",
    )

    # コメント欄のイメージ（実際の画面の見た目に寄せる）
    card = [80, 292, W - 80, 536]
    d.rounded_rectangle(card, radius=22, fill=CARD, outline=BORDER, width=2)

    ax, ay = 126, 336
    d.ellipse([ax, ay, ax + 76, ay + 76], fill=(32, 48, 66), outline=BLUE, width=3)
    d.text((ax + 38, ay + 36), "名", font=font(BOLD, 36), fill=BLUE, anchor="mm")

    name_font = font(BOLD, 32)
    meta_font = font(REGULAR, 26)
    body_font = font(REGULAR, 36)

    d.text((ax + 96, ay + 2), "視聴者", font=name_font, fill=WHITE, anchor="la")
    d.text((ax + 96, ay + 44), "@lailala_app・2時間", font=meta_font, fill=GRAY, anchor="la")
    d.text((ax + 96, ay + 92), "屋上焼いてて草", font=body_font, fill=WHITE, anchor="la")

    # リアクション行
    rx, ry = ax + 96, ay + 150
    for label in ("♡ 128", "返信 12", "★ 保存"):
        d.text((rx, ry), label, font=meta_font, fill=GRAY, anchor="la")
        rx += d.textlength(label, font=meta_font) + 44

    # 右側: トレンド欄
    d.line([(744, 316), (744, 508)], fill=BORDER, width=2)
    d.text((790, 336), "トレンド", font=font(BOLD, 26), fill=GRAY, anchor="la")
    ty = 382
    for word in ("#屋上焼いてて草", "#YAJU&U", "#コメント欄"):
        d.text((790, ty), word, font=font(BOLD, 30), fill=BLUE, anchor="la")
        ty += 44

    # フッター
    footer_font = font(BOLD, 30)
    d.text((80, 566), "lailala.hikamers.app", font=footer_font, fill=GRAY, anchor="la")
    right = "人気順・新着順・トレンド・ブックマーク"
    d.text(
        (W - 80, 566),
        right,
        font=font(REGULAR, 28),
        fill=GRAY,
        anchor="ra",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, format="PNG", optimize=True)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
