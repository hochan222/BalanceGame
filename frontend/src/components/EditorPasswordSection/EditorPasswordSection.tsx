import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  PinInput,
  PinInputField
} from '@chakra-ui/react';
import { UseFormSetValue, UseFormClearErrors, FormState } from 'react-hook-form';
import { EditFormInput } from '../EditModal/EditModal';

interface EditorPasswordSectionProp {
  formState: FormState<EditFormInput>;
  clearErrors: UseFormClearErrors<EditFormInput>;
  setValue: UseFormSetValue<EditFormInput>;
}

const EditorPasswordSection = (
  { formState, setValue, clearErrors }: EditorPasswordSectionProp
) => {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor='password' fontSize="sm">비밀번호</FormLabel>
      <PinInput
        id="password"
        mask
        size="sm"
        placeholder='*'
        onChange={(value) => setValue("password", value)}
        onComplete={() => clearErrors("password")}
        isInvalid={(formState.errors.password || false) as boolean}
      >
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
      <FormHelperText fontSize="sm">수정시 필요한 비밀번호를 입력하세요.</FormHelperText>
    </FormControl>
  )
}

export default EditorPasswordSection;
