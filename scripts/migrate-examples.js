#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const EXAMPLES_DIR = path.resolve(
  __dirname,
  '../apps/material-react-table-docs/examples',
);
const COMPLETED_EXAMPLES = [
  'minimal',
  'linear-progress',
  'enable-column-pinning',
  'customize-table-styles',
  'persistent-state',
  'multi-sorting',
  'row-actions-buttons',
  'single-row-selection',
  'custom-headless',
]; // Skip examples already migrated

// Material UI to Chakra UI mapping
const COMPONENT_MAPPING = {
  // Basic components
  Box: 'Box',
  Button: 'Button',
  IconButton: 'IconButton',
  Typography: 'Text', // May need special handling: variant="h1" -> as="h1"
  Paper: 'Box',
  Stack: 'Stack',
  Divider: 'Divider',
  Tooltip: 'Tooltip',
  CircularProgress: 'Spinner',
  LinearProgress: 'Progress',

  // Form components
  TextField: 'Input',
  MenuItem: 'MenuItem',
  Select: 'Select',
  Checkbox: 'Checkbox',
  FormControl: 'FormControl',
  FormControlLabel: 'FormLabel',
  FormGroup: 'FormControl',
  Switch: 'Switch',

  // Table components
  Table: 'Table',
  TableContainer: 'TableContainer',
  TableHead: 'Thead',
  TableBody: 'Tbody',
  TableRow: 'Tr',
  TableCell: 'Td',
  TableFooter: 'Tfoot',
};

// Icon replacement map for common Material UI icons
const ICON_MAPPING = {
  Edit: 'MdEdit',
  Delete: 'MdDelete',
  Email: 'MdEmail',
  Add: 'MdAdd',
  Close: 'MdClose',
  Search: 'MdSearch',
  FilterList: 'MdFilterList',
  MoreVert: 'MdMoreVert',
  ArrowDropDown: 'MdArrowDropDown',
  ArrowDropUp: 'MdArrowDropUp',
  Clear: 'MdClear',
  Check: 'MdCheck',
  ExpandMore: 'MdExpandMore',
  Save: 'MdSave',
  Refresh: 'MdRefresh',
  Settings: 'MdSettings',
};

// CSS property mapping (for sx prop to style props conversion)
const CSS_PROP_MAPPING = {
  // No need to map most properties as they're the same
  // Just map the ones that are different
  bgcolor: 'bg',
  backgroundColor: 'bg',
  marginTop: 'marginTop',
  marginBottom: 'marginBottom',
  marginLeft: 'marginLeft',
  marginRight: 'marginRight',
};

// Helper functions
function updatePackageJson(exampleDir) {
  console.log(`Updating package.json in ${exampleDir}`);

  const packageJsonPath = path.join(exampleDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`  No package.json found in ${exampleDir}`);
    return false;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Remove Material UI dependencies
    const depsToRemove = [
      '@mui/material',
      '@mui/icons-material',
      '@mui/x-date-pickers',
      'dayjs',
      'material-react-table',
    ];

    // Add Chakra UI dependencies
    const depsToAdd = {
      '@chakra-ui/react': '^2.9.0',
      '@chakra-ui/icons': '^2.1.1',
      'chakra-react-table': 'workspace:*',
      'framer-motion': '^11.0.8',
      'react-icons': '^5.0.1',
    };

    // Update dependencies
    depsToRemove.forEach((dep) => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        delete packageJson.dependencies[dep];
        console.log(`  Removed ${dep}`);
      }
    });

    // Ensure dependencies object exists
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }

    // Add new dependencies
    Object.entries(depsToAdd).forEach(([dep, version]) => {
      if (!packageJson.dependencies[dep]) {
        packageJson.dependencies[dep] = version;
        console.log(`  Added ${dep} @ ${version}`);
      }
    });

    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`  Updated package.json successfully`);
    return true;
  } catch (error) {
    console.error(`  Error updating package.json in ${exampleDir}:`, error);
    return false;
  }
}

