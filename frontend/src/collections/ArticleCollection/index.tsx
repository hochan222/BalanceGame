import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '@/contexts/Store';
import RootStore from '@/stores/RootStore';
import ArticleList from '@/collections/ArticleCollection/ArticleList';

interface IArticleCollectionProps {}

const ArticleCollection = () => {
  const rootStore: RootStore = useContext(StoreContext) as RootStore;
  const { homeStore: store } = rootStore;
  const { articles } = store;

  const content = !rootStore.isLoading && articles.length > 0 ? <ArticleList articles={articles} /> : null;

  return content;
};

export default observer<IArticleCollectionProps>(ArticleCollection);
