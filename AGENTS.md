# Chakra React Table Project Context

## Acronyms

- MRT: Material React Table
- CRT: Chakra React Table
- CUI: Chakra UI
- MUI: Material UI
- TRT: TanStack React Table

## Overview

Converting MRT to CRT, a fully featured CUI V3 implementation of TRT V8 based off of MUI (MUI) version

## Considerations

1. You are operating in an environment without network access. The Git remote will not be available
2. 

## Objectives

1. Replace MUI with CUI v3 while preserving all functionality from the original MRT library
2. Maintain compatibility with upstream MRT repository that will continue to be developed but will always use MUI
3. Replace @mui/icons-material with react-icons (primarily using react-icons/md)
4. Preserve file structure and component naming conventions
5. For exported functions and variables, try to create equivalent Chakra functions and variables so that when this library is accessed, we don't use "material" or "mrt" anywhere

## Migration Strategy

1. Prioritize the ability to easily merge changes from the upstream MRT library by keeping as much of the upstream files in-tact
2. Use wrappers or other smarter tricks like vite import redirects to appropriate chakra versions of the files?
3. If a better technique is available, ask me to use that and let me confirm
4. Preserve component APIs and behavior
5. Preserve file structure
6. Keep original variable names
7. Use CUI's styling system
8. Maintain original variable names (e.g., muiSkeletonProps) for easier Git merges
9. Become an expert at React, TanStack React Table, Chakra UI V3, Typescript and Javascript.
10. Maintain backward compatibility
11. Follow existing component mapping for consistency
12. Replace all Material UI components with appropriate components from Chakra UI V3
13. You should not have any dependencies on ANY material UI libraries
14. You should integrate vitest and write vitest tests for your changes
15. If similar components do not exist, create a "custom" directory and add them

## Testing Strategy

1. Maintain existing functionality
2. Ensure proper styling and responsiveness
3. Verify all table features work as expected
4. Test backward compatibility

## Response Guidelines

1. Always reference full file paths
2. Use backticks for referencing code elements
3. Be concise and direct in responses
4. Focus on CUI implementation while maintaining compatibility