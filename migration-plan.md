# Migration Plan: Material React Table to Chakra React Table

This document outlines the step-by-step plan to migrate Material React Table (MRT) to Chakra React Table (CRT), replacing Material UI with Chakra UI v2 and using react-icons instead of Material UI icons.

## Progress So Far

✅ Updated package.json to include Chakra UI and react-icons dependencies
✅ Created a mapping of Material UI icons to react-icons
✅ Created a basic CRT_TableContainer component to replace MRT_TablePaper
✅ Created a skeleton for useChakraReactTable hook
✅ Created a new ChakraReactTable main component
✅ Updated main exports in index.ts
✅ Updated MRT_ToggleDensePaddingButton to use Chakra UI components
✅ Created CRT_ToggleGlobalFilterButton and CRT_ToggleFullScreenButton files (might need to reconsider)
✅ Updated MRT_TableHeadCell to use Chakra UI components
✅ Updated MRT_TableBodyCell and MRT_TableBodyCellValue to use Chakra UI components
✅ Updated MRT_TableHeadRow to use Chakra UI components
✅ Updated MRT_TableBodyRow to use Chakra UI components (minor type adjustments as it was already using Chakra UI)
✅ Updated MRT_TopToolbar to use Chakra UI components
✅ Updated MRT_LinearProgressBar to use Chakra UI components
✅ Updated MRT_BottomToolbar to use Chakra UI components
✅ Updated MRT_ToolbarInternalButtons to use Chakra UI components
✅ Updated MRT_FilterTextField to use Chakra UI components
✅ Updated MRT_EditCellTextField to use Chakra UI components
✅ Created utility files for common functions, color manipulation, and Chakra-specific styling
✅ Updated MRT_FilterOptionMenu to use Chakra UI components
✅ Updated MRT_ActionMenuItem to use Chakra UI components
✅ Updated MRT_ColumnActionMenu to use Chakra UI components
✅ Updated MRT_RowActionMenu to use Chakra UI components
✅ Updated MRT_ShowHideColumnsMenu to use Chakra UI components
✅ Updated MRT_ShowHideColumnsMenuItems to use Chakra UI components
✅ Updated MRT_EditRowModal to use Chakra UI components
✅ Updated MRT_GlobalFilterTextField to use Chakra UI components
✅ Updated MRT_FilterCheckbox to use Chakra UI components
✅ Updated MRT_TableHeadCellFilterLabel to use Chakra UI components
✅ Updated MRT_CellActionMenu to use Chakra UI components
✅ Updated MRT_FilterRangeSlider to use Chakra UI components
✅ Updated MRT_TablePaper to use Chakra UI components
✅ Updated MRT_FilterRangeFields to use Chakra UI components
✅ Updated MRT_SelectCheckbox to use Chakra UI components
✅ Updated MRT_TableContainer to use Chakra UI components
✅ Updated MRT_TablePagination to use Chakra UI components
✅ Updated MRT_ToolbarAlertBanner to use Chakra UI components
✅ Updated MRT_ToolbarDropZone to use Chakra UI components
✅ Updated MRT_TableBodyRowPinButton to use Chakra UI components
✅ Updated MRT_TableBodyRowGrabHandle to use Chakra UI components
✅ Updated MRT_TableDetailPanel to use Chakra UI components
✅ Updated MRT_TableFooter to use Chakra UI components
✅ Updated MRT_TableFooterRow to use Chakra UI components
✅ Updated MRT_TableFooterCell to use Chakra UI components
✅ Updated getMRT_RowExpandColumnDef to use Chakra UI components
✅ Updated MRT_TableHeadCellGrabHandle to use Chakra UI components
📝 Note: MRT_FilterFnsMenu is not in the codebase. The filtering functionality is handled by MRT_FilterOptionMenu

## Current Issues and Challenges

1. **Import Mismatches**: Components are using incorrect type imports.
2. **TypeScript Errors**: Multiple errors related to imports from `@mui/material/*` that don't exist for Chakra UI components.
3. **Component Property Differences**: Chakra UI components use different props than Material UI (e.g., `icon` prop vs. children, `label` vs. `title` for tooltips).
4. **Ref Handling**: Chakra UI's components require different ref handling approaches than Material UI.
5. **Type Differences in Event Handlers**: Chakra UI's event handlers often expect different parameter types than Material UI's handlers.
6. **Replacing @mui/x-date-pickers components**: Material React Table uses DatePicker, TimePicker, and DateTimePicker from @mui/x-date-pickers, which have no direct equivalents in Chakra UI. We'll need to implement custom date picker components using a Chakra-compatible date library such as react-datepicker or create our own date picker components using Chakra UI primitives.

