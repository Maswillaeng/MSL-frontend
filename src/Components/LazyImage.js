import useImageLazyLoad from "../hooks/lazyload";
import basic_img from "../assets/basic_thumbnail.png";

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, imageRef] = useImageLazyLoad(src ?? basic_img);
  return (
    <img
      className={className}
      alt={alt}
      src={imageSrc ? imageSrc : basic_img}
      ref={imageRef}
    />
  );
};

export default LazyImage;
