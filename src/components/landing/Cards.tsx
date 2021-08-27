/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { newFeatures } from 'shared/staticData';

interface Props {

}

export const Cards: React.FC<Props> = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-10 md:px-12 py-16 mx-auto lg:px-36">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className='text-center text-3xl lg:text-5xl font-semibold text-gray-600' style={{ lineHeight: 1.2 }}>Make you and your team more productive.</h1>
          <p className="text-center text-lg font-medium text-gray-500 mt-6">All you’d expect from a Collaboration Tool.</p>
        </div>
        <div className="features-grid-container">
          {newFeatures.map(feature => (
            <div key={feature.id} className="p-6 flex shadow-small hover:shadow-large transition-all m-2 rounded-md">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white text-indigo-500 mb-4 flex-shrink-0">
                {feature.Icon}
              </div>
              <div className="flex-grow pl-6">
                <h2 className="text-gray-500 text-lg font-semibold mb-2">{feature.title}</h2>
                <p className="leading-relaxed text-md text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
