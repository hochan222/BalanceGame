import React, { useContext, useEffect } from 'react';
import { when } from 'mobx';

import Blur from '@/components/Blur';
import Section from '@/components/Section';
import Title from '@/components/Title';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RootStore from '@/stores/RootStore';
import StoreContext from '@/contexts/Store';
import HomeCollection from '@/collections/HomeCollection';

const Home = () => {
  const rootStore: RootStore = useContext(StoreContext) as RootStore;

  useEffect(() => {
    const disposer = when(
      () => !rootStore.homeStore.isLoading,
      () => {
        rootStore.setIsLoading(false);
      },
    );

    rootStore.homeStore.fetchArticles();

    return () => {
      disposer();
    };
  }, [rootStore]);

  return (
    <Section className="home">
      <Blur>
        <Header>
          <Title text="11st Balance Game" />
        </Header>

        <HomeCollection />

        <Footer />
      </Blur>
    </Section>
  );
};

export default Home;
