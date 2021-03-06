import { useEffect, useState } from 'react';

const useImage = (
  url: string,
  width: number,
  height: number,
  crossOrigin?: string | null
): CanvasImageSource => {
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    const img: HTMLImageElement = document.createElement<'img'>('img');

    const onLoad = () => {
      setImage(img);
    };
    const onError = (error) => {
      console.error(error);
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    crossOrigin && (img.crossOrigin = crossOrigin);
    img.src = url;

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [url, crossOrigin, width, height]);

  useEffect(() => {
    setImage((prev) => {
      if (prev) prev.width = width;
      return prev;
    });
  }, [width]);

  useEffect(() => {
    setImage((prev) => {
      if (prev) prev.height = height;
      return prev;
    });
  }, [height]);

  return image;
};
export default useImage;
