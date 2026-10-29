from PIL import Image, ImageDraw, ImageFont

SIZE = 180
img = Image.new("RGB", (SIZE, SIZE), "#000000")
d = ImageDraw.Draw(img)
d.rounded_rectangle([14, 14, SIZE - 14, SIZE - 14], radius=26, outline="#1d9bf0", width=11)
font = ImageFont.truetype("/usr/share/fonts/noto-cjk/NotoSansCJK-Black.ttc", 76, index=0)
text = "ラ"
bbox = d.textbbox((0, 0), text, font=font)
w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text(((SIZE - w) / 2 - bbox[0], (SIZE - h) / 2 - bbox[1] + 2), text, font=font, fill="#1d9bf0")
img.save("public/apple-touch-icon.png", "PNG", optimize=True)
print("wrote public/apple-touch-icon.png")
