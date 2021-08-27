/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

interface Props {

}

export const Main: React.FC<Props> = () => {
  return (
    <section className="dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="mx-auto flex flex-col items-center px-4 pt-12 text-center md:pt-16 md:px-10 lg:px-32 lg:mb-16 xl:max-w-3xl">
        <h1 className="max-w-8xl text-5xl font-black mx-0 mt-0 mb-5">ProductBoard</h1>
        <p className="px-8 mt-4 mb-8 text-lg text-gray-500">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
        {/* <button className="px-8 py-3 mb-4 text-lg bg-primary text-white font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Get started</button> */}
        <a href="#" className="px-8 py-3 relative rounded group font-medium text-white font-semibold inline-block">
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-secondary to-primary"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-secondary to-primary"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-secondary to-primary"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-secondary from-primary"></span>
          <span className="relative">Get Started</span>
        </a>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="" className="w-4/6 mx-auto mb-12 mt-4 rounded-lg shadow-md"></img>
      </div>
    </section>
  );
};


