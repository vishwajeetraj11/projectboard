import dayjs from 'dayjs';

export const formatDate = (date?: Date | undefined | null): string => {
  return dayjs(date).format('MMM DD');
};
