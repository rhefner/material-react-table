import {
  ChakraTheme,
  ComponentStyleConfig,
  ThemeComponents,
  ThemeOverride,
} from '@chakra-ui/react';

/**
 * Type definition for Material React Table Chakra UI theme
 */
export interface MRTChakraTheme extends ChakraTheme {
  components: ThemeComponents & {
    MRTTable: ComponentStyleConfig;
    MRTTableCell: ComponentStyleConfig;
    MRTTableHead: ComponentStyleConfig;
    MRTToolbar: ComponentStyleConfig;
    MRTPagination: ComponentStyleConfig;
    MRTFilter: ComponentStyleConfig;
    MRTDetailPanel: ComponentStyleConfig;
  };
}

/**
 * Type definition for Material React Table Chakra UI theme overrides
 */
export type MRTChakraThemeOverride = ThemeOverride & {
  components?: {
    MRTTable?: ComponentStyleConfig;
    MRTTableCell?: ComponentStyleConfig;
    MRTTableHead?: ComponentStyleConfig;
    MRTToolbar?: ComponentStyleConfig;
    MRTPagination?: ComponentStyleConfig;
    MRTFilter?: ComponentStyleConfig;
    MRTDetailPanel?: ComponentStyleConfig;
  };
};
