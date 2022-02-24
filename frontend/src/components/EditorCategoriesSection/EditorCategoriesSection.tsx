import React from "react";
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Select, SingleValue } from 'chakra-react-select';
import { UseFormSetValue, UseFormClearErrors, FormState } from 'react-hook-form';
import { EditFormInput } from '../EditModal/EditModal';

interface EditorCategoriesSectionProp {
  formState: FormState<EditFormInput>;
  clearErrors: UseFormClearErrors<EditFormInput>;
  setValue: UseFormSetValue<EditFormInput>;
}

const EditorCategoriesSection = (
  { formState, clearErrors, setValue }: EditorCategoriesSectionProp
) => {
  const setCategoryValue = (selectedCategory: SingleValue<{
    id:number;
    label: string;
    value: string;
  }>) => {
    clearErrors("category");
    setValue("category", selectedCategory?.value || "");
  }

  return (
    <FormControl isRequired>
      <FormLabel htmlFor='tag' fontSize="sm">카테고리</FormLabel>
      <Select
        isInvalid={(formState.errors.category || false) as boolean}
        onChange={setCategoryValue}
        placeholder='카테고리를 선택해주세요.'
        // isMulti
        size="sm"
        tagVariant="solid"
        options={[
          {
            id: 1,
            label: "BackEnd",
            value: "BackEnd"
          },
          {
            id: 2,
            label: "FrontEnd",
            value: "FrontEnd"
          },
          {
            id: 3,
            label: "DataAnalysis",
            value: "DataAnalysis"
          },
          {
            id: 4,
            label: "AI",
            value: "AI"
          },
          {
            id: 5,
            label: "Job담",
            value: "Job담"
          }
        ]}
      />
    </FormControl>
  )
}

export default EditorCategoriesSection;