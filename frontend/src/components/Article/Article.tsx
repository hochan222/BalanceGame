import React, { useState } from 'react';
import {
  Container, VStack, Text, Grid,
  GridItem,
  Textarea,
  Button,
  Flex,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';

import {ArrowLeftIcon, ArrowRightIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import { observer } from 'mobx-react-lite';
import AriticleStore from '@/stores/ArticleStore';
import UIStore from '@/stores/UIStore';
import ArticleModal from '../ArticleModal';

interface IArticleProp {
  store: AriticleStore;
  uiStore: UIStore;
}

const Article = ({ store, uiStore } : IArticleProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { article,  patchVote } = store;
  const { selectedArticleId } = uiStore;
  const [voted, setVoted] = useState<boolean>(false);
  const [selectedVote, selectVote] = useState<string>("");

  const enterOtherArticle = (offset: number): void => {
    if(selectedArticleId + offset < 1) {
      alert("마지막 질문 입니다.");
    }else {
      document.location.href = `/article?articleId=${selectedArticleId + offset}`;
    }
  };

  const vote = (clickedVote: string) : void => {
      if(!voted){
        setVoted(true);
        selectVote(clickedVote);
        patchVote(clickedVote);
      }
  }

  return (
    <>
      <VStack w="100%">
        <Container marginTop={5} marginBottom={3} pr={0}>
          <Flex justify="center" align="center">
              <Text fontSize='lg' align="center" fontWeight="700">Q. {article.title}</Text>
              <IconButton
                variant="unstyled"
                aria-label='wow'
                borderRadius="none"
                p={0} ml={2} mr={0}
                icon={<EditIcon/>}
                onClick={onOpen}
              />
            </Flex>
        </Container>
        <Grid
          templateColumns="1fr 1fr"
          gap={1}
          h="max-content"
          minH={180}
          w="100%"
        >
          <GridItem overflowX="auto">
            <Container
              bg={voted ? "gray.200": "red.100"}
              as={voted ? "div": "button"}
              paddingTop={2}
              paddingBottom={2}
              borderRadius="md"
              borderWidth={0}
              borderColor="red"
              h="full"
              display="flex"
              alignItems="center"
              onClick={()=>vote("left")}
            >
              <VStack w="full">
                {
                  article.leftItem?.split("\n").map((text) => {
                    return <Text fontSize="md" color="red.500" w="full" align="center">{text}</Text>
                  })
                }
                {
                  voted && (
                    <Text fontSize="2xl" color="red.500" w="full" align="center">{article.leftCount}표</Text>
                  )
                }
                {
                  selectedVote === "left" && (
                    <CheckIcon color='green.500'/>
                  )
                }
              </VStack>
            </Container>
          </GridItem>
          <GridItem overflowX="auto">
            <Container
              bg={voted ? "gray.200": "blue.100"}
              as={voted ? "div": "button"}
              paddingTop={2}
              paddingBottom={2}
              borderRadius="md"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={()=>vote("right")}
            >
              <VStack w="full">
                {
                  article.rightItem?.split("\n").map((text) => {
                    return <Text fontSize="md" color="blue.500" w="full" align="center">{text}</Text>
                  })
                }
                {
                  voted && (
                    <Text fontSize="2xl" color="blue.500" w="full" align="center">{article.rightCount}표</Text>
                  )
                }
                {
                  selectedVote === "right" && (
                    <CheckIcon color='green.500'/>
                  )
                }
              </VStack>
            </Container>
          </GridItem>
        </Grid>
        <Container bg="gray.300">
          <Textarea 
            disabled 
            h="max-content" 
            size="sm" 
            variant="unstyled" 
            value={article.content as string} 
            borderRadius="sm" 
          />
        </Container>
      </VStack>
      <Flex justify="space-between" marginX={4} marginTop={1}>
        <Button 
          size="xs" 
          variant="ghost" 
          bg="lavender" 
          leftIcon={<ArrowLeftIcon />}
          onClick={()=>enterOtherArticle(-1)}
        >이전 질문</Button>
        <Button 
          size="xs" 
          variant="ghost" 
          bg="lavender" 
          rightIcon={<ArrowRightIcon />}
          onClick={()=>enterOtherArticle(1)}
        >다음 질문</Button>
      </Flex>
      <ArticleModal isOpen={isOpen} onClose={onClose} selectedArticleId={selectedArticleId}/>
    </>
  );
}

export default observer<IArticleProp>(Article);