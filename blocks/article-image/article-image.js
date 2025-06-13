/**
 * Article image block
 * Displays an image with caption from alt text
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  // First row should contain the image
  if (rows[0]) {
    const imageDiv = rows[0].querySelector('div');
    if (imageDiv && imageDiv.querySelector('picture')) {
      const picture = imageDiv.querySelector('picture');
      picture.classList.add('article-main-image');
      
      // Make image responsive
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('responsive-image');
        
        // Create a figure element
        const figure = document.createElement('figure');
        figure.classList.add('article-figure');
        
        // Move the picture into the figure
        figure.appendChild(picture);
        
        // Use alt text as caption if it exists and is not empty
        if (img.alt && img.alt.trim()) {
          const caption = document.createElement('figcaption');
          caption.classList.add('article-image-caption');
          caption.textContent = img.alt.trim();
          figure.appendChild(caption);
        }
        
        // Clear the block and add the figure
        block.innerHTML = '';
        block.appendChild(figure);
      }
    }
  }
}