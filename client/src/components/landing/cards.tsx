/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { features } from 'shared/staticData';

interface Props {

}

export const Cards: React.FC<Props> = () => {
    return (
      <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Pitchfork Kickstarter Taxidermy</h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
        </div>
        <div className="border border-gray-200 p-6 rounded-lg">
        <div className="flex flex-wrap -m-4">
        {features.map(feature => (
              <div key={feature.id} className="p-4 md:w-1/3 flex">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white text-indigo-500 mb-4 flex-shrink-0">
                  {feature.Icon}
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{feature.title}</h2>
                  <p className="leading-relaxed text-base">{feature.description}</p>
                </div>
              </div>
            ))}
            </div>
        </div>
        <button className="flex mx-auto mt-16 text-white text-lg font-semibold bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Know more</button>
      </div>
    </section>

    )
}