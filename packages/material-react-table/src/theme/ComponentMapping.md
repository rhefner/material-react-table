# Material UI to Chakra UI Component Mapping

This document provides a mapping between Material UI components used in the original Material React Table and their Chakra UI equivalents in the new theming system.

## Core Table Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `TableContainer` | `Box` | Use `as="div"` with `overflow="auto"` |
| `Table` | `Box` | Use `as="table"` |
| `TableHead` | `Box` | Use `as="thead"` |
| `TableBody` | `Box` | Use `as="tbody"` |
| `TableRow` | `Box` | Use `as="tr"` |
| `TableCell` | `Box` | Use `as="td"` or `as="th"` for header cells |
| `TableFooter` | `Box` | Use `as="tfoot"` |

## Input Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `TextField` | `Input` | For text input fields |
| `Select` | `Select` | For dropdown menus |
| `MenuItem` | `Option` | For select options |
| `Checkbox` | `Checkbox` | For checkboxes |
| `Switch` | `Switch` | For toggle switches |
| `Radio` | `Radio` | For radio buttons |
| `RadioGroup` | `RadioGroup` | For radio button groups |
| `FormControl` | `FormControl` | Container for form elements |
| `FormLabel` | `FormLabel` | Form field labels |
| `FormHelperText` | `FormHelperText` | For additional info/error messages |

## Button Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `Button` | `Button` | Standard button |
| `IconButton` | `IconButton` | Button with icon only |
| `ButtonGroup` | `ButtonGroup` | Group of related buttons |
| `ToggleButton` | `Button` | Use with `isActive` prop |
| `ToggleButtonGroup` | `ButtonGroup` | Use with controlled state |

## Layout Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `Box` | `Box` | General purpose container |
| `Stack` | `Stack` | For vertical stacking |
| `Grid` | `Grid` | For grid layouts |
| `Paper` | `Box` | Use with `boxShadow` and `borderRadius` |
| `Card` | `Box` | Use with card-like styling |
| `CardContent` | `Box` | Inner content of cards |
| `CardHeader` | `Box` | Header section of cards |
| `CardActions` | `Box` | Action buttons area of cards |
| `Divider` | `Divider` | Horizontal or vertical divider |

## Navigation Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `Tabs` | `Tabs` | Container for tab navigation |
| `Tab` | `Tab` | Individual tab item |
| `TabPanel` | `TabPanel` | Content area for tabs |
| `Breadcrumbs` | `Breadcrumb` | Navigation breadcrumbs |
| `Pagination` | Custom component | Built using `ButtonGroup` and `Button` |

## Feedback Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `CircularProgress` | `CircularProgress` | Loading spinner |
| `LinearProgress` | `Progress` | Linear progress indicator |
| `Skeleton` | `Skeleton` | Loading placeholder |
| `Alert` | `Alert` | For important messages |
| `Snackbar` | `Toast` | For temporary notifications |
| `Dialog` | `Modal` | For modal dialogs |
| `Tooltip` | `Tooltip` | For hover tooltips |

## Data Display Components

| Material UI Component | Chakra UI Equivalent | Notes |
|----------------------|---------------------|-------|
| `Avatar` | `Avatar` | User/entity avatar |
| `Badge` | `Badge` | For notifications or status indicators |
| `Chip` | `Tag` | For tags or compact elements |
| `List` | `List` | Container for list items |
| `ListItem` | `ListItem` | Individual list item |
| `Typography` | `Text`, `Heading` | For text and headings |

## MRT-Specific Components

| MRT Component | Chakra UI Implementation Approach | 
|---------------|-----------------------------------|
| `MRT_TablePagination` | Use `ButtonGroup`, `Button`, `Select`, and `Text` components |
| `MRT_TableHeadCell` | Use `Box as="th"` with sorting indicators and filter buttons |
| `MRT_TableDetailPanel` | Use `Box` with a collapsible animation |
| `MRT_ToolbarAlertBanner` | Use `Alert` component |
| `MRT_TableBodyCell` | Use `Box as="td"` with appropriate styling for data type |
| `MRT_TableBodyRow` | Use `Box as="tr"` with selection and hover styling |
| `MRT_EditRowModal` | Use `Modal` component with form controls |
| `MRT_FilterOptionMenu` | Use `Popover` with form controls |
| `MRT_ColumnActionMenu` | Use `Menu` component |

