import React from 'react';
import { observer } from 'mobx-react-lite';

import HistoryList from '@/components/HistoryList';

interface ITimeLineProps {
  timeLine: {
    days: string[];
    timeLine: any;
  };
}

const TimeLine = ({ timeLine }: ITimeLineProps) => {
  const { days, timeLine: history } = timeLine;

  return (
    <section className="time-line">
      {days.map((day: string) => (
        <HistoryList key={day} articles={history[day]} day={day} />
      ))}
      <div className="time-line__read-more">+ read more</div>
    </section>
  );
};

export default observer<ITimeLineProps>(TimeLine);
