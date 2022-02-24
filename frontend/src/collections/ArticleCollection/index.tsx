import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Center, Divider } from '@chakra-ui/react';
import StoreContext from '@/contexts/Store';
import RootStore from '@/stores/RootStore';
import Article from '@/components/Article';
import ArticleCommentSection from '@/components/ArticleCommentSection';

interface IArticleCollectionProps {}

const ArticleCollection = () => {
  // 이렇게 사용하면 전달할 수 있다. 
  const rootStore: RootStore = useContext(StoreContext) as RootStore;
  const { articleStore, uiStore } = rootStore;
  
  return (
    <Container p={2}>
      <Article store={articleStore} uiStore={uiStore}/>
      <Center>
        <Divider borderWidth={2} borderColor="lavender" mt={3} mb={3} w="80%"/>
      </Center>
      <ArticleCommentSection store={articleStore}/>
    </Container>
  );
};

export default observer<IArticleCollectionProps>(ArticleCollection);
