import { makeStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg';
import { ReactComponent as BacklogIcon } from 'assets/icons/circle-dot.svg';
import { ReactComponent as TodoIcon } from 'assets/icons/circle.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';
import { ReactComponent as InProgressIcon } from 'assets/icons/half-circle.svg';
import { default as React, ReactNode, useEffect, useRef, useState } from 'react';
import { Status } from '../../shared/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  id: string;
  button: ReactNode;
  className?: string;
  onSelect?: (item: any) => void;
}
export const StatusMenu = ({ id, button, className, onSelect }: Props) => {
  let statusOpts = [
    [BacklogIcon, Status.BACKLOG, 'Backlog'],
    [TodoIcon, Status.TODO, 'Todo'],
    [InProgressIcon, Status.IN_PROGRESS, 'In Progress'],
    [DoneIcon, Status.DONE, 'Done'],
    [CancelIcon, Status.CANCELED, 'Canceled']
  ];
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (status: string) => {
    if (onSelect) {
      onSelect(status);
      setOpen(false);
    }
  };
  const options = statusOpts.map(([Icon, label, status]) => {
    return (
      <div className='flex items-center h-8 px-3 text-gray-500 focus:outline-none hover:text-gray-800 hover:bg-gray-100 cursor-pointer'
        onClick={() => handleSelect(label as string)}
      >
        <Icon className='mr-3' /> <span>{status}</span>
      </div>
    );
  });
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
};
