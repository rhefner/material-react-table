import {
  IconButton,
  type IconButtonProps,
  Tooltip,
  useTheme,
  Icon,
  type Theme,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ToggleDensePaddingButtonProps<TData extends MRT_RowData>
  extends Omit<IconButtonProps, 'aria-label'> {
  table: MRT_TableInstance<TData>;
  'aria-label'?: string;
}

export const MRT_ToggleDensePaddingButton = <TData extends MRT_RowData>({
  table,
  'aria-label': ariaLabel,
  ...rest
}: MRT_ToggleDensePaddingButtonProps<TData>) => {
  const {
    getState,
    options: {
      icons: { DensityLargeIcon, DensityMediumIcon, DensitySmallIcon },
      localization,
    },
    setDensity,
  } = table;
  const { density } = getState();
  const theme = useTheme<Theme>();

  const handleToggleDensePadding = () => {
    const nextDensity =
      density === 'comfortable'
        ? 'compact'
        : density === 'compact'
          ? 'spacious'
          : 'comfortable';
    setDensity(nextDensity);
  };

  // Use provided aria-label or fall back to localization
  const buttonAriaLabel = ariaLabel || localization.toggleDensity;

  return (
    <Tooltip label={rest?.title ?? localization.toggleDensity}>
      <IconButton
        aria-label={buttonAriaLabel}
        onClick={handleToggleDensePadding}
        {...rest}
        title={undefined}
      >
        {density === 'compact' ? (
          <Icon as={DensitySmallIcon} />
        ) : density === 'comfortable' ? (
          <Icon as={DensityMediumIcon} />
        ) : (
          <Icon as={DensityLargeIcon} />
        )}
      </IconButton>
    </Tooltip>
  );
};
