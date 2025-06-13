/**
 * Article byline block
 * Displays author and date information
 */
export default function decorate(block) {
  const text = block.textContent.trim();
  
  // Clear the block
  block.innerHTML = '';
  
  // Create byline container
  const bylineContainer = document.createElement('div');
  bylineContainer.classList.add('article-byline-container');
  
  // Split by pipe or vertical bar if present
  if (text.includes('|')) {
    const [author, date] = text.split('|').map(part => part.trim());
    
    if (author) {
      const authorEl = document.createElement('span');
      authorEl.classList.add('article-author');
      authorEl.textContent = author;
      bylineContainer.appendChild(authorEl);
    }
    
    if (date) {
      const dateEl = document.createElement('span');
      dateEl.classList.add('article-date');
      dateEl.textContent = date;
      bylineContainer.appendChild(dateEl);
    }
  } else {
    // Try to detect if there's a "By" prefix for author
    const byMatch = text.match(/By\s+(.*?)\s*\|\s*(.*)/i);
    
    if (byMatch) {
      const [, author, date] = byMatch;
      
      const authorEl = document.createElement('span');
      authorEl.classList.add('article-author');
      authorEl.textContent = `By ${author}`;
      bylineContainer.appendChild(authorEl);
      
      if (date) {
        const dateEl = document.createElement('span');
        dateEl.classList.add('article-date');
        dateEl.textContent = date;
        bylineContainer.appendChild(dateEl);
      }
    } else {
      // Just use the text as is
      bylineContainer.textContent = text;
    }
  }
  
  block.appendChild(bylineContainer);
}