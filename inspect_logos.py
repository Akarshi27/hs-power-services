import fitz
from PIL import Image

doc = fitz.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/hs_power_services_profile.pdf')
p1 = doc[0]

# Render page 1 at 300 DPI
pix = p1.get_pixmap(dpi=150)
pix.save('c:/Users/akars/OneDrive/Desktop/HS Power Services/page1_preview.png')

# Let's crop the top right corner of Page 1 where xref 39 was
# rect in PDF points: (1234.6, 25.7, 1362.0, 108.2) in 1440x810
scale = pix.width / 1440.0
x0 = int(1220 * scale)
y0 = int(15 * scale)
x1 = int(1380 * scale)
y1 = int(120 * scale)

im = Image.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/page1_preview.png')
crop_logo = im.crop((x0, y0, x1, y1))
crop_logo.save('c:/Users/akars/OneDrive/Desktop/HS Power Services/page1_top_right_logo.png')
print("Cropped top right logo saved to page1_top_right_logo.png")

# Also check page 4 (where xref 62 is)
p4 = doc[3]
print("Page 4 images:", p4.get_images())
for img in p4.get_images():
    xref = img[0]
    rects = p4.get_image_rects(xref)
    print("P4 img xref", xref, "rects:", rects)
    b = doc.extract_image(xref)
    with open(f'c:/Users/akars/OneDrive/Desktop/HS Power Services/p4_img_{xref}.{b["ext"]}', 'wb') as f:
        f.write(b['image'])
