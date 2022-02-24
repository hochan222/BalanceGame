import React from 'react';
import {
  ChakraProvider,
  Button,
  useDisclosure,
  UseDisclosureReturn,
  Flex
} from '@chakra-ui/react';
import EditModal from '../EditModal';

const EditButton = () => {
  const { isOpen, onOpen, onClose }: UseDisclosureReturn = useDisclosure();

  return (
    <ChakraProvider>
      <Flex justify="center" alignItems="center">
        <Button className="edit-button" aria-label='질문등록' onClick={onOpen} size="sm" bg="lavender" width="250px">밸런스 게임 생성하기</Button>
      </Flex>
      <EditModal onClose={onClose} isOpen={isOpen} />
    </ChakraProvider>
  );
}

export default EditButton;
