export const formatNumber = (option, number) => {
  return new Intl.NumberFormat("ko-KR", option).format(number);
};

export const changeDateFormat = (time, option) => {
  const oneDay = new Date(60 * 60 * 24 * 1000);
  const oneHour = new Date(60 * 60 * 1000);
  const oneSec = new Date(60 * 1000);
  const changeMs = changeDateToSeconds(time);

  let date;
  let returnValue;

  if (Date.now() - changeMs < oneSec.getTime()) {
    date = new Date(Date.now() - changeMs);
    returnValue = `${Math.floor(changeDateToSeconds(date) / 1000)}초 전`;
    return returnValue;
  } else if (Date.now() - changeMs < oneHour.getTime()) {
    date = new Date(Date.now() - changeMs);
    returnValue = `${Math.floor(changeDateToSeconds(date) / (1000 * 60))}분 전`;
    return returnValue;
  } else if (Date.now() - changeMs < oneDay.getTime()) {
    date = new Date(Date.now() - changeMs);
    returnValue = `${Math.floor(
      changeDateToSeconds(date) / (1000 * 60 * 60)
    )}시간 전`;
    return returnValue;
  }

  date = new Date(time);
  returnValue = new Intl.DateTimeFormat("ko-KR", option).format(date);
  return returnValue;
};

export const changeDateToSeconds = (date) => {
  const MilliSeconds = Date.parse(date);
  return MilliSeconds;
};
