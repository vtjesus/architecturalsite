"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { projects } from "@/constants";

const ProjectsCarousel = () => {
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
    <div className="relative w-full h-[500px]">
      {" "}
      {/* Correct height for carousel */}
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index} className="p-4">
            <div className="bg-white text-black rounded-lg shadow-lg h-full">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover rounded-t-lg" // Increased image height
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectsCarousel;