## Migration Strategy

We'll take a component-by-component approach, modifying the existing MRT_ files to use Chakra UI components internally. This approach preserves the file structure to minimize merge conflicts with upstream changes.

### Key Migration Principles

1. **Keep MRT_ file names**: Do not rename files to avoid merge conflicts.
2. **Update component internals**: Replace Material UI imports and components with Chakra UI equivalents.
3. **Preserve component APIs**: Maintain the same props and functionality.
4. **Keep original variable names**: Don't rename variables like `muiSkeletonProps` or `muiTableBodyCellProps` to maintain compatibility with the upstream repo and make Git merges easier.
5. **Extract utility functions**: Move utility functions like `debounce` to separate utility files rather than having them inline in components.
6. **Create color manipulation utilities**: Use the polished library for color manipulation functions (alpha, lighten, darken) to replace MUI's color utilities.

### Component Mapping

Below is a mapping of key Material UI components to their Chakra UI equivalents:

| Material UI | Chakra UI |
|-------------|-----------|
| Box | Box |
| Button | Button |
| Checkbox | Checkbox |
| Chip | Tag |
| Collapse | Collapse |
| FormControlLabel | FormControl |
| IconButton | IconButton |
| LinearProgress | Progress |
| Menu | Menu |
| MenuItem | MenuItem |
| Paper | Card |
| Select | Select |
| Skeleton | Skeleton |
| Slider | Slider |
| Stack | Stack |
| TableCell | Td |
| TableContainer | TableContainer |
| TableHead | Thead |
| Table | Table |
| TableRow | Tr |
| TextField | Input |
| Tooltip | Tooltip |
| Text | Text, Heading |

### Step 1: Update Types (In Progress)

- ✅ Created CRT_Types.ts
- ⬜ Update component prop interfaces to work with both Material UI and Chakra UI
- ⬜ Ensure types are used consistently throughout the codebase

### Step 2: Convert Core Components

1. **Table Components**
   - ✅ Created Table components for Chakra UI
   - ✅ Update MRT_TableHeadCell to use Chakra UI
   - ✅ Update MRT_TableBodyCell to use Chakra UI
   - ✅ Update MRT_TableHeadRow to use Chakra UI
   - ✅ Update MRT_TableBodyRow to use Chakra UI

2. **Cell/Row Components**

3. **Toolbar Components**
   - ✅ Update MRT_TopToolbar to use Chakra UI
   - ✅ Update MRT_LinearProgressBar to use Chakra UI
   - ✅ Update MRT_BottomToolbar to use Chakra UI
   - ✅ Update MRT_ToolbarInternalButtons to use Chakra UI

### Step 3: Convert Feature Components

1. **Input Components**
   - 🔄 Update MRT_FilterTextField to use Chakra UI components (in progress)
   - ⬜ Update MRT_EditTextCell to use Chakra UI components
   
2. **Button Components**
   - ✅ Updated MRT_ToggleDensePaddingButton to use Chakra UI
   - ✅ Updated MRT_ToggleGlobalFilterButton to use Chakra UI
   - ✅ Updated MRT_ToggleFiltersButton to use Chakra UI
   - ✅ Updated MRT_ToggleFullScreenButton to use Chakra UI
   - ✅ Updated MRT_ShowHideColumnsButton to use Chakra UI
   - ✅ Updated MRT_ExpandButton to use Chakra UI
   - ✅ Updated MRT_ExpandAllButton to use Chakra UI
   - ✅ Updated MRT_RowPinButton to use Chakra UI
   - ✅ Updated MRT_EditActionButtons to use Chakra UI
   - ✅ Update MRT_ColumnPinningButtons to use Chakra UI
   - ✅ Updated MRT_ToggleRowActionMenuButton to use Chakra UI
   - ✅ Update MRT_GrabHandleButton to use Chakra UI
   
