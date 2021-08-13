import React from 'react';
import { Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { BuyMeACoffee } from './SVGs';


interface Props {

}

export const Link: React.FC<Props> = () => {
return (
    <div className="px-6 py-6 bg-gray-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center w-10/12 lg:w-9/12 mx-auto mb-10 lg:mb-20">
        <div className="xl:w-0 xl:flex-1">
          <h2 className="text-2xl leading-8 font-bold tracking-tight text-white sm:text-3xl sm:leading-9">
            Check out the Github Repository
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-200">
            The project is Open Source. Feel free to have a look around the repository. If you find OS Resume useful consider suporting me
            with a coffee or a star on the repository.
          </p>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
          <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <a target="_blank" href="https://github.com/vishwajeetraj11/osresume" rel="noreferrer">
              <Button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white  transition duration-150 ease-in-out mb-4">
                <GitHubIcon /> <p className="ml-4">Github</p>
              </Button>
            </a>

            <a target="_blank" href="https://www.buymeacoffee.com/vishwajeetraj11" rel="noreferrer">
              <Button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white  transition duration-150 ease-in-out">
                <BuyMeACoffee height={50} />
              </Button>
            </a>
          </div>
        </div>
      </div>
)
}