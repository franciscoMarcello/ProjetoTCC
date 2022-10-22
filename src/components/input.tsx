import { IInputProps, Input as NativeBaseInput } from "native-base";
export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      fontSize="16"
      color={"gray.100"}
      _focus={{
        borderWidth: 2,
        borderColor: "purple.500",
      }}
      {...rest}
      placeholderTextColor={"gray.500"}
      mb={2}
    />
  );
}
