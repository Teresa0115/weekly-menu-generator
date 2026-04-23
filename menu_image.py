from PIL import Image, ImageDraw, ImageFont
import os

# ── 每週修改這裡 ──────────────────────────
WEEK = "本週菜單"
DATE = "2026.04.22"
ITEMS = [
    ("鹹派雞肉", "NT$ 125"),
    ("鹹派培根", "NT$ 125"),
    ("原味可頌", "NT$ 70"),
    ("法棍",     "NT$ 95"),
    ("巧克力可頌","NT$ 80"),
]
# ─────────────────────────────────────────

# 顏色
BG      = "#F8F5F1"
INK     = "#1C1814"
INK_LT  = "#9A948C"
ACCENT  = "#B8956A"
RULE    = "#E0DAD2"

W, H = 1200, 630

img  = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── 字型（Windows 內建中文字型）──
def load_font(size, bold=False):
    # 微軟正黑體支援繁體中文
    paths = [
        "C:/Windows/Fonts/msjhbd.ttc",   # 微軟正黑體 Bold
        "C:/Windows/Fonts/msjh.ttc",     # 微軟正黑體
        "C:/Windows/Fonts/mingliu.ttc",  # 細明體
        "C:/Windows/Fonts/kaiu.ttf",     # 標楷體
        "C:/Windows/Fonts/arial.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

font_brand  = load_font(22)
font_title  = load_font(64, bold=True)
font_item   = load_font(32)
font_price  = load_font(32)
font_sub    = load_font(20)

# ── 左右邊距 ──
PAD = 100

# ── 品牌名 ──
draw.text((PAD, 54), "Nosif Pastry", font=font_brand, fill=INK_LT)

# ── 右側日期 ──
date_w = draw.textlength(DATE, font=font_sub)
draw.text((W - PAD - date_w, 58), DATE, font=font_sub, fill=INK_LT)

# ── 頂部分隔線 ──
draw.line([(PAD, 96), (W - PAD, 96)], fill=RULE, width=1)

# ── 主標題 ──
draw.text((PAD, 120), WEEK, font=font_title, fill=INK)

# ── 副標 ──
draw.text((PAD, 206), "每週限量　售完為止", font=font_sub, fill=INK_LT)

# ── 分隔線 ──
draw.line([(PAD, 248), (W - PAD, 248)], fill=ACCENT, width=1)

# ── 品項列表 ──
y = 272
ROW_H = 56

for name, price in ITEMS:
    # 品項名
    draw.text((PAD, y), name, font=font_item, fill=INK)
    # 價格（靠右）
    price_w = draw.textlength(price, font=font_price)
    draw.text((W - PAD - price_w, y), price, font=font_price, fill=INK_LT)
    # 點線
    name_w  = draw.textlength(name, font=font_item)
    dot_x   = PAD + name_w + 16
    dot_end = W - PAD - price_w - 16
    dot_y   = y + 20
    x = dot_x
    while x < dot_end:
        draw.ellipse([(x, dot_y), (x+2, dot_y+2)], fill=RULE)
        x += 10
    y += ROW_H

# ── 底部分隔線 ──
draw.line([(PAD, y + 8), (W - PAD, y + 8)], fill=RULE, width=1)

# ── 底部文字 ──
footer = "預訂請私訊 Line @loy7576g 或 Facebook Nosif Pastry"
footer_w = draw.textlength(footer, font=font_sub)
draw.text(((W - footer_w) / 2, y + 22), footer, font=font_sub, fill=INK_LT)

# ── 存檔 ──
out = "menu_this_week.png"
img.save(out)
print(f"圖片已儲存：{out}")
