/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoginButton } from 'components/auth/LoginButton';
import React from 'react';

interface Props {

}

export const Nav: React.FC<Props> = () => {
    return (
        <header className="text-black-700 body-font border-b border-gray-200">
        <div className="container bg-primary mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">ProductBoard</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="" className="mr-5 hover:text-gray-900">First Link</a>
            <a href="" className="mr-5 hover:text-gray-900">Second Link</a>
            <a href="" className="mr-5 hover:text-gray-900">Third Link</a>
            <a href="" className="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"><LoginButton />
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    )
}