function updateTsxFiles(exampleDir) {
  console.log(`Updating TSX/JSX files in ${exampleDir}`);

  // Find all TSX/JSX files in the src directory
  const srcDir = path.join(exampleDir, 'src');
  if (!fs.existsSync(srcDir)) {
    console.warn(`  No src directory found in ${exampleDir}`);
    return false;
  }

  try {
    const files = fs
      .readdirSync(srcDir)
      .filter((file) => file.endsWith('.tsx') || file.endsWith('.jsx'));

    if (files.length === 0) {
      console.warn(`  No TSX/JSX files found in ${srcDir}`);
      return false;
    }

    let anyFileUpdated = false;

    files.forEach((file) => {
      const filePath = path.join(srcDir, file);
      console.log(`  Processing ${file}`);

      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updatedContent = content;

        // Replace material-react-table with chakra-react-table
        updatedContent = updatedContent.replace(
          /from ['"]material-react-table['"]/g,
          "from 'chakra-react-table'",
        );

        // Handle direct MUI icon imports like: import AddIcon from '@mui/icons-material/Add';
        const directIconImportRegex =
          /import\s+([A-Za-z0-9_]+)\s+from\s+['"]@mui\/icons-material\/([A-Za-z0-9_]+)['"]/g;
        updatedContent = updatedContent.replace(
          directIconImportRegex,
          (match, iconAlias, iconName) => {
            // Convert the icon name to its equivalent in react-icons/md
            // Remove 'Icon' suffix if present in the name being imported (not the alias)
            const baseName = iconName.endsWith('Icon')
              ? iconName.slice(0, -4)
              : iconName;
            // Map to Md prefixed icon if possible
            const reactIconName = ICON_MAPPING[baseName] || `Md${baseName}`;
            return `import { ${reactIconName} as ${iconAlias} } from 'react-icons/md'`;
          },
        );

        // Replace Material UI imports with Chakra UI imports
        const muiImportRegex =
          /import\s+{([^}]+)}\s+from\s+['"]@mui\/material['"]/g;
        const muiIconsImportRegex =
          /import\s+{([^}]+)}\s+from\s+['"]@mui\/icons-material['"]/g;

        updatedContent = updatedContent.replace(
          muiImportRegex,
          (match, imports) => {
            // Parse the imported components
            const importedComponents = imports
              .split(',')
              .map((comp) => comp.trim());

            // Filter components that have mapping
            const mappableComponents = importedComponents.filter((comp) => {
              // Handle renamed imports like: Edit as EditIcon
              const componentName = comp.split(' as ')[0].trim();
              return Object.keys(COMPONENT_MAPPING).includes(componentName);
            });

            if (mappableComponents.length === 0) {
              return match; // No components to replace
            }

            // Map components to Chakra equivalents
            const mappedImports = importedComponents.map((comp) => {
              const parts = comp.split(' as ');
              const componentName = parts[0].trim();
              const alias = parts.length > 1 ? parts[1].trim() : null;

              if (Object.keys(COMPONENT_MAPPING).includes(componentName)) {
                const chakraComponent = COMPONENT_MAPPING[componentName];
                return alias
                  ? `${chakraComponent} as ${alias}`
                  : chakraComponent;
              }

              return comp; // Keep unmapped components
            });

            return `import {${mappedImports.join(', ')}} from '@chakra-ui/react'`;
          },
        );

        // Handle Material UI icon imports with destructuring
        updatedContent = updatedContent.replace(
          muiIconsImportRegex,
          (match, imports) => {
            // Parse the imported icons
            const importedIcons = imports.split(',').map((icon) => icon.trim());

            // Map to react-icons (MdIcons)
            const mappedIcons = importedIcons.map((icon) => {
              const parts = icon.split(' as ');
              const iconName = parts[0].trim();
              const alias = parts.length > 1 ? parts[1].trim() : null;

              if (Object.keys(ICON_MAPPING).includes(iconName)) {
                const mappedIcon = ICON_MAPPING[iconName];
                return alias ? `${mappedIcon} as ${alias}` : mappedIcon;
              }
              return icon;
            });

            return `import {${mappedIcons.join(', ')}} from 'react-icons/md'`;
          },
        );

        // Replace sx props with Chakra UI style props
        const sxPropRegex = /sx={{([^}]+)}}/g;
        updatedContent = updatedContent.replace(
          sxPropRegex,
          (match, styleProps) => {
            // Convert to style props
            // This is a simple version - a complete version would need to parse the object more carefully
            let chakraProps = '';

            // Simple case: string value props like m="2rem 0"
            if (styleProps.includes(':')) {
              const props = styleProps.split(',').map((prop) => {
                let [key, value] = prop.split(':').map((p) => p.trim());

                // Remove quotes from string keys
                key = key.replace(/['"]/g, '');

                // Map the CSS property if needed
                const mappedKey = CSS_PROP_MAPPING[key] || key;

                return `${mappedKey}={${value}}`;
              });

              chakraProps = props.join(' ');
            } else {
              // Just pass through as is for now
              chakraProps = `sx={{${styleProps}}}`;
            }

            return chakraProps;
          },
        );

        // Replace Material UI IconButton with Chakra IconButton
        updatedContent = updatedContent.replace(
          /<IconButton([^>]*)>([^<]*)<([^>]+)\/><\/IconButton>/g,
          (match, props, content, iconComp) => {
            // Extract icon component
            const iconCompClean = iconComp.trim();
            return `<IconButton${props} icon={<${iconCompClean}/>} />`;
          },
        );

        // Replace selected prop with Chakra equivalent
        updatedContent = updatedContent.replace(
          /selected={([^}]+)}/g,
          'bg={$1 ? "gray.100" : undefined}',
        );

        // Replace align="center" with textAlign="center"
        updatedContent = updatedContent.replace(
          /align="center"/g,
          'textAlign="center"',
        );

        // Replace variant="contained" with colorScheme="blue"
        updatedContent = updatedContent.replace(
          /variant="contained"/g,
          'colorScheme="blue"',
        );

        // Replace variant="outlined" with variant="outline"
        updatedContent = updatedContent.replace(
          /variant="outlined"/g,
          'variant="outline"',
        );

        // Replace color="primary" with colorScheme="blue"
        updatedContent = updatedContent.replace(
          /color="primary"/g,
          'colorScheme="blue"',
        );

        // Replace color="secondary" with colorScheme="purple"
        updatedContent = updatedContent.replace(
          /color="secondary"/g,
          'colorScheme="purple"',
        );

        // Replace color="error" with colorScheme="red"
        updatedContent = updatedContent.replace(
          /color="error"/g,
          'colorScheme="red"',
        );

        if (content !== updatedContent) {
          fs.writeFileSync(filePath, updatedContent);
          console.log(`  Updated ${file} successfully`);
          anyFileUpdated = true;
        } else {
          console.log(`  No changes needed for ${file}`);
        }
      } catch (error) {
        console.error(`  Error updating ${file}:`, error);
      }
    });

    return anyFileUpdated;
  } catch (error) {
    console.error(`  Error updating files in ${exampleDir}:`, error);
    return false;
  }
}

function installDependencies(exampleDir) {
  console.log(`Installing dependencies in ${exampleDir}`);

  try {
    execSync('pnpm install --no-frozen-lockfile', {
      cwd: exampleDir,
      stdio: 'inherit',
    });
    console.log(`  Dependencies installed successfully`);
    return true;
  } catch (error) {
    console.error(`  Error installing dependencies in ${exampleDir}:`, error);
    return false;
  }
}

function migrateExample(exampleName) {
  const exampleDir = path.join(EXAMPLES_DIR, exampleName, 'sandbox');

  console.log(`\n=== Migrating example: ${exampleName} ===`);

  if (!fs.existsSync(exampleDir)) {
    console.error(`Example directory not found: ${exampleDir}`);
    return false;
  }

  // Check if it's using material-react-table
  const packageJsonPath = path.join(exampleDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`No package.json found in ${exampleDir}`);
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Skip if already using chakra-react-table
  if (
    packageJson.dependencies &&
    packageJson.dependencies['chakra-react-table']
  ) {
    console.log(`Example already migrated: ${exampleName}`);
    return true;
  }

  // Update package.json
  const packageUpdated = updatePackageJson(exampleDir);

  // Update TSX/JSX files
  const filesUpdated = updateTsxFiles(exampleDir);

  // Install dependencies if something was updated
  if (packageUpdated || filesUpdated) {
    // Commented out to avoid actual execution during the script creation
    // installDependencies(exampleDir);
    console.log(`  Ready to install dependencies - run manually`);
  }

  console.log(`=== Migration completed for ${exampleName} ===\n`);

  return true;
}

// Main execution
function main() {
  console.log('Starting the migration process...');

  // Get all example directories
  const examples = fs
    .readdirSync(EXAMPLES_DIR)
    .filter((dir) => fs.statSync(path.join(EXAMPLES_DIR, dir)).isDirectory())
    .filter((dir) => !COMPLETED_EXAMPLES.includes(dir)); // Skip already migrated

  console.log(`Found ${examples.length} examples to migrate`);

  // Process one example (for testing)
  if (process.argv.length > 2) {
    const targetExample = process.argv[2];
    if (examples.includes(targetExample)) {
      migrateExample(targetExample);
    } else {
      console.error(`Example not found: ${targetExample}`);
    }
    return;
  }

  // Process all examples
  let migratedCount = 0;
  examples.forEach((example) => {
    const success = migrateExample(example);
    if (success) {
      migratedCount++;
    }
  });

  console.log(
    `\nMigration completed. Successfully migrated ${migratedCount}/${examples.length} examples.`,
  );
}

main();
