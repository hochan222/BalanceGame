import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  PinInput,
  PinInputField,
  ModalFooter,
  Flex,
  Button
} from '@chakra-ui/react';

interface IArticleModal {
  isOpen: boolean;
  onClose : ()=>void;
  selectedArticleId: number;
}

const ArticleModal = (props: IArticleModal) => {
  const {isOpen, onClose, selectedArticleId} = props;
  const [match, setMatch] = useState(false);
  const [password, setPassword] = useState("");
  const initialRef = React.useRef();

  const enterEditArticle = (): void => {
    document.location.href = `/article/edit?articleId=${selectedArticleId}`;
  }
  const handleChange = (value: string) => {
    setPassword(value);
    setMatch(false);
  }
  const submitPassword = () => {
    // TODO : POST 작업 요청 후, 결과 값을 통해서 
    const success = true;
    if(success) {
      setMatch(true);
    }
  };

  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="xs"
        initialFocusRef={initialRef}
      >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">비밀번호 입력</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody p={5}>
            <FormControl isInvalid={!match && !!password}>
              <PinInput
                id="password"
                mask
                size="sm"
                placeholder='*'
                isInvalid={!match && !!password}
                onChange={handleChange}
                onComplete={submitPassword}
              >
                <PinInputField ref={initialRef}/>
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
              <FormHelperText fontSize="sm">비밀번호를 입력하세요.</FormHelperText>
              <FormErrorMessage mt={3}>🚨 비밀번호가 올바르지 않습니다.</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex align="flex-end">
              <Button disabled={!match} size="sm" mr={1} onClick={enterEditArticle}>수정</Button>
              <Button disabled={!match} size="sm" >삭제</Button>
            </Flex>
          </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default ArticleModal;