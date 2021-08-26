import React from 'react';

interface Props {
  fullScreen?: boolean;
}

export const Loader: React.FC<Props> = ({ fullScreen }) => (
  <div className={fullScreen ? 'h-screen w-screen flex items-center justify-center' : ''}>
    <div className={'spinner_3'} />
  </div>
);

