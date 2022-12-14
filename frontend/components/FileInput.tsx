import { Input, InputProps, useMultiStyleConfig } from "@chakra-ui/react";

export const FileInput = (props: InputProps) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });

  return (
    <Input
      w='100%'
      border=''
      accept=".jpg, .jpeg, .png"
      type="file"
      sx={{
        "::file-selector-button": {
          ...styles,
        },
      }}
      
    />
  );
};