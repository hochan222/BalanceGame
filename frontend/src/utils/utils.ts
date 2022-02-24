import dayjs from 'dayjs';

const wait = async (delay: number): Promise<number> => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise<number>((resolve) => setTimeout(resolve, delay));
};

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

export { wait, convertTimeToLeftTime };
