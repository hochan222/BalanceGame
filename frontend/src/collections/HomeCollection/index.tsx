import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '@/contexts/Store';
import RootStore from '@/stores/RootStore';
import Search from '@/components/Search';
import TimeLine from '@/components/TimeLine';
import BalanceGame from '@/components/BalanceGame';
import Spinner from '@/components/Spinner';
import EditButton from '@/components/EditButton';

interface IHomeCollectionProps {}

const HomeCollection = () => {
  const rootStore: RootStore = useContext(StoreContext) as RootStore;
  const { homeStore: store, uiStore, searchResultStore } = rootStore;
  const { timeLine } = store;

  const content =
    !rootStore.isLoading && timeLine.days.length > 0 ? <><EditButton/> <TimeLine store={store} uiStore={uiStore} /></> : <Spinner />;

  return (
    <>
      <BalanceGame />
      <Search store={searchResultStore} uiStore={uiStore} />
      {content}
    </>
  );
};

export default observer<IHomeCollectionProps>(HomeCollection);
