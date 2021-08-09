import dayjs from 'dayjs';

export const formatDate = (date?: Date | undefined): string => {
  return dayjs(date).format('MMM DD');
};
