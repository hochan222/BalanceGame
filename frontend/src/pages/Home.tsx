import React from 'react';

import Blur from '@/components/Blur';
import Section from '@/components/Section';
import Title from '@/components/Title';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Search from '@/components/Search';

const Home = () => {
  return (
    <Section className="home">
      <Blur>
        <Header>
          <Title text="11st Balance Game" />
        </Header>

        <Search />

        <a href="/article">article</a>
        
        <Footer/>
      </Blur>
    </Section>
  );
};

export default Home;
