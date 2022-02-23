import React from 'react';
import { observer } from 'mobx-react-lite';

import ArticleModel from '@/models/ArticleModel';

const History = ({ article }: { article: ArticleModel }) => {
  const { title, content, createdAt, voteCount } = article;

  return (
    <section className="history">
      <h3>{title}</h3>
      <p className="history__content">{content}</p>
      <div className="history__footer">
        <time>{createdAt}</time>
        <p className="history__vote-count">투표수: {voteCount}</p>
      </div>
    </section>
  );
};

export default observer(History);