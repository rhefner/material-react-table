# Migration Plan for Converting Apps to Chakra UI and chakra-react-table

This document outlines the steps needed to migrate the applications in the `apps` directory to use Chakra UI and the `chakra-react-table` package.

## Applications to Migrate

Based on the directory listing, the following applications need to be migrated:

- material-react-table-docs
- test-remix  
- test-vite
- test-cra

## Current Migration Status

### Completed Migrations
- ✅ test-remix: Already migrated to Chakra UI and chakra-react-table
- ✅ test-vite: Already migrated to Chakra UI and chakra-react-table
- ✅ test-cra: Already migrated to Chakra UI and chakra-react-table

### In Progress Migrations
- 🔄 material-react-table-docs: Migration in progress

## Progress Assessment (Updated)

### material-react-table-docs Migration Progress

1. ✅ Main package.json: Updated to include Chakra UI dependencies and chakra-react-table
2. 🔄 Examples migration: 
   - ✅ Some examples have been migrated (e.g., minimal example, linear-progress, enable-column-pinning, customize-table-styles, etc.)
   - ❌ Many examples still use Material UI components and material-react-table
   
### Examples Migration Status

Based on a review of imports in the examples directory:

- ✅ Examples migrated to Chakra UI and chakra-react-table:
  - minimal
  - linear-progress
  - enable-column-pinning
  - customize-table-styles
  - persistent-state

- ❌ Examples still using Material UI: Many examples still use `@mui/material`, `@mui/icons-material`, and other MUI packages
- ❌ Localization examples: All localization examples (`localization-i18n-*`) still use Material UI's locale system

## Findings from Initial Migrations

During our migration work, we've discovered these important points:

1. 🔔 The prop names in chakra-react-table preserve the original MUI naming conventions (e.g., `muiLinearProgressProps` instead of `chakraLinearProgressProps`) to maintain compatibility
2. 🔔 Type safety is maintained between the libraries but requires careful attention to prop types
3. 🔔 The basic structure of the examples remains the same, with primary changes to:
   - Imports (from `@mui/material` to `@chakra-ui/react`)
   - Style props (from MUI styling to Chakra styling)
   - Component props (e.g., `variant="contained"` to `colorScheme="blue"`)
4. 🔔 For color manipulation utilities (`darken`, `lighten`, etc.), we need to either:
   - Add the `polished` library for direct replacements of MUI color functions
   - Pre-compute color variations
   - Use Chakra UI's color mode and built-in color variations
5. 🔔 When using styling, Chakra UI's approach often differs from Material UI:
   - Material UI's `sx` prop in some contexts needs to be adjusted for Chakra
   - Some style properties need to be mapped to Chakra's naming conventions
   - Selectors may need to be adjusted to match Chakra's structure

## Remaining Migration Tasks for material-react-table-docs

1. 🔄 Update all examples in examples/ directory:
   - Each example in examples/ directory contains a sandbox with package.json and source files
   - Many still reference @mui/material, @mui/icons-material, and material-react-table
   - Need to systematically update all imports and component usages

## Detailed Migration Plan for Remaining Examples

### 1. Categorize Examples for Migration

Group examples by type to prioritize migration:
- Basic functionality examples
- Complex functionality examples
- Localization examples
- Customization examples
- Feature demonstration examples

### 2. Create Template Migrations

Create a template for migrating each type of example to ensure consistency:
- Package.json updates
- Import statement replacements
- Component API adjustments
- Styling conversion
- Special handling for certain features (like date pickers)

### 3. Systematic Migration Process for Each Example

For each example directory:

1. **Update package.json**:
   ```diff
   - "@mui/material": "^6.4.4",
   - "@mui/icons-material": "^6.4.4",
   - "@mui/x-date-pickers": "^7.26.0",
   - "chakra-react-table": "workspace:*",
   + "@chakra-ui/react": "^2.8.2",
   + "@chakra-ui/icons": "^2.1.1",
   + "react-icons": "^5.0.1",
   + "chakra-react-table": "workspace:*",
   + "framer-motion": "^11.0.3"
   ```

2. **Update imports in source files**:
   ```diff
   - import { ... } from '@mui/material';
   - import { ... } from '@mui/icons-material';
   - import { ..., useMaterialReactTable } from 'material-react-table';
   + import { ... } from '@chakra-ui/react';
   + import { ... } from '@chakra-ui/icons';
   + import { ..., useMaterialReactTable } from 'chakra-react-table';
   ```

