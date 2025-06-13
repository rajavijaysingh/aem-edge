/**
 * Article header block
 * Contains the article title and byline
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  // First row should contain the title
  if (rows[0]) {
    const titleDiv = rows[0].querySelector('div');
    if (titleDiv && titleDiv.querySelector('h1')) {
      const h1 = titleDiv.querySelector('h1');
      h1.classList.add('article-title');
    }
  }
  
  // Second row might contain the byline
  if (rows[1]) {
    const bylineDiv = rows[1].querySelector('div');
    if (bylineDiv) {
      bylineDiv.classList.add('article-byline');
    }
  }
}