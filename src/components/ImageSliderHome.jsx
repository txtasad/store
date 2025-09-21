import React, { useEffect, useRef } from "react";
import {
  sales15,
  smartNotes
} from "../assets/index";

const ImageSliderHome = () => {
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const column3Ref = useRef(null);
  const column4Ref = useRef(null);

  useEffect(() => {
    const columns = [
      column1Ref.current,
      column2Ref.current,
      column3Ref.current,
      column4Ref.current,
    ];
    columns.forEach((column, index) => {
      const direction = index % 2 === 0 ? "down" : "up";
      column.style.animationName = `slide-${direction}`;
    });
  }, []);

  const images = [
    image01,
    image02,
    image03,
    image04,
    image05,
    image06,
    image07,
    image08,
    image09,
    image10,
  ];
  const images_02 = [
    image11,
    image12,
    image17,
    image14,
    image15,
    image16,
    image13,
    image18,
    image19,
    image20,
  ];
  const images_03 = [
    image22,
    image23,
    image28,
    image24,
    image25,
    image26,
    image27,
    image21,
    image29,
    image30,
  ];
  const images_04 = [
    image03,
    image04,
    image05,
    image06,
    image07,
    image33,
    image34,
    image35,
    image31,
    image32,
  ];
  return (
    <div className="slider-container">
      <div className="column" ref={column1Ref}>
        <div className="content">
          {images.map((src, imgIndex) => (
            <img key={imgIndex} src={src} alt={`image_1_${imgIndex}`} />
          ))}
        </div>
      </div>
      <div className="column" ref={column2Ref}>
        <div className="content">
          {images_02.map((src, imgIndex) => (
            <img key={imgIndex} src={src} alt={`image_2_${imgIndex}`} />
          ))}
        </div>
      </div>
      <div className="column" ref={column3Ref}>
        <div className="content">
          {images_03.map((src, imgIndex) => (
            <img key={imgIndex} src={src} alt={`image_3_${imgIndex}`} />
          ))}
        </div>
      </div>
      <div className="column" ref={column4Ref}>
        <div className="content">
          {images_04.map((src, imgIndex) => (
            <img key={imgIndex} src={src} alt={`image_4_${imgIndex}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSliderHome;