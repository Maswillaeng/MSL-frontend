export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  const findCookie = cookies.find((ele) => ele.startsWith(name));
  return findCookie;
};
