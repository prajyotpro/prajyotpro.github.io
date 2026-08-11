#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = './_posts';
const outputDir = './src/content/blog';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const { data, content: body } = matter(content);
  
  // Skip draft/copy files
  if (file.includes('copy')) return;
  
  // Convert frontmatter
  const newFrontmatter = {
    title: data.title || file.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' '),
    description: data.excerpt || data.description || 'Blog post',
    pubDate: data.date ? new Date(data.date) : new Date(file.substring(0, 10)),
    updatedDate: data.updated || data.lastmod ? new Date(data.updated || data.lastmod) : undefined,
    heroImage: data.image || data.heroImage || data.featured_image ? 
      (data.image || data.heroImage || data.featured_image) : undefined,
    tags: data.tags || data.categories || [],
    author: data.author || 'Prajyot Khandeparkar',
    draft: false,
  };
  
  // Clean up tags
  if (Array.isArray(newFrontmatter.tags)) {
    newFrontmatter.tags = newFrontmatter.tags.map(t => 
      typeof t === 'string' ? t.trim() : t
    ).filter(Boolean);
  }
  
  // Create new filename (remove date prefix)
  const newName = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\s+/g, '-').toLowerCase();
  
  // Build new content
  let newContent = '---\n';
  for (const [key, value] of Object.entries(newFrontmatter)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      newContent += `${key}: ${JSON.stringify(value)}\n`;
    } else if (value instanceof Date) {
      newContent += `${key}: ${value.toISOString()}\n`;
    } else {
      newContent += `${key}: ${JSON.stringify(value)}\n`;
    }
  }
  newContent += '---\n\n';
  newContent += body;
  
  fs.writeFileSync(path.join(outputDir, newName), newContent);
  console.log(`Migrated: ${file} -> ${newName}`);
});

console.log('Migration complete!');