import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  placeholder,
  icon,
  touchedInput,
  isValid,
  errorMessage,
  inputRef,
  type,
  id,
  changeInput,
  error,
}) => {
  return (
    <div className="mb-[10px]">
      <label
        htmlFor={id}
        className="flex items-center w-[450px] border-2 border-main "
      >
        <FontAwesomeIcon
          className="flex justify-center items-center w-[30px] h-[30px] border-2 border-r-main  text-main p-2 "
          icon={icon}
        />
        <input
          onChange={changeInput}
          ref={inputRef}
          onBlur={touchedInput}
          autoComplete="off"
          placeholder={placeholder}
          className="ml-[14px] w-[378px] h-[28px] py-[10px] border-0 outline-none text-base"
          type={type}
          id={id}
        />
      </label>
      {error && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Input;
