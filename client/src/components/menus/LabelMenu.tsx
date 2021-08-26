import { Portal } from 'components/Portal';
import React, { ReactNode, useState } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { DEFAULT_LABLES } from '../../shared/constants';
import { Label } from '../../shared/types';
import { Menu } from './Menu';

interface Props {
  id: string;
  button: ReactNode;
  className?: string;
  onSelect?: (label: Label) => void;
}

export const LabelMenu: React.FC<Props> = ({ id, button, className, onSelect }) => {
  const [keyword, setKeyword] = useState('');
  const handleSelect = (label: Label) => {
    if (onSelect) onSelect(label);
  };

  let labels = DEFAULT_LABLES;
  if (keyword !== '') {
    let normalizedKeyword = keyword.toLowerCase().trim();
    labels = labels.filter(l => l.name.toLowerCase().indexOf(normalizedKeyword) !== -1);
  }

  let options = labels.map((label) => (
    <Menu.Item
      onClick={() => handleSelect(label)}
    >
      <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ background: label.color }}></div>
      <div className='flex-1 overflow-hidden'>{label.name}</div>
    </Menu.Item>
  ));

  return (
    <>
      <ContextMenuTrigger id={id} holdToDisplay={3}>
        {button}
      </ContextMenuTrigger>

      <Portal>
        <Menu
          id={id}
          size='normal'
          filterKeyword={true}
          className={className}
          searchPlaceholder='Change labels...'
          onKeywordChange={(kw) => setKeyword(kw)}
        >
          {React.Children.toArray(options)}
        </Menu>
      </Portal>
    </>
  );
};
