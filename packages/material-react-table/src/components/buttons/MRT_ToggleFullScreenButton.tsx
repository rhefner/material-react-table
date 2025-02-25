import { useState } from 'react';
import {
  IconButton,
  Tooltip,
  type IconButtonProps,
  Icon,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ToggleFullScreenButtonProps<TData extends MRT_RowData>
  extends Omit<IconButtonProps, 'aria-label'> {
  table: MRT_TableInstance<TData>;
  'aria-label'?: string;
}

export const MRT_ToggleFullScreenButton = <TData extends MRT_RowData>({
  table,
  'aria-label': ariaLabel,
  ...rest
}: MRT_ToggleFullScreenButtonProps<TData>) => {
  const {
    getState,
    options: {
      icons: { FullscreenExitIcon, FullscreenIcon },
      localization,
    },
    setIsFullScreen,
  } = table;

  // Safely access state properties
  const state = getState();
  const isFullScreen = state.isFullScreen || false;

  const [tooltipOpened, setTooltipOpened] = useState(false);

  const handleToggleFullScreen = () => {
    setTooltipOpened(false);
    setIsFullScreen(!isFullScreen);
  };

  const tooltipLabel = rest?.title || localization.toggleFullScreen;

  // Use provided aria-label or fall back to localization
  const buttonAriaLabel = ariaLabel || localization.toggleFullScreen;

  return (
    <Tooltip isOpen={tooltipOpened} label={tooltipLabel}>
      <IconButton
        aria-label={buttonAriaLabel}
        onBlur={() => setTooltipOpened(false)}
        onClick={handleToggleFullScreen}
        onFocus={() => setTooltipOpened(true)}
        onMouseEnter={() => setTooltipOpened(true)}
        onMouseLeave={() => setTooltipOpened(false)}
        size="sm"
        variant="ghost"
        {...rest}
        title={undefined}
        icon={
          isFullScreen ? (
            <Icon as={FullscreenExitIcon} />
          ) : (
            <Icon as={FullscreenIcon} />
          )
        }
      />
    </Tooltip>
  );
};
