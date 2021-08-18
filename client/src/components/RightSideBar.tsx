import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
// import { ReactComponent as ViewIcon } from 'assets/icons/view.svg';
import classNames from 'classnames';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { RefObject, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
interface Props {
  // Show menu (for small screen only)
  showMenu: boolean;
  onCloseMenu?: () => void;
  onCreateIssue?: Function;
  onOpenHelp?: Function;
  onOpenInviteBox?: Function;
}


export const RightSideBar: React.FC<Props> = ({ showMenu, onCloseMenu }) => {

  const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;


  let classes = classNames(
    `absolute lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-72 font-sans text-sm text-gray-700 border-l border-gray-100 lg:shadow-none justify-items-start`,
    {
      '-translate-x-full ease-out shadow-none': !showMenu,
      'translate-x-0 ease-in shadow-xl': showMenu
    }
  );

  let ready = false;
  useClickOutside(ref, () => {
    if (ready && showMenu && onCloseMenu)
      onCloseMenu();
  });

  //FIXME: why we need add some delay here?
  useEffect(() => {
    setTimeout(() => ready = true, 300);
  });

  return (
    <>
      <div className={classes} style={{ zIndex: 1000 }} ref={ref}>
        <button
          className='flex-shrink-0 px-5 ml-2 lg:hidden h-14 focus:outline-none'
          onClick={onCloseMenu}
        >
          <CloseIcon className='w-4' />
        </button>

        {/* Top menu*/}
        <div className='flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3'>

        </div>
      </div>
    </>
  );
};
