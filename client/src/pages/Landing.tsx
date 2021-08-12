import { Cards } from 'components/landing/cards';
import { Faq } from 'components/landing/faq';
import { Footer } from 'components/landing/footer';
import { Main } from 'components/landing/main';
import { Nav } from 'components/landing/nav';
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
      <Footer />

    </>
  )
    ;
};
