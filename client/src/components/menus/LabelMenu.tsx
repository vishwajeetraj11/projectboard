import { ClickAwayListener, Grow, makeStyles, MenuList, Paper, Popper } from '@material-ui/core';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { DEFAULT_LABLES } from '../../shared/constants';
import { Label } from '../../shared/types';


interface Props {
  id: string;
  button: ReactNode;
  className?: string;
  onSelect?: (label: Label) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function LabelMenu({ id, button, className, onSelect }: Props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (label: Label) => {
    if (onSelect) {
      onSelect(label);
      setOpen(false);
    }
  };

  let labels = DEFAULT_LABLES;
  let options = labels.map((label) => (
    <div
      className='flex items-center h-8 px-3 text-gray-500 focus:outline-none hover:text-gray-800 hover:bg-gray-100 cursor-pointer'
      onClick={() => handleSelect(label)}
    >
      {/* <input type='check' className='w-3.5 h-3.5 mr-3' /> */}
      <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ background: label.color }}></div>
      <div className='flex-1 overflow-hidden'>{label.name}</div>
    </div>
  ));

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(e: any) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current && anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {button}
      </div>
      <Popper className='z-10' open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              boxShadow: '0 5px 10px rgba(0,0,0,0.07)',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {React.Children.toArray(options)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
