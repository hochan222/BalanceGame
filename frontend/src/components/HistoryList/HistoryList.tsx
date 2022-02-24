import React from 'react';
import { observer } from 'mobx-react-lite';

import ArticleModel from '@/models/ArticleModel';
import History from '@/components/History';

interface IHistoryListProps {
  articles: ArticleModel[];
  day: string;
}

const HistoryList = ({ articles, day }: IHistoryListProps) => {
  return (
    <section className="history-list">
      <div className="history-list__date">{day}</div>
      {articles.map((article) => {
        return <History key={`${article.id}-${article.title}`} article={article} />;
      })}
    </section>
  );
};

export default observer<IHistoryListProps>(HistoryList);
