/**
 * Client-side image compressor & optimizer
 * Downsamples high-resolution photos to web-friendly sizes (WebP/JPEG)
 */
export async function optimizeImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85
): Promise<{ dataUrl: string; filename: string; sizeBytes: number; dimensions: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas context not available'));
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Estimate size
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const sizeBytes = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl,
          filename: file.name,
          sizeBytes,
          dimensions: `${width}x${height}`
        });
      };
      img.onerror = () => reject(new Error('Failed to load image for optimization'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
