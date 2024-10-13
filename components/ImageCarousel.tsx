import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const ImageCarousel = ({ images }: ImageCarouselProps) => {
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="w-full h-48">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`3D Visual ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export default ImageCarousel;
