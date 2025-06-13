/**
 * Article template script
 * This script transforms article content into appropriate blocks
 */
import { createOptimizedPicture, buildBlock, decorateBlock } from './aem.js';

/**
 * Creates an article header block from the first section
 * @param {Element} main The main element
 */
function createArticleHeader(main) {
  const firstSection = main.querySelector('.section');
  if (firstSection) {
    const contentWrapper = firstSection.querySelector('.default-content-wrapper');
    if (contentWrapper) {
      // Find the title (h1) and byline (first p after h1)
      const h1 = contentWrapper.querySelector('h1');
      let byline = null;
      
      if (h1) {
        // Find the first paragraph after h1 that might contain byline info
        const paragraphs = [...contentWrapper.querySelectorAll('p')];
        for (let i = 0; i < paragraphs.length; i++) {
          if (paragraphs[i].textContent.includes('By') || 
              paragraphs[i].textContent.match(/\d{1,2},\s+\d{4}/)) {
            byline = paragraphs[i];
            break;
          }
        }
        
        // Create article-header block
        const headerBlock = buildBlock('article-header', [
          [h1.outerHTML],
          [byline ? byline.outerHTML : '']
        ]);
        
        // Remove the original elements
        if (h1) h1.remove();
        if (byline) byline.remove();
        
        // Insert the header block at the beginning
        contentWrapper.insertBefore(headerBlock, contentWrapper.firstChild);
        
        // Decorate the block
        decorateBlock(headerBlock);
      }
    }
  }
}

/**
 * Creates article-image blocks for images
 * @param {Element} main The main element
 */
function createArticleImages(main) {
  const firstSection = main.querySelector('.section');
  if (firstSection) {
    const contentWrapper = firstSection.querySelector('.default-content-wrapper');
    if (contentWrapper) {
      // Find paragraphs containing images
      const imageParagraphs = [...contentWrapper.querySelectorAll('p')].filter(p => 
        p.querySelector('picture') || p.querySelector('img')
      );
      
      for (const imgPara of imageParagraphs) {
        const picture = imgPara.querySelector('picture') || imgPara.querySelector('img');
        
        // Create article-image block with just the image
        // The alt text will be used as caption by the block's JS
        const imageBlock = buildBlock('article-image', [
          [picture.outerHTML]
        ]);
        
        // Replace the original paragraph with the block
        imgPara.parentNode.replaceChild(imageBlock, imgPara);
        
        // Decorate the block
        decorateBlock(imageBlock);
      }
    }
  }
}

/**
 * Transforms the second section into an article-summary block
 * @param {Element} main The main element
 */
function createArticleSummary(main) {
  const sections = main.querySelectorAll('.section');
  if (sections.length >= 2) {
    const summarySection = sections[1];
    const summaryContent = summarySection.querySelector('.default-content-wrapper');
    
    if (summaryContent) {
      // Get the summary text
      const summaryText = summaryContent.textContent.trim();
      
      if (summaryText.startsWith('English Summary:')) {
        // Create article-summary block
        const summaryBlock = buildBlock('article-summary', [
          ['English Summary'],
          [summaryText.replace('English Summary:', '').trim()]
        ]);
        
        // Replace content with the block
        summaryContent.innerHTML = '';
        summaryContent.appendChild(summaryBlock);
        
        // Decorate the block
        decorateBlock(summaryBlock);
      }
    }
  }
}

/**
 * Transforms the third section into an article-tags block
 * @param {Element} main The main element
 */
function createArticleTags(main) {
  const sections = main.querySelectorAll('.section');
  if (sections.length >= 3) {
    const tagsSection = sections[2];
    const tagsContent = tagsSection.querySelector('.default-content-wrapper');
    
    if (tagsContent) {
      const tagsText = tagsContent.textContent.trim();
      
      if (tagsText.startsWith('Tags:')) {
        // Create article-tags block
        const tagsBlock = buildBlock('article-tags', [
          [tagsText.replace('Tags:', '').trim()]
        ]);
        
        // Replace content with the block
        tagsContent.innerHTML = '';
        tagsContent.appendChild(tagsBlock);
        
        // Decorate the block
        decorateBlock(tagsBlock);
      }
    }
  }
}

/**
 * Decorates the article template
 * @param {Element} main The main element
 */
export default function decorateArticleTemplate(main) {
  if (main) {
    createArticleHeader(main);
    createArticleImages(main);
    createArticleSummary(main);
    createArticleTags(main);
  }
}