import React, { useCallback, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  UseDisclosureProps,
  Grid,
  FormControl,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import EditorContentSection from '../EditorContentSection';
import EditorCategoriesSection from '../EditorCategoriesSection';
import EditorPasswordSection from '../EditorPasswordSection';
import RootStore from '@/stores/RootStore';
import StoreContext from '@/contexts/Store';

export interface EditFormInput {
  title: String;
  voteItem1: String;
  voteItem2: String;
  content: String;
  password: String;
  category: String;
}

export const EditModal = ({ onClose, isOpen }: UseDisclosureProps) => {
  const rootStore: RootStore = useContext(StoreContext) as RootStore;
  const { editStore } = rootStore;
  const { postArticle } = editStore;

  const modalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const { register, handleSubmit, setValue, clearErrors, setError, watch, formState } = useForm<EditFormInput>();

  // submit시에 password를 확인하여 에러를 반환하는 함수 구현
  const validatePassword = useCallback(() => {
    const password = watch('password', '');
    if (password === undefined || password.length < 4) {
      setError('password', {
        type: 'min',
      });
    } else {
      clearErrors('password');
    }
  }, [watch, setError, clearErrors]);

  // submit시에 password를 확인하여 에러를 반환하는 함수 구현
  const validateCategory = useCallback(() => {
    const categories = watch('category');
    if (categories === undefined || categories.length <= 0) {
      setError('category', {
        type: 'required',
      });
    } else {
      clearErrors('category');
    }
  }, [watch, setError, clearErrors]);

  const onSubmit: SubmitHandler<EditFormInput> = (data) => {
    validateCategory();
    validatePassword();
    postArticle(data);
  };

  return (
    <Modal onClose={modalClose} isOpen={isOpen || false} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>밸런스 게임 질문 등록</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={7}>
              <Grid gap={3}>
                <FormControl marginBottom={3} isRequired>
                  <FormLabel htmlFor="title">밸런스 게임 질문 (상황 설명)</FormLabel>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Input {...register('title')} variant="filled" placeholder="질문을 입력해주세요." size="sm" />
                </FormControl>
                <EditorContentSection register={register} />
              </Grid>
              <EditorCategoriesSection formState={formState} clearErrors={clearErrors} setValue={setValue} />
              <EditorPasswordSection formState={formState} clearErrors={clearErrors} setValue={setValue} />
              <Button colorScheme="twitter" marginBottom={3} type="submit">
                등록하기
              </Button>
            </Grid>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
