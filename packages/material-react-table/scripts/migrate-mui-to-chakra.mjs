#!/usr/bin/env node

/**
 * Migration utility script to help with the transition from Material UI to Chakra UI.
 * 
 * This script can:
 * 1. Rename MRT_ prefixed files to CRT_ prefixed files
 * 2. Update imports from @mui/* to @chakra-ui/react
 * 3. Update component prefixes from MRT_ to CRT_
 * 4. Replace Material UI component names with their Chakra UI equivalents
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Component mapping from Material UI to Chakra UI
const componentMap = {
  // MUI Components to Chakra Components
  'Box': 'Box',
  'Button': 'Button',
  'Checkbox': 'Checkbox',
  'Chip': 'Tag',
  'FormControlLabel': 'FormControl',
  'IconButton': 'IconButton',
  'LinearProgress': 'Progress',
  'Menu': 'Menu',
  'MenuItem': 'MenuItem',
  'Paper': 'Card',
  'Select': 'Select',
  'Skeleton': 'Skeleton',
  'Slider': 'Slider',
  'Stack': 'Stack',
  'TableCell': 'Td',
  'TableContainer': 'TableContainer',
  'TableHead': 'Thead',
  'Table': 'Table',
  'TableRow': 'Tr',
  'TextField': 'Input',
  'Tooltip': 'Tooltip',
  'Typography': 'Text',
  
  // Prop name transformations
  'sx': 'sx',
  'variant': 'variant',
  'size': 'size',
  'color': 'colorScheme',
  'disabled': 'isDisabled',
  'label': 'aria-label',
  'onChange': 'onChange',
  'onClick': 'onClick',
  'className': 'className',
};

// Import replacements
const importReplacements = {
  '@mui/material': '@chakra-ui/react',
  '@mui/material/Box': '@chakra-ui/react',
  '@mui/material/Button': '@chakra-ui/react',
  '@mui/material/Checkbox': '@chakra-ui/react',
  '@mui/material/Chip': '@chakra-ui/react',
  '@mui/material/FormControlLabel': '@chakra-ui/react',
  '@mui/material/IconButton': '@chakra-ui/react',
  '@mui/material/LinearProgress': '@chakra-ui/react',
  '@mui/material/Menu': '@chakra-ui/react',
  '@mui/material/MenuItem': '@chakra-ui/react',
  '@mui/material/Paper': '@chakra-ui/react',
  '@mui/material/Select': '@chakra-ui/react',
  '@mui/material/Skeleton': '@chakra-ui/react',
  '@mui/material/Slider': '@chakra-ui/react',
  '@mui/material/Stack': '@chakra-ui/react',
  '@mui/material/TableCell': '@chakra-ui/react',
  '@mui/material/TableContainer': '@chakra-ui/react',
  '@mui/material/TableHead': '@chakra-ui/react',
  '@mui/material/Table': '@chakra-ui/react',
  '@mui/material/TableRow': '@chakra-ui/react',
  '@mui/material/TextField': '@chakra-ui/react',
  '@mui/material/Tooltip': '@chakra-ui/react',
  '@mui/material/Typography': '@chakra-ui/react',
  '@mui/material/styles': '@chakra-ui/react',
};

/**
 * Create a new file with CRT_ prefix based on an existing MRT_ file
 */
function createCRTFileFromMRT(filePath) {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  
  // Only process MRT_ prefixed files
  if (!fileName.startsWith('MRT_')) {
    return;
  }
  
  const newFileName = fileName.replace('MRT_', 'CRT_');
  const newFilePath = path.join(dirName, newFileName);
  
  console.log(`Creating ${newFilePath} from ${filePath}`);
  
  // Read original file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace imports
  for (const [oldImport, newImport] of Object.entries(importReplacements)) {
    const importRegex = new RegExp(`from ['"](${oldImport})['"]`, 'g');
    content = content.replace(importRegex, `from '${newImport}'`);
  }
  
  // Replace MRT_ with CRT_ in the content
  content = content.replace(/MRT_/g, 'CRT_');
  
  // Replace Material UI components with Chakra UI components
  for (const [muiComp, chakraComp] of Object.entries(componentMap)) {
    // Replace the component usage in JSX/TSX
    const compRegex = new RegExp(`<${muiComp}(\\s|>|\\/)`, 'g');
    content = content.replace(compRegex, `<${chakraComp}$1`);
    
    const closingCompRegex = new RegExp(`<\/${muiComp}>`, 'g');
    content = content.replace(closingCompRegex, `</${chakraComp}>`);
  }
  
  // Write new file
  fs.writeFileSync(newFilePath, content);
  console.log(`Created ${newFilePath}`);
}

/**
 * Process a directory recursively to convert MRT_ files to CRT_ files
 */
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (stat.isFile() && 
              (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) && 
              file.startsWith('MRT_')) {
      createCRTFileFromMRT(filePath);
    }
  }
}

/**
 * The main function to start the migration process
 */
function main() {
  const srcDir = path.join(rootDir, 'src');
  console.log(`Starting MUI to Chakra UI migration in ${srcDir}`);
  processDirectory(srcDir);
  console.log('Migration completed!');
}

main(); 