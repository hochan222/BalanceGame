import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '@/contexts/Store';
import RootStore from '@/stores/RootStore';
import TimeLine from '@/components/TimeLine';

interface ISearchResultCollectionProps {}

const SearchResultCollection = () => {
  const rootStore: RootStore = useContext(StoreContext) as RootStore;
  const { searchResultStore: store } = rootStore;
  const { timeLine } = store;

  const content = !rootStore.isLoading && timeLine.days.length > 0 ? <TimeLine timeLine={timeLine} /> : null;

  return content;
};

export default observer<ISearchResultCollectionProps>(SearchResultCollection);
