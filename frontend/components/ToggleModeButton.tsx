import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ToggleModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="toggle theme"
      rounded="full"
      size="xs"
      onClick={toggleColorMode}
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
    />
  );
};
export default ToggleModeButton;
