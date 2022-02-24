import React, {useState} from 'react';

import {
  VStack,
  Flex,
  Input,
  IconButton
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { observer } from 'mobx-react-lite';
import CommentList from '@/components/CommentList';
import AriticleStore from '@/stores/ArticleStore';

const ArticleCommentSection = ({ store } : { store: AriticleStore }) => {
  const { comments, postComment } = store;
  const [input, setInput] = useState<string>("");

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.target.value);
  }

  const submitComment =() => {
    postComment(input);
  }

  return (
    <VStack gap={3}>
      <Flex w="100%">
        <Input
          variant="filled"
          size="md"
          placeholder='댓글을 작성해주세요.'
          width="full"
          borderRadius="md"
          mr={1}
          bg="rgba(255, 255, 255, 0.7)"
          color=""
          _focus={
            { bg: "rgba(255, 255, 255, 0.5)"}
          }
          onChange={handleInput}
        />
        <IconButton
          colorScheme='teal'
          aria-label='Call Sage'
          w="3.75rem"
          h="inherit"
          icon={<ChatIcon />}
          onClick={submitComment}
        />
      </Flex>
      <section className="time-line">
        <CommentList comments={comments} />
        <div className="time-line__read-more">+ read more</div>
      </section>
    </VStack>
  )
}

export default observer(ArticleCommentSection);