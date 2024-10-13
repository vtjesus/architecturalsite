import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DraftCarousel = ({ drafts}: DraftCarouselProps) => {
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
        {drafts.map((draft, index) => (
          <div key={index} className="p-4">
            <div className="bg-white text-black rounded-lg shadow-lg">
              <img
                src={draft.image}
                alt={draft.title}
                className="w-full  h-48  object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-2">
                    {draft.title}</h3>
                <p>{draft.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DraftCarousel
