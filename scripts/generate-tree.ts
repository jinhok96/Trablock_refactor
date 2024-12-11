import fs from 'fs';
import path from 'path';

const IGNORED_PATTERNS: string[] = [
  '.git',
  '.github',
  '.husky',
  '.next',
  'certificates',
  'node_modules',
  'scripts',
  'dist',
  'build',
  'coverage',
  '*.log',
  '*.lock',
  '.env*'
];

function shouldIgnore(name: string): boolean {
  return IGNORED_PATTERNS.some((pattern: string) => {
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return regex.test(name);
    }
    return name === pattern;
  });
}

function generateTree(dir: string, prefix: string = '', isLast: boolean = true): string {
  const name = path.basename(dir);

  if (shouldIgnore(name)) {
    return '';
  }

  let tree = prefix + (isLast ? '└── ' : '├── ') + name + '\n';

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const dirs = items.filter((item: fs.Dirent) => item.isDirectory());
    const files = items.filter((item: fs.Dirent) => item.isFile());

    [...dirs, ...files].forEach((item: fs.Dirent, index: number, array: fs.Dirent[]) => {
      const isLastItem = index === array.length - 1;
      const itemPath = path.join(dir, item.name);
      const newPrefix = prefix + (isLast ? '    ' : '│   ');

      if (item.isDirectory()) {
        tree += generateTree(itemPath, newPrefix, isLastItem);
      } else if (!shouldIgnore(item.name)) {
        tree += newPrefix + (isLastItem ? '└── ' : '├── ') + item.name + '\n';
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return tree;
}

function generateProjectTree(): void {
  try {
    const projectRoot = process.cwd();
    const treeOutput = generateTree(projectRoot, '', true);
    const header = `Project Tree (Excluded: ${IGNORED_PATTERNS.join(', ')})\n\n`;
    const finalOutput = header + treeOutput;

    // Save to file
    const outputPath = path.join(projectRoot, 'project-structure.txt');
    fs.writeFileSync(outputPath, finalOutput, 'utf8');

    console.log('Project structure has been saved to project-structure.txt');
    console.log('\nProject Structure:');
    console.log(finalOutput);
  } catch (error) {
    console.error('Error generating tree structure:', error);
    process.exit(1);
  }
}

generateProjectTree();
