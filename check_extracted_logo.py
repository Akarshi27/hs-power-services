from PIL import Image
import numpy as np

im = Image.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/p1_img_0_xref_39.jpeg')
print("Image size:", im.size)

# Let's save a clean PNG version of it
im.save('c:/Users/akars/OneDrive/Desktop/HS Power Services/logo_extracted.png')
print("Saved logo_extracted.png")

# Also check hs_power_services.jpg
im2 = Image.open('c:/Users/akars/OneDrive/Desktop/HS Power Services/hs_power_services.jpg')
print("hs_power_services.jpg size:", im2.size)
