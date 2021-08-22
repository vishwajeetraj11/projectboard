import React from 'react';
import { getLabelObj, getPriorityString, getStatusText } from 'shared/utils/common';
import { getParsedDate } from 'shared/utils/formatDate';

interface Props {
  extraDetails: any;
}

export const ChangeHistoryRow: React.FC<Props> = ({ extraDetails }) => {

  const field = extraDetails?.changedField;
  const value = extraDetails?.changedValue;

  let renderValue;

  if (field === 'status') {
    renderValue = getStatusText(value);
  } else if (field === 'priority') {
    renderValue = getPriorityString(value);
  } else if (field === 'startDate' || field === 'dueDate') {
    renderValue = getParsedDate(new Date(value));
  } else if (field === 'label') {
    renderValue = getLabelObj(value)?.name;
  }

  return (
    <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Changed the ${field} to ${renderValue}`}</p>
  );
};

/*
<p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Changed the ${h?.extraDetails?.changedField} to ${h?.extraDetails?.changedValue}`}</p>
 */