3. **Menu Components**
   - ✅ Updated MRT_FilterOptionMenu to use Chakra UI components
   - ✅ Updated MRT_ActionMenuItem to use Chakra UI components
   - ✅ Updated MRT_ColumnActionMenu to use Chakra UI components
   - ✅ Update MRT_RowActionMenu to use Chakra UI
   - ✅ Update MRT_ShowHideColumnsMenu to use Chakra UI

### Step 4: Convert Modal Components

- ✅ Update MRT_EditRowModal to use Chakra UI
- ⬜ Note: MRT_FilterFnsMenu is not in the codebase. The filtering functionality is handled by MRT_FilterOptionMenu, which has already been converted.

### Step 5: Update Styling and Theming

- ✅ Created basic Chakra UI theme integration
- ⬜ Replace Material UI styling with Chakra UI styling system
- ⬜ Update color and spacing variables

### Step 6: Testing and Bug Fixing

- ⬜ Test all table functionality
- ⬜ Fix any UI or functionality issues
- ⬜ Ensure proper styling and responsiveness

## Next Steps for Migration

1. ✅ **Menu and Modal Components**: We've completed all menu components including MRT_ActionMenuItem, MRT_FilterOptionMenu, MRT_ColumnActionMenu, MRT_RowActionMenu, MRT_ShowHideColumnsMenu, and modal components (MRT_EditRowModal).

2. ✅ **Input and Filter Components**: 
   - Completed MRT_GlobalFilterTextField
   - Completed MRT_FilterCheckbox
   - Completed MRT_TableHeadCellFilterLabel
   - Completed MRT_CellActionMenu
   - Completed MRT_FilterRangeSlider
   
3. **Remaining Components to Convert**:
   - ✅ MRT_TableLoadingOverlay
   - ✅ MRT_TableHead
   - ✅ MRT_TableHeadCellFilterContainer
   - ✅ MRT_TableHeadCellSortLabel
   - ✅ MRT_TableHeadCellResizeHandle
   - ✅ MRT_TableHeadCellColumnActionsButton
   - ✅ MRT_TablePaper
   - ✅ MRT_TableContainer
   - ✅ MRT_FilterRangeFields
   - ✅ MRT_SelectCheckbox
   - ✅ MRT_TablePagination
   - ✅ MRT_ToolbarAlertBanner
   - ✅ MRT_ToolbarDropZone
   - ✅ MRT_TableBodyRowPinButton
   - ✅ MRT_TableBodyRowGrabHandle
   - ✅ MRT_TableDetailPanel
   - ✅ MRT_TableFooter
   - ✅ MRT_TableFooterRow
   - ✅ MRT_TableFooterCell

4. **Custom Components to Create**:
   - Custom date picker components to replace @mui/x-date-pickers components
   
5. **Type Consistency**: 
   - Continue ensuring consistent type usage throughout components
   - Update CRT_Types.ts to include all necessary type definitions

## Backward Compatibility Considerations

To ensure backward compatibility, we will:

1. Maintain the same file structure and component naming
2. Preserve component APIs and behavior
3. Ensure the look and feel remains consistent
4. Keep original variable names (like muiSkeletonProps) to maintain compatibility with upstream repo

## Important Notes for Git Merging

To facilitate easier Git merges with the upstream material-react-table repository, we are following these guidelines:

1. **Preserve File Names**: Do not rename any files, even when converting from Material UI to Chakra UI.
2. **Keep Variable Names**: Maintain original variable names like `muiTableHeadProps` even when they reference Chakra UI components.
3. **Maintain Component Signatures**: Keep the same props and function signatures to minimize merge conflicts.
4. **Preserve Directory Structure**: Keep the same directory structure to avoid complex Git conflicts.
5. **Component-by-Component Conversion**: Convert components individually rather than rewriting large sections of code.
6. **Variable-by-Variable Changes**: When modifying variables, change their implementations but not their names to make diffs smaller and more manageable.
7. **Preserve Ref Props**: Do not remove ref props as this can break functionality and create issues with upstream merges. Instead, handle them appropriately in each component.

Following these guidelines ensures that the migration creates cleaner and more predictable Git diffs, making future merges with upstream changes much easier to handle.

## Known Challenges

