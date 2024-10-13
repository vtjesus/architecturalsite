"use client";

import DraftCarousel from "@/components/DraftCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import Navbar from "@/components/Navbar";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { drafts as originalDrafts, images } from "@/constants";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import axios from 'axios';


const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }).optional(),
});
  


// Ensure all drafts have a description
const drafts = originalDrafts.map((draft) => ({
  ...draft,
  description: draft.description || "",
}));


const HomePage = () => {
  // to track my form submission status
  const [formStatus, setFormStatus] = useState<string | null>(null);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      // send the form data to the API route
      const response = await axios.post('/api/send-email', values);

      // check if the response is successful
      if (response.status === 200) {
        console.log('Email sent successfully', response.data);
        setFormStatus('Your message was sent successfully');
        form.reset(); 
      }
    }catch (error){
      console.error('Error sending email', error);
      setFormStatus('An error occurred while sending your message');
    }
    console.log(values);
  }

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true); // Trigger animation when component mounts
  }, []);

  return (
    <div>
      {/* Make sure Navbar has the class that fixes its position */}
      <Navbar />

      <div className="page-content">
        {/* Home Section */}
        <section
          id="home"
          className="h-screen flex flex-col lg:flex-row items-center bg-blue-900"
        >
          {/* Left Section with Image */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isLoaded ? "lg:w-1/2 w-full" : "w-0"
            } h-1/2 lg:h-full bg-cover bg-center`}
            style={{ backgroundImage: "url('/icons/profile.png')" }}
          ></div>

          {/* Right Section with Text */}
          <div
            className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col items-start 
            justify-center px-6 lg:px-12 text-white text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold mb-4">Stareds Architects</h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
              Let's make your vision come to life
            </h2>
            {/* Smooth scrolling to #about section */}
            <a
              href="#about"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="h-screen bg-white flex items-center justify-center px-8"
        >
          <div className="max-w-4xl w-full">
            {/* Heading on the left with a line on top */}
            <div className="relative mb-6 w-1/2">
              <div className="absolute -top-4 left-0 w-16 h-1 bg-blue-600"></div>
              <h2 className="text-5xl font-semibold">
                Stareds is built on our founders' unique outlook on construction
              </h2>
            </div>

            {/* Paragraph on the right */}
            <div className="flex justify-end">
              <p className="text-md text-gray-600 leading-relaxed max-w-md">
                Stareds is a construction company that was founded by Edward
                Mbuthia. Mbuthia has always had a unique outlook on
                construction, and they have used this outlook to build a
                successful company that is known for its innovative designs and
                high-quality workmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {/* Added padding-top to offset the fixed navbar */}
        <section
          id="services"
          className="min-h-screen bg-blue-900 text-white px-8 py-16" // Changed to min-h-screen to grow dynamically
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-semibold mb-6 text-center">
              Our Services
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto">
              We offer a wide range of architectural services that cater to
              residential and commercial spaces. Our services are designed to
              meet the unique needs of each client, ensuring that every project
              is delivered with the highest quality and precision.
            </p>

            {/* Flexbox container, but let's improve the layout for more services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Item */}
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/icons/residential.png"
                  alt="Residential Spaces"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2">RESIDENTIAL SPACES</h3>
                  <p>
                    Residential spaces that blend design with functionality,
                    delivering comfort and style.
                  </p>
                </div>
              </div>
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/icons/project1.png"
                  alt="Residential Spaces"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2">COMMERCIAL SPACES</h3>
                  <p>
                    Commercial Spaces that blend design with functionality,
                    delivering comfort and style.
                  </p>
                </div>
              </div>

              {/* Service Item */}
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <ImageCarousel images={images} />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2 mt-3">3D VISUALS</h3>
                  <p>
                    High-quality 3D visuals designed to showcase commercial
                    buildings with detailed representations.
                  </p>
                </div>
              </div>

              {/* Service Item */}
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <img
                  src="icons/Interior design1.png"
                  alt="Interior Designs"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2">INTERIOR DESIGNS</h3>
                  <p>
                    Interior designs that elevate spaces with a blend of
                    aesthetics and functionality.
                  </p>
                </div>
              </div>

              {/* Service Item */}
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <DraftCarousel drafts={drafts} />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2 mt-3"></h3>
                  <p>{drafts[0].description}</p>
                </div>
              </div>
              {/* Service Item */}
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <img
                  src="icons/landscaping.jpg"
                  alt="Landscaping"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2">LANDSCAPING</h3>
                  <p>
                    Landscaping services that transform outdoor spaces into
                    beautiful and functional areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <section
          id="projects"
          className="h-auto bg-gray-400 text-gray-900 px-8 py-16"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-semibold mb-6 text-center">
              Our Projects
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto">
              Here are some of the landmark projects we have successfully
              completed. Each project demonstrates our commitment to quality,
              innovation, and sustainability.
            </p>

            {/* Projects Carousel with increased height */}
            <div className="w-full h-[500px]">
              <ProjectsCarousel />
            </div>
          </div>
        </section>

        <footer id="contact" className="bg-blue-900 text-white px-4 py-8">
          <h2 className="text-4xl font-semibold mb-6 text-center">
            Contact Us
          </h2>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {/* Left side: Contact form */}
            <div className="w-full md:w-1/2 mt-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="flex">
                    <CustomInput
                      control={form.control}
                      name="name"
                      label="Name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="flex">
                    <CustomInput
                      control={form.control}
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="flex">
                    <CustomInput
                      control={form.control}
                      name="description"
                      label="Description"
                      placeholder="Purpose of business"
                    />
                  </div>
                  <Button type="submit" className="bg-slate-600">
                    Contact Us
                  </Button>
                </form>
              </Form>
              {formStatus && (
                <div className="mt-4 text-green-500">{formStatus}</div>
              )}
            </div>

            {/* Right side: Social media links */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-2">
              <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
              <div className="flex items-center text-lg hover:text-gray-400 mt-2">
                <img
                  src="/icons/email.png"
                  alt="Email"
                  className="w-6 h-6 mr-2"
                />
                <a href="mailto:edwardmbuthia.em@gmail.com" className="text-lg">
                  edwardmbuthia.em@gmail.com
                </a>
              </div>
              <div className="space-y-1">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg hover:text-gray-400"
                >
                  <img
                    src="/icons/likedin.png"
                    alt="LinkedIn"
                    className="w-6 h-6 mr-2"
                  />
                  LinkedIn
                </a>
                <a
                  href="Mbuthia_the_Architect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg hover:text-gray-400"
                >
                  <img
                    src="/icons/twitter.png"
                    alt="Twitter"
                    className="w-6 h-6 mr-2"
                  />
                  Twitter
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg hover:text-gray-400"
                >
                  <img
                    src="/icons/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6 mr-2"
                  />
                  Facebook
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg hover:text-gray-400"
                >
                  <img
                    src="/icons/instagram.png"
                    alt="Facebook"
                    className="w-6 h-6 mr-2"
                  />
                  Instagram
                </a>
                {/* Add more social media links as needed */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
