/**
 * Article tags block
 * Displays article tags in a styled format
 */

export default function decorate(block) {
  const tagsText = block.textContent.trim();
  
  // Clear the block
  block.innerHTML = '';
  
  // Create tags container
  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('article-tags-container');
  
  // Split tags by comma
  const tags = tagsText.split(',').map(tag => tag.trim()).filter(tag => tag);
  
  // Create tag elements
  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('article-tag');
    tagEl.textContent = tag;
    tagsContainer.appendChild(tagEl);
  });
  
  block.appendChild(tagsContainer);
}