1. Material UI and Chakra UI have different styling systems
2. Some components don't have exact equivalents
3. We'll need to reimplement some custom styling that was specific to Material UI
4. Theming system differences
5. Chakra UI has stricter prop typing than Material UI requiring careful handling of props and refs
6. Replacing @mui/x-date-pickers components: Material React Table uses DatePicker, TimePicker, and DateTimePicker from @mui/x-date-pickers, which have no direct equivalents in Chakra UI. We'll need to implement custom date picker components using a Chakra-compatible date library such as react-datepicker or create our own date picker components using Chakra UI primitives. If we create our own primitives, do so in a "custom" folder in the "components" folder under "src"

## Implementation Strategy

1. Modify one component at a time, replacing Material UI imports with Chakra UI
2. Update the component internals to use Chakra UI components
3. Test thoroughly after each component is migrated
4. Keep file names and exports consistent with original MRT implementation

## Handling Refs in Chakra UI

When migrating components that use refs, keep these considerations in mind:

1. **Chakra's Strict Prop Types**: Chakra UI has stricter TypeScript typing than Material UI. Props like `ref` that are handled automatically in Material UI need explicit handling in Chakra.

2. **Wrapping Strategy**: For components that need to pass refs to the original MRT table structure, consider:
   - Wrapping Chakra components in a plain HTML element (like `<div>`) that can take the ref directly
   - Using React's `useRef` and `useEffect` hooks to update refs manually
   - Using type assertions (`as any`) judiciously when TypeScript struggled with the ref types

3. **filterInputRefs Handling**: The MRT table maintains a refs object for filter inputs. For components like MRT_FilterRangeSlider, the original Material UI implementation passes DOM references to this object. When using Chakra UI components, we need to:
   - For input-like components, wrap them in a div with the ref
   - Update the refs manually with useEffect
   - Consider what properties from the original elements are actually used and whether the new element types will work

4. **Preserving Ref Props**: DO NOT remove ref props from components as it can break functionality:
   ```typescript
   // INCORRECT - Don't do this
   const safeProps = { ...originalProps };
   delete (safeProps as any).ref; // DON'T remove ref props
   
   // CORRECT - Handle refs appropriately
   <Component
     {...props}
     ref={(node) => {
       if (node && props.ref) {
         // Maintain the original ref functionality
         if (typeof props.ref === 'function') {
           props.ref(node);
         } else if (props.ref.hasOwnProperty('current')) {
           props.ref.current = node;
         }
       }
     }}
   />
   ```

5. **useMediaQuery Replacement**: Replace Material UI's `useMediaQuery` with Chakra's `useBreakpointValue`:
   ```typescript
   // Material UI
   const isMobile = useMediaQuery('(max-width:720px)');
   
   // Chakra UI
   const isMobile = useBreakpointValue({ base: true, md: false });
   ```

6. **Accessing Theme**: Always use Chakra UI's `useTheme()` hook to access the theme object:
   ```typescript
   // Incorrect
   sx={{
     ...getCommonToolbarStyles({ table, theme: null }),
   }}
   
   // Correct
   const theme = useTheme();
   sx={{
     ...getCommonToolbarStyles({ table, theme }),
   }}
   ```

   Unless you're not in a function component. Then you should create a "theme" file if it doesn't exist and move the theme functionality from ChakraTableProvider.tsx into it's own "theme.ts" file

7. **Replacing MUI Utilities**: Replace Material UI utilities with custom implementations or alternatives.

## Migration Notes

1. **Naming Consistency**: Keep MRT_ prefix for all component files to maintain compatibility with the upstream repo and make git merges easier. Any new components should be created using CRT_ prefix.

2. **Variable Names**: Maintain original variable names like `muiSkeletonProps` and `muiTableBodyCellProps` even after converting to Chakra UI to minimize differences with the upstream repo.

3. **Prop Handling**: Create safe prop objects for Chakra UI components by filtering out props that might cause issues:
   ```typescript
   const safeProps = { ...originalProps };
   delete (safeProps as any).incompatibleProp;
   ```

4. **Icon Mapping**: Use the existing icon mapping in icons.ts that maps Material icons to react-icons (mainly Material Design icons from the react-icons/md package).

5. **Styling Pattern**: Follow the pattern of using Chakra's style props directly where possible, falling back to `sx` prop when needed.