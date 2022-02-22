import React from 'react';
import { observer } from 'mobx-react-lite';

import ArticleModel from '@/models/ArticleModel';
import Article from '@/collections/ArticleCollection/Article';

interface IArticleListProps {
  articles: ArticleModel[];
}

const ArticleList = ({ articles }: IArticleListProps) => {
  return (
    <>
      {articles.map((article) => (
        <Article key={`${article.id}-${article.title}`} article={article} />
      ))}
    </>
  );
};

export default observer<IArticleListProps>(ArticleList);
