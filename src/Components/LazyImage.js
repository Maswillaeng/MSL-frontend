import useImageLazyLoad from "../hooks/lazyload";

const LazyImage = ({ src, alt, className, basic_img }) => {
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
