import { Cards } from 'components/landing/Cards';
import { Faq } from 'components/landing/Faq';
import { Footer } from 'components/landing/Footer';
import { Link } from 'components/landing/Link';
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
      <Faq />
      <Link />
      <Footer />


    </>
  )
    ;
};
