export const formatNumber = (option, number) => {
  return new Intl.NumberFormat("en-US", option).format(number);
};

export const changeDateFormat = (time, option) => {
  const date = new Date(time);
  const changeDate = new Intl.DateTimeFormat("ko-KR", option).format(date);
  return changeDate;
};
