import React from 'react';
import { Faqs } from 'shared/staticData';
import { Item } from './FaqItem';



interface Props {

}


export const Faq: React.FC<Props> = () => {
    return (
		<div className="px-12 pb-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-4  ">
    		<div className="max-w-xl sm:mx-auto lg:max-w-2xl">
      			<div className="max-w-xl flex align-center md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 lg:">
        			<h2 className="max-w-lg px-40 mb-4 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          				FAQs
        			</h2>
      			</div>
      			<div className="space-y-4">
        			{Faqs.map(faq => (
          				<Item key={faq.id} title={faq.question}> 
						  {/*  */}
            				{faq.ans}
          				</Item>
        			))}
      			</div>
    		</div>
  		</div>
  	);
};
