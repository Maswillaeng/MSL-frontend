export const nickNameRule = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{3,8}$/;
export const emailRule =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const passwordRule =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{6,20}$/;
export const passwordRule2 = /(.)\1\1/;
export const phoneRule = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/;
