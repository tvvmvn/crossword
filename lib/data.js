import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.json$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
 
    return {
      id,
      ...JSON.parse(fileContents)
    }
  });
}

export function getPost(id) {

  const fullPath = path.join(postsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
 
  return {
    id,
    ...JSON.parse(fileContents)
  }
}
