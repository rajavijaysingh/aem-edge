/**
 * Article summary block
 * Displays a styled summary of the article
 */

export default function decorate(block) {
  const rows = [...block.children];
  
  // First row is the title
  if (rows[0]) {
    const titleDiv = rows[0].querySelector('div');
    if (titleDiv) {
      const title = document.createElement('h3');
      title.classList.add('article-summary-title');
      title.textContent = titleDiv.textContent;
      titleDiv.innerHTML = '';
      titleDiv.appendChild(title);
    }
  }
  
  // Second row is the summary text
  if (rows[1]) {
    const textDiv = rows[1].querySelector('div');
    if (textDiv) {
      const text = document.createElement('p');
      text.classList.add('article-summary-text');
      text.textContent = textDiv.textContent;
      textDiv.innerHTML = '';
      textDiv.appendChild(text);
    }
  }
}