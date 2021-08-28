import React from 'react';
import videoPoster from '../../assets/imgs/filters.png';
import videoMP4 from '../../assets/videos/filters.mp4';
import videoWEBM from '../../assets/videos/filters.webm';

interface Props {

}

export const FilterVideo: React.FC<Props> = () => {
  return (
    <section className='py-12 px-10 max-w-screen-xl mx-auto px-2 lg:px-0'>
      <div className='w-full'>
        <h1 className='text-center text-3xl lg:text-5xl font-semibold text-gray-600' style={{ lineHeight: 1.2 }}>Filters</h1>
        <p className="text-center text-lg font-medium text-gray-500 mt-6">Advanced filtering options are available for tasks. keep a track of tasks based on multiple filters.</p>
        <div className='video container mt-5 mb-4'>
          <video
            muted
            autoPlay
            preload='auto'
            loop
            poster={videoPoster}
          >
            <source src={videoWEBM} type="video/webm"></source>
            <source src={videoMP4} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};