3. **Replace Material UI components with Chakra UI equivalents**:
   - Replace MUI components with their Chakra UI counterparts
   - Update component props according to the component mapping
   - Convert Material UI styling (sx prop) to Chakra UI styling
   
4. **Handle special cases**:
   - Convert ThemeProvider to ChakraProvider
   - Replace Material UI icons with react-icons equivalents
   - Handle date pickers with a compatible solution
   - Update localization approach for i18n examples
   - For color manipulation, use precomputed colors or add the polished library

5. **Test each example** to ensure it works correctly after migration

### 4. Special Handling for Localization Examples

For the many localization examples (localization-i18n-*):
1. Create a common approach to replace MUI's locale implementation
2. Update all locale examples using this common pattern
3. Ensure the localization functionality works as expected

## Implementation Plan

1. **Start with simple examples** (like minimal, simple tables, etc.)
2. **Move to more complex examples** (filtering, sorting, etc.)
3. **Handle specialized examples** (localization, custom components, etc.)
4. **Update documentation text** to reference Chakra UI instead of Material UI

## Progress Tracking Checklist

- [x] Create a template migration for basic examples
- [x] Migrate basic functionality examples (Completed: linear-progress, enable-column-pinning, customize-table-styles)
- [ ] Create a template migration for complex examples  
- [ ] Migrate complex functionality examples
- [ ] Create a template migration for localization examples
- [ ] Migrate all localization examples
- [ ] Update documentation references to Material UI
- [ ] Test all migrated examples
- [ ] Final QA review

## Next Steps

1. Continue migrating basic examples using the template approach established
2. Focus on the following examples next:
   - multi-sorting
   - row-actions-buttons
3. After completing these basic examples, create a template for complex examples

## Migration Tips

- Refer to the component mapping in the main migration plan for accurate replacements
- For Material UI icons, use the icons mapping to find proper react-icons replacements
- Keep the general structure of components the same while replacing internal implementations
- Use the Chakra UI documentation (https://chakra-ui.com/) for proper component API usage
- For date pickers, consider using react-datepicker or another Chakra-compatible solution
- Consider starting with bulk replacements for simple patterns (like imports) and then refining manually
- Note that prop names like muiLinearProgressProps remain the same in chakra-react-table for backward compatibility
- For styling issues, prefer direct Chakra UI styling approaches over trying to mimic Material UI's exact patterns

## Migration Steps

For each application:

1. Update dependencies in the application's `package.json` file:
   - Remove `@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers` 
   - Add `@chakra-ui/react`, `@chakra-ui/icons`, `chakra-react-table`
   - Ensure compatible versions of `react`, `react-dom`, `@emotion/react`, `@emotion/styled`

2. Search the codebase for Material UI imports like `import from @mui` and replace them with the equivalent Chakra UI imports. Common replacements:
   - `@mui/material` -> `@chakra-ui/react`  
   - `@mui/icons-material` -> `@chakra-ui/icons`
   - `@mui/x-date-pickers` -> Chakra UI does not have a direct equivalent, consider alternative libraries like `react-datepicker`

3. Search for usages of `material-react-table` and replace the import with `chakra-react-table`. Update any related code as needed.

4. Review all components and pages, replacing Material UI components and styling with Chakra UI equivalents. Key areas to update:
   - Replace `<Box>`, `<Paper>`, etc with `<Box>`, `<Stack>` from Chakra 
   - Convert `sx` prop and `makeStyles` to Chakra's `sx` prop or styled components
   - Update theme setup and usage to use Chakra's theme
   - Replace `<Table>`, `<TableHead>` etc components with Chakra's `<Table>` components
   - Convert `<Button>`, `<IconButton>`, `<TextField>` to Chakra's button, icon button, and input components  

5. Test the application thoroughly after the migration to ensure everything is working as expected with Chakra UI and `chakra-react-table`.

6. Update any relevant documentation, READMEs, comments to reflect the switch to Chakra UI and `chakra-react-table`.

7. Commit the changes and open a PR for review.

## Tips

- Refer to the Chakra UI docs extensively during the migration: https://chakra-ui.com/
- The `chakra-react-table` API is very similar to `material-react-table`, so much of the table setup code can stay the same
- Prioritize migrating the most complex and highly used components and pages first
- Consider doing the migration incrementally and opening multiple smaller PRs rather than one massive change
- Ensure adequate testing, especially of critical paths, after the migration to catch any issues 

## Progress Tracking

- [ ] Update package.json files in all examples
- [ ] Update source files in all examples
- [ ] Update any documentation text
- [ ] Test all examples
- [ ] Final QA review 