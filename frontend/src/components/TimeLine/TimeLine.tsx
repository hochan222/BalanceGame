import React from 'react';
import { observer } from 'mobx-react-lite';

import HistoryList from '@/components/HistoryList';
import api from '@/utils/api';
import UIStore from '@/stores/UIStore';
import HomeStore from '@/stores/HomeStore';
import SearchResultStore from '@/stores/SearchResultStore';

interface ITimeLineProps {
  uiStore: UIStore;
  store: HomeStore | SearchResultStore;
}

const TimeLine = ({ uiStore, store }: ITimeLineProps) => {
  const { timeLine, lastOffset, setTimeLines, setLastOffset } = store;
  const { isArticleReadMoreEnd, setIsArticleReadMoreEnd } = uiStore;
  const { days, timeLine: history } = timeLine;

  const onClickReadMore = async () => {
    const response = await api.get(`/articles?offset=${lastOffset || 1}`);

    setTimeLines(response.data.data);
    const dataLength = response.data.data.length;
    const articleLength = response.data.data.length - 1;
    setLastOffset(response?.data?.data[articleLength]?.id || 0);
    console.log(response?.data?.data[articleLength]?.id || 0);
    if (dataLength === 0) {
      setIsArticleReadMoreEnd(true);
    }
  };

  return (
    <section className="time-line">
      {days.map((day: string) => (
        <HistoryList key={day} articles={history[day]} day={day} />
      ))}
      {!isArticleReadMoreEnd && (
        <div
          className="time-line__read-more"
          onClick={onClickReadMore}
          onKeyDown={onClickReadMore}
          role="button"
          tabIndex={0}
        >
          + read more
        </div>
      )}
    </section>
  );
};

export default observer<ITimeLineProps>(TimeLine);
