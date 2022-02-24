import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { when } from 'mobx';

import StoreContext from '@/contexts/Store';
import RootStore from '@/stores/RootStore';
import Section from '@/components/Section';
import Blur from '@/components/Blur';
import Header from '@/components/Header';
import SearchResultCollection from '@/collections/SearchResultCollection';
import Footer from '@/components/Footer';
import Search from '@/components/Search';
import Logo from '@/components/Logo';

const SearchResult = () => {
  const rootStore: RootStore = useContext(StoreContext) as RootStore;
  const { uiStore, searchResultStore: store } = rootStore;

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const keyword = params.get('keyword') || '';
  const category = params.get('category') as string;

  useEffect(() => {
    const disposer = when(
      () => !rootStore.searchResultStore.isLoading,
      () => {
        rootStore.setIsLoading(false);
      },
    );

    rootStore.searchResultStore.fetchArticles({ keyword, category });

    return () => {
      disposer();
    };
  }, [rootStore, keyword, category]);

  return (
    <Section className="search-result">
      <Blur>
        <Header className="search-result-header">
          <Logo />
          <Search uiStore={uiStore} store={store} className="search-result-wrapper" />
        </Header>

        <SearchResultCollection />

        <Footer />
      </Blur>
    </Section>
  );
};

export default SearchResult;