## Style Properties Mapping

| Material UI Property | Chakra UI Equivalent |
|----------------------|---------------------|
| `sx` | `__css` |
| `style` | `style` (avoid using inline styles) |
| `className` | `className` |
| `classes` | Use style props or `__css` |

## Event Handler Mapping

| Material UI Handler | Chakra UI Equivalent |
|---------------------|---------------------|
| `onClick` | `onClick` |
| `onChange` | `onChange` |
| `onFocus` | `onFocus` |
| `onBlur` | `onBlur` |
| `onKeyDown` | `onKeyDown` |
| `onMouseEnter` | `onMouseEnter` |
| `onMouseLeave` | `onMouseLeave` |

## Migration Examples

### Table Cell Migration

```tsx
// Material UI version
<TableCell 
  align="left"
  padding="normal"
  size="medium"
  sx={{ 
    backgroundColor: 'background.paper',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    color: 'text.primary'
  }}
>
  Cell Content
</TableCell>

// Chakra UI version
<Box
  as="td"
  textAlign="left"
  px={4}
  py={2}
  fontSize="md"
  __css={{
    bg: colorModeValue('white', 'gray.800'),
    borderBottom: '1px solid',
    borderColor: colorModeValue('gray.200', 'gray.700'),
    color: colorModeValue('gray.800', 'whiteAlpha.900')
  }}
>
  Cell Content
</Box>
```

### Button Migration

```tsx
// Material UI version
<Button
  variant="contained"
  color="primary"
  size="small"
  startIcon={<AddIcon />}
  disabled={isLoading}
  onClick={handleClick}
>
  Add Item
</Button>

// Chakra UI version
<Button
  variant="solid"
  colorScheme="blue"
  size="sm"
  leftIcon={<AddIcon />}
  isDisabled={isLoading}
  onClick={handleClick}
>
  Add Item
</Button>
```

### TextField Migration

```tsx
// Material UI version
<TextField
  label="Search"
  variant="outlined"
  size="small"
  value={searchValue}
  onChange={handleSearch}
  placeholder="Search..."
  InputProps={{
    startAdornment: <SearchIcon />,
  }}
/>

// Chakra UI version
<FormControl>
  <FormLabel>Search</FormLabel>
  <InputGroup size="sm">
    <InputLeftElement>
      <SearchIcon />
    </InputLeftElement>
    <Input
      value={searchValue}
      onChange={handleSearch}
      placeholder="Search..."
    />
  </InputGroup>
</FormControl>
```

## Special Considerations

### Theme Tokens

Material UI and Chakra UI use different theme token systems. Here's a general mapping:

- Material UI `palette.primary.main` → Chakra UI `theme.colors.blue.500`
- Material UI `palette.secondary.main` → Chakra UI `theme.colors.purple.500`
- Material UI `palette.error.main` → Chakra UI `theme.colors.red.500`
- Material UI `palette.warning.main` → Chakra UI `theme.colors.orange.500`
- Material UI `palette.info.main` → Chakra UI `theme.colors.blue.500`
- Material UI `palette.success.main` → Chakra UI `theme.colors.green.500`

### Color Mode

For components that need to handle both light and dark mode:

```tsx
// Using the colorModeValue utility
<Box
  bg={colorModeValue('white', 'gray.800')}
  color={colorModeValue('gray.800', 'white')}
>
  Content
</Box>

// Using the _dark pseudo prop (internal to Chakra style objects)
<Box
  __css={{
    bg: 'white',
    color: 'gray.800',
    _dark: {
      bg: 'gray.800',
      color: 'white',
    }
  }}
>
  Content
</Box>
```

For more complex theming needs, refer to the `createMRTChakraTheme` function and the component style configurations in the theme system. 