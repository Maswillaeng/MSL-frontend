// import { useRef, useState } from "react";

// const useSignInput = (validation) => {
//   const [isValid, setIsValid] = useState(false);
//   const [error, setError] = useState(false);
//   const inputRef = useRef(null);

//   const touchedInput = (e) => {
//     if (validation(inputRef.current.value)) {
//       setIsValid(true);
//       setError(false);
//     } else {
//       setIsValid(false);
//       setError(true);
//     }
//   };

//   return { setError, error, isValid, setIsValid, touchedInput, inputRef };
// };

// export default useSignInput;
