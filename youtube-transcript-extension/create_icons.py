from PIL import Image, ImageDraw, ImageFont
import os

# Create simple icons
sizes = [16, 48, 128]
colors = [(255, 0, 0), (200, 200, 200)]  # Red and gray

for size in sizes:
    # Create a new image with a white background
    img = Image.new('RGB', (size, size), 'white')
    draw = ImageDraw.Draw(img)
    
    # Draw a simple play button icon
    # Red circle
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill=colors[0])
    
    # White triangle (play button)
    triangle_margin = size // 4
    points = [
        (triangle_margin + size//8, triangle_margin),
        (triangle_margin + size//8, size - triangle_margin),
        (size - triangle_margin, size // 2)
    ]
    draw.polygon(points, fill='white')
    
    # Save the icon
    img.save(f'icon{size}.png')
    print(f'Created icon{size}.png')

print('All icons created successfully!')
