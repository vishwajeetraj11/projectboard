import React, { useState } from 'react';

interface Props {

}

export const Home: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>Home</div>
  );
};
