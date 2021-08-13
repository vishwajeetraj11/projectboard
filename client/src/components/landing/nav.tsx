import { LoginButton } from 'components/auth/LoginButton';
import React from 'react';
import { Link } from "react-router-dom"

interface Props {

}

export const Nav: React.FC<Props> = () => {
    return (
        <header className="text-black-700 body-font border-b border-gray-200">
        <div className="container bg-primary mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
          <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-bold text-white text-xl">ProductBoard</span>
          </Link>
          
          <LoginButton />
        </div>
      </header>
    )
}