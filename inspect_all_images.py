import fitz

doc = fitz.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/hs_power_services_profile.pdf')
for i, page in enumerate(doc):
    for img in page.get_images():
        xref = img[0]
        rects = page.get_image_rects(xref)
        b = doc.extract_image(xref)
        w = b["width"]
        h = b["height"]
        ext = b["ext"]
        print(f"Page {i+1} xref {xref} ({w}x{h} {ext}) rects: {rects}")
