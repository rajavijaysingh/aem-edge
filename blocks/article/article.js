// blocks/article/article.js
export default function decorate(block) {
  // Extract article components from block structure
  const rows = [...block.children];
  
  // First row: Article headline
  if (rows[0]) {
    rows[0].classList.add('article-headline');
  }
  
  // Second row: Article byline
  if (rows[1]) {
    rows[1].classList.add('article-byline');
  }
  
  // Third row: Featured image
  if (rows[2]) {
    rows[2].classList.add('article-featured-image');
    const img = rows[2].querySelector('img');
    if (img) {
      // Make image responsive
      img.setAttribute('loading', 'eager');
      
      // Add caption if available
      const caption = rows[2].querySelector('p');
      if (caption) {
        caption.classList.add('article-image-caption');
      }
    }
  }
  
  // Remaining rows: Article content
  for (let i = 3; i < rows.length; i += 1) {
    rows[i].classList.add('article-content-section');
    
    // Handle tags in the last row
    if (i === rows.length - 1 && rows[i].querySelector('a')) {
      rows[i].classList.add('article-tags');
      const links = rows[i].querySelectorAll('a');
      links.forEach(link => {
        link.classList.add('article-tag');
      });
    }
  }
}
  