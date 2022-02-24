import React from 'react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

import ArticleModel from '@/models/ArticleModel';

const convertTimeToLeftTime = (time: string) => {
  const now = dayjs();
  const past = dayjs(time, 'YYYY-MM-DD HH:mm');
  const CONVERSION_CRETERIA = ['y', 'M', 'd', 'h', 'm', 's'];
  const CRITERIA = ['year', 'month', 'day', 'hour', 'minute', 'second'];

  now.format('YYYY-MM-DD HH:mm');
  past.format('YYYY-MM-DD HH:mm');

  const leftTime = CONVERSION_CRETERIA.map((criteria) => now.diff(past, criteria)).filter(Boolean);
  const isPlural = Number(leftTime[0]) > 1 ? 's' : '';

  return { leftTime: leftTime[0], unit: `${CRITERIA[CONVERSION_CRETERIA.length - leftTime.length]}${isPlural}` };
};

const History = ({ article }: { article: ArticleModel }) => {
  const { title, content, createdAt, voteCount } = article;
  const { leftTime, unit } = convertTimeToLeftTime(createdAt);

  return (
    <section className="history">
      <h3>{title}</h3>
      <p className="history__content">{content}</p>
      <div className="history__footer">
        <time>{`${leftTime} ${unit} ago`}</time>
        <p className="history__vote-count">투표수: {voteCount}</p>
      </div>
    </section>
  );
};

export default observer(History);
