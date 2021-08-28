import { Cards } from 'components/landing/Cards';
import { DescList } from 'components/landing/DescList';
import { Faq } from 'components/landing/Faq';
import { FilterVideo } from 'components/landing/FilterVideo';
import { Footer } from 'components/landing/Footer';
import { GetStarted } from 'components/landing/GetStarted';
import { Main } from 'components/landing/Main';
import { Nav } from 'components/landing/Nav';
import React from 'react';

interface Props {

}

export const Landing: React.FC<Props> = () => {
  return (
    <>
      <Nav />
      <Main />
      <Cards />
      <FilterVideo />
      <DescList />
      <Faq />
      <GetStarted />
      <Footer />
    </>
  );
};
