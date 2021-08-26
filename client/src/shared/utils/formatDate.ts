import dayjs from 'dayjs';

export const formatDate = (date?: Date | undefined | null): string => {
  if (date === undefined) return 'No Date';
  return dayjs(date).format('MMM DD');
};


const SECOND_IN_MILLISECOND = 1000;
const MINUTE_IN_SECS = 60;
const HOUR_IN_SECS = 60 * MINUTE_IN_SECS;
const DAY_IN_SECS = 24 * HOUR_IN_SECS;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function jsCoreDateCreator(dateString: string) {
  // ref: https://github.com/facebook/react-native/issues/15819#issuecomment-369976505
  // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
  const _timestamp = dateString.split('.')[0];
  let dateParam: any[] = _timestamp.split(/[\s-:T]/);
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
  // @ts-ignore
  return new Date(...dateParam);
}
const getLocalDateFromUTC = (timestamp: string | Date): Date => {
  // convert server (UTC) date to local date

  const _date = (typeof timestamp === 'string')
    ? jsCoreDateCreator(`${timestamp}`)
    : new Date(`${timestamp}`);

  const tzOffsetInMs = _date.getTimezoneOffset() * MINUTE_IN_SECS * SECOND_IN_MILLISECOND;
  return new Date(_date.getTime() - tzOffsetInMs);
};

export const getParsedDate = (timestamp: string | Date, options?: any): string => {

  const _options = {
    fullMonth: false,
    withDate: true,
    withMonth: true,
    relativeDepth: ['secs', 'mins', 'hrs', 'days'],
    ...(options && Object.keys(options).length ? options : {}),
  };

  const nownow = new Date();
  const datetime = getLocalDateFromUTC(timestamp);
  const timeDiff = (nownow.getTime() - datetime.getTime()) / 1000;

  if (!_options.absolute) {
    // absolute date is not required
    if (timeDiff < MINUTE_IN_SECS && _options.relativeDepth.includes('secs')) {
      return 'just now';
    }
    else if ((timeDiff < MINUTE_IN_SECS * 2) && _options.relativeDepth.includes('mins')) {
      return 'a min ago';
    }
    else if (timeDiff < HOUR_IN_SECS && _options.relativeDepth.includes('mins')) {
      return Math.round(timeDiff / MINUTE_IN_SECS) + ' min ago';
    }
    else if (timeDiff < DAY_IN_SECS && _options.relativeDepth.includes('hrs')) {
      return Math.round(timeDiff / HOUR_IN_SECS) + ' hr ago';
    }
    else if (timeDiff < DAY_IN_SECS && nownow.getDate() === datetime.getDate() && _options.relativeDepth.includes('days')) {
      return 'Today'; //  + ' | ' + nownow.getDate() + ' - ' + datetime.getDate();
    }
    else if ((timeDiff < DAY_IN_SECS * 2) && (nownow.getDate() - datetime.getDate() === 1) && _options.relativeDepth.includes('days')) {
      return 'Yesterday';
    }
  }

  let timeString = '';

  if (_options.withMonth) {
    if (_options.fullMonth) {
      timeString += MONTHS[datetime.getMonth()];
    }
    else {
      timeString += MONTHS[datetime.getMonth()].substr(0, 3);
    }
  }
  if (_options.withDate) {
    timeString += ` ${datetime.getDate()}`;
  }
  if (_options.withYear) {
    timeString += (() => {
      let _year = datetime.getFullYear();
      return nownow.getFullYear() === _year ? '' : `, ${_year}`;
    })();
  }
  if (_options.withTime) {
    timeString += (() => {
      let _hr: any = datetime.getHours();
      if (_options.timeFormat12hr) {
        if (_hr === 0)
          _hr = 12;
        else if (_hr > 12)
          _hr = _hr - 12;
      }

      if (_hr < 10) {
        _hr = '0' + _hr;
      }

      return ` ${_hr}`;
    })();
    timeString += (() => {
      let _mins: any = datetime.getMinutes();
      if (_mins < 10) {
        _mins = '0' + _mins;
      }
      return `:${_mins}`;
    })();

    if (_options.timeFormat12hr) {
      timeString += (() => {
        let _hr = datetime.getHours();
        if (_hr < 12)
          return ' AM';
        else
          return ' PM';
      })();
    }
  }

  // return `${datetime.getDate()} | ${timeString}`;
  return timeString;
};
