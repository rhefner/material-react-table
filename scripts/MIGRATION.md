# Material React Table to Chakra React Table Migration

This document explains how to use the migration script to convert Material UI based examples to Chakra UI.

## The Migration Script

The script `migrate-examples.js` automates the process of migrating examples from Material UI to Chakra UI. It helps with:

1. Updating package.json dependencies
2. Converting Material UI imports to Chakra UI
3. Replacing Material UI components with Chakra UI equivalents
4. Converting styling approaches (sx to style props)
5. Handling icon replacements

## How to Use

### Prerequisites

- Node.js installed
- PNPM installed

### Running the script

1. Make the script executable:
   ```bash
   chmod +x scripts/migrate-examples.js
   ```

2. Run the script to migrate all examples:
   ```bash
   node scripts/migrate-examples.js
   ```

3. Run the script to migrate a specific example:
   ```bash
   node scripts/migrate-examples.js example-name
   ```
   
   Example:
   ```bash
   node scripts/migrate-examples.js enable-row-selection
   ```

### After running the script

Once the script has updated files, you need to:

1. Install dependencies in each updated example:
   ```bash
   cd apps/material-react-table-docs/examples/example-name/sandbox
   pnpm install --no-frozen-lockfile
   ```

2. Test the example to make sure it works properly:
   ```bash
   pnpm dev
   ```

3. Fix any issues manually that the script couldn't handle automatically

## What the Script Handles

The script automatically handles:

- Updating package.json
  - Removes Material UI packages
  - Adds Chakra UI packages
  - Updates main library from material-react-table to chakra-react-table

- Updating Component Files
  - Replaces Material UI imports with Chakra UI imports
  - Converts Material icons to react-icons (md icons)
    - Handles both destructured imports: `import { Add } from '@mui/icons-material'`
    - And direct imports: `import AddIcon from '@mui/icons-material/Add'` (preserves original icon names)
  - Updates IconButton syntax to use icon prop
  - Converts common style props (sx to direct style props)
  - Handles common component prop changes:
    - selected → bg conditional
    - align="center" → textAlign="center"
    - variant="contained" → colorScheme="blue"
    - variant="outlined" → variant="outline"
    - color="primary" → colorScheme="blue"
    - color="secondary" → colorScheme="purple"
    - color="error" → colorScheme="red"

## Limitations

The script has some limitations:

1. Complex nested sx props might not be fully converted correctly
2. Some components without direct equivalents might need manual adjustments
3. Custom themes or theme usage may need manual migration
4. Specialized Material UI components (like DatePickers) need special handling
5. Very complex or nested JSX might not parse correctly

## Manual Follow-up Steps

After running the script, you should:

1. Check the migrated files for any missed Material UI imports or components
2. Test each example to verify it works
3. Fix any styling issues (Chakra uses different spacing and sizing scales)
4. Update any ThemeProvider or custom themes
5. Handle any custom components that use Material UI internals

## Examples Already Migrated

The script skips examples already migrated:

- minimal
- linear-progress
- enable-column-pinning
- customize-table-styles
- persistent-state
- multi-sorting
- row-actions-buttons
- single-row-selection
- custom-headless

## Troubleshooting

If you encounter issues:

1. **Missing dependencies**: Check if all dependencies are properly added to package.json
2. **Import errors**: Some components might need different imports in Chakra UI
3. **Component props errors**: Chakra UI components may have different props than Material UI
4. **Styling issues**: Chakra UI uses a different styling approach
5. **Icon errors**: Make sure react-icons is properly installed

If the script fails on an example, you can always migrate it manually using the patterns from already migrated examples.

## Examples of Code Transformations

### Material UI to Chakra UI Component Imports
```javascript
// Before
import { Button, TextField, Text } from '@mui/material';

// After
import { Button, Input, Text } from '@chakra-ui/react';
```

### Material UI Icon Imports
```javascript
// Before - Destructured import
import { Add, Delete, Edit } from '@mui/icons-material';

// After
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

// Before - Direct import (maintains original name for easier upstream merging)
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// After
import { MdAdd as AddIcon } from 'react-icons/md';
import { MdDelete as DeleteIcon } from 'react-icons/md';
```

### Material UI to Chakra UI Styling
```javascript
// Before
<Box sx={{ display: 'flex', marginTop: '10px', bgcolor: 'background.paper' }}>

// After
<Box display="flex" marginTop="10px" bg="background.paper">
```

### Material UI to Chakra UI IconButton
```javascript
// Before
<IconButton color="primary">
  <AddIcon />
</IconButton>

// After
<IconButton colorScheme="blue" icon={<AddIcon />} />
``` 