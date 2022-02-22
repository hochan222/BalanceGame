import React from 'react';
import { observer } from 'mobx-react-lite';

import ArticleModel from '@/models/ArticleModel';

const Article = ({ article }: { article: ArticleModel }) => {
  const { title, author } = article;

  return (
    <div>
      <p>{title}</p>
      <p>{author}</p>
    </div>
  );
};

export default observer(Article);
