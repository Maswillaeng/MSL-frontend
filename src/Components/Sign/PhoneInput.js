// import { useContext } from "react";
// import { imPortFetch } from "../../api/userFetch";
// import SignInputContext from "../../context/check-signInput-context";

// const PhoneInput = () => {
//   const { info, updatePhoneInfo } = useContext(SignInputContext);
//   const { phoneInfo } = info;
//   const { error } = phoneInfo;

//   const certificateUser = () => {
//     const IMP = window.IMP;
//     IMP.init("imp10391932");
//     console.log("hi");
//     IMP.certification(
//       {
//         merchant_uid: `mid_${new Date().getTime()}`,
//         company: "",
//         carrier: "SKT",
//         name: "홍길동",
//         phone: "01012341234",
//       },
//       (res) => {
//         console.log(res);
//         if (res.success) {
//           (async () => {
//             await imPortFetch(res);
//           })();
//           updatePhoneInfo(true, false);
//         } else {
//           updatePhoneInfo(false, true);
//         }
//       }
//     );
//   };
//   return (
//     <>
//       <button
//         className={`mb-5 button border-2 ${
//           error ? " border-red-600" : "border-green-600"
//         }`}
//         onClick={certificateUser}
//         type="button"
//       >
//         휴대폰 본인 인증하기
//       </button>
//     </>
//   );
// };

// export default PhoneInput;
