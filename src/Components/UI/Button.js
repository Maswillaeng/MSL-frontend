import "../../styles/input.css";

const Button = (props) => {
  return (
    <>
      {props.target === props.text ? (
        <button className="hover:bg-main md:bg-main md:rounded-[3px] md:h-[30px] md:w-[60px] md:text-white md:shadow-3xl md:flex md:justify-center md:items-center md:text-center  md:text-sm md:break-keep">
          {props.text}
        </button>
      ) : (
        <button className="button">{props.text}</button>
      )}
    </>
  );
};

export default Button;
