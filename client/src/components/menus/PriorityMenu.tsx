import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as NoPriorityIcon } from 'assets/icons/dots.svg';
import { ReactComponent as UrgentPriorityIcon } from 'assets/icons/rounded-claim.svg';
import { ReactComponent as MediumPriorityIcon } from 'assets/icons/signal-medium.svg';
import { ReactComponent as HighPriorityIcon } from 'assets/icons/signal-strong.svg';
import { ReactComponent as LowPriorityIcon } from 'assets/icons/signal-weak.svg';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Priority } from 'shared/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  button: ReactNode;
  className?: string;
  onSelect?: (item: string) => void;
  disabled?: boolean;
}

export const PriorityMenu = ({ button, className, onSelect, disabled }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (priority: string) => {
    if (onSelect) {
      onSelect(priority);
      setOpen(false);
    }
  };
  let statusOpts = [
    [NoPriorityIcon, 'No priority', Priority.NO_PRIORITY],
    [UrgentPriorityIcon, 'Urgent', Priority.URGENT],
    [HighPriorityIcon, 'High', Priority.HIGH],
    [MediumPriorityIcon, 'Medium', Priority.MEDIUM],
    [LowPriorityIcon, 'Low', Priority.LOW]
  ];

  const options = statusOpts.map(([Icon, label, priority]) => {
    return (
      <div className='flex items-center h-8 px-3 text-gray-500 focus:outline-none hover:text-gray-800 hover:bg-gray-100 cursor-pointer'
        onClick={() => handleSelect(priority as string)}
      >
        <Icon className='mr-3' /> <span>{label}</span>
      </div>
    );
  });
  const handleToggle = () => {
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen);
    }
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
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              boxShadow: '0 5px 10px rgba(0,0,0,0.07)'
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

PriorityMenu.defaultProps = {
  filterKeyword: false
};
