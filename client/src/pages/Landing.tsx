import { Cards } from 'components/landing/Cards';
import { Faq } from 'components/landing/Faq';
import { Footer } from 'components/landing/Footer';
import { Main } from 'components/landing/Main';
import { Nav } from 'components/landing/Nav';
import { Support } from 'components/landing/Support';
import React from 'react';

interface Props {

}

export const Landing: React.FC<Props> = () => {
  return (
    <>
      <Nav />
      <Main />
      <Cards />
      <Faq />
      <Support />
      <Footer />
    </>
  );
};
