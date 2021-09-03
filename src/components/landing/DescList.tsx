import React from 'react';
import BoardsPNG from '../../assets/imgs/boards.png';
import TaskListPNG from '../../assets/imgs/tasklist3.png';

interface Props {

}

export const DescList: React.FC<Props> = () => {
  return (
    <>
      <section className='py-12 px-10 max-w-screen-xl mx-auto px-2 lg:px-0 flex flex-col lg:flex-row items-center justify-between'>
        <div className='mb-5 lg:mb-0'>
          <h3 className='text-center lg:text-left text-gray-700 text-4xl mb-4 font-semibold'>List View</h3>
          <p className='text-center lg:text-left text-gray-600 text-lg font-medium lg:w-7/12' style={{ fontWeight: 100 }}>Organize tasks. With lists, teams see immediately what they need to do, which tasks are a priority, and when work starts.</p>
        </div>
        <div className='desc-img-container w-10/12'>
          <img height='auto' width='auto' src={TaskListPNG} alt='Task Lists' />
        </div>
      </section>

      <section className='py-12 px-10 max-w-screen-xl mx-auto px-2 lg:px-0 flex flex-col lg:flex-row items-center justify-between'>
        <div className='desc-img-container w-12/12 order-2 lg:order-1'>
          <img height='auto' width='auto' src={BoardsPNG} alt='Boards' />
        </div>
        <div className='mb-5 lg:mb-0 flex flex-col order-1 lg:order-2'>
          <h3 className='text-center lg:text-right text-gray-700 text-4xl mb-4 font-semibold'>Boards</h3>
          <p className='text-center lg:text-right text-gray-600 text-lg font-medium lg:w-7/12 self-end' style={{ fontWeight: 100 }}>Organize work like sticky notes and track tasks through every stage. Boards help make your work processes more transparent.</p>
        </div>
      </section>
    </>
  );
};
