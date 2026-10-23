from PIL import Image
import numpy as np

for name in ['p1_img_0_xref_39.jpeg', 'p1_img_1_xref_480.png', 'p1_img_2_xref_483.png']:
    im = Image.open(f'c:/Users/akars/OneDrive/Desktop/HS Power Services/{name}')
    arr = np.array(im)
    print(f"{name}: shape {arr.shape}, min {arr.min()}, max {arr.max()}, mean {arr.mean(axis=(0,1))[:3]}")

# Also let's check hs_power_services.jpg
im_hs = Image.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/hs_power_services.jpg')
arr_hs = np.array(im_hs)
print(f"hs_power_services.jpg: shape {arr_hs.shape}, min {arr_hs.min()}, max {arr_hs.max()}, mean {arr_hs.mean(axis=(0,1))[:3]}")
