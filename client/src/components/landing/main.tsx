/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

interface Props {

}

export const Main: React.FC<Props> = () => {
    return (
        <section className="dark:bg-coolGray-800 dark:text-coolGray-100">
          <div className="container mx-auto flex flex-col items-center px-4 py-16 mb-8 text-center md:py-24 md:px-10 lg:px-32 xl:max-w-3xl">
            <h1 className="max-w-8xl text-7xl font-black mx-0 mt-0 mb-5 sm:text-5xl">ProductBoard
            </h1>
            <p className="px-8 mt-4 mb-8 text-lg text-gray-500">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
            <button className="px-8 py-3 mb-20 text-lg bg-primary text-white font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Get started</button>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="" className="w-3/6 mx-auto mb-12 mt-8 rounded-lg shadow-md lg:-mt-40"></img>
          </div>
        </section>
    )
}


