import React from 'react';
import {
  Grid,
  Container,
  GridItem,
  Textarea,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { EditFormInput } from '../EditModal/EditModal';

interface EditorContentSectionProps {
  register: UseFormRegister<EditFormInput>

}

const EditorContentSection = ({ register }: EditorContentSectionProps) => {
  return (<>
    <Grid templateColumns="1fr 1fr" gap={1}>
      <GridItem>
        <Container
          bg="red.100"
          paddingTop={3}
          paddingBottom={3}
          borderRadius="md"
          borderWidth={0}
          borderColor="red"
          minH={110}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Textarea isRequired {...register("voteItem1")} size="sm" variant="unstyled" placeholder='A 선택지(필수)' color="red.500" />
        </Container>
      </GridItem>
      <GridItem>
        <Container
          bg="blue.100"
          paddingTop={3}
          paddingBottom={3}
          borderRadius="md"
          h={110}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Textarea isRequired {...register("voteItem2")} size="sm" variant="unstyled" placeholder='B 선택지(필수)' color="blue.500" />
        </Container>
      </GridItem>
    </Grid>
    <Container bg="gray.300">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Textarea isRequired {...register("content")} size="sm" variant="unstyled" placeholder='질문 부연설명' borderRadius="sm" />
    </Container>
  </>)
}

export default EditorContentSection;
