import fitz

doc = fitz.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/hs_power_services_profile.pdf')
p1 = doc[0]

for i, img_info in enumerate(p1.get_images()):
    xref = img_info[0]
    base_img = doc.extract_image(xref)
    ext = base_img['ext']
    fname = f'c:/Users/akars/OneDrive/Desktop/HS Power Services/p1_img_{i}_xref_{xref}.{ext}'
    with open(fname, 'wb') as f:
        f.write(base_img['image'])
    w = base_img['width']
    h = base_img['height']
    print(f"Extracted image {i}: xref {xref}, size {w}x{h}, ext {ext}")
