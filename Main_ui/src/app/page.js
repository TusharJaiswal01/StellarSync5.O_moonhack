// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Calendar, Users, Award, DollarSign } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen max-w-full items-center bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      
//       <main className="flex-1">
//         <section className="py-24 text-center space-y-6">
//           <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-fade-in">
//             Manage Your College Clubs Smarter
//           </h1>
//           <p className="max-w-lg mx-auto text-lg text-gray-300">
//             An AI-powered platform that streamlines club management, event planning, and member engagement.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <Link href="/register">
//               <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-transform">
//                 Get Started
//               </Button>
//             </Link>
//             <Link href="#features">
//               <Button variant="outline" className="border-pink-500 text-white px-6 py-3 text-lg rounded-full hover:bg-pink-600 hover:text-white transition-all">
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//         </section>

//         <section id="features" className="w-full py-24 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
//           <div className="container text-center space-y-6">
//             <h2 className="text-4xl font-bold text-white">Powerful Features</h2>
//             <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//               Everything you need to manage your clubs efficiently and effectively.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8">
//               {[{
//                   icon: Users,
//                   title: "Smart Membership Hub",
//                   desc: "Centralized dashboard to manage memberships.",
//                 },
//                 {
//                   icon: Calendar,
//                   title: "Automated Event Management",
//                   desc: "Schedule events with AI-powered insights.",
//                 },
//                 {
//                   icon: Award,
//                   title: "AI-Driven Recognition",
//                   desc: "Track and reward active members.",
//                 },
//                 {
//                   icon: DollarSign,
//                   title: "Secure Resource Management",
//                   desc: "Role-based authentication and fund tracking.",
//                 }].map((feature, idx) => (
//                   <div key={idx} className="flex items-start gap-4 p-6 rounded-lg bg-white/10 backdrop-blur-lg shadow-md hover:scale-105 transition-transform">
//                     <feature.icon className="h-12 w-12 text-pink-400" />
//                     <div>
//                       <h3 className="text-xl font-bold text-white">{feature.title}</h3>
//                       <p className="text-gray-300">{feature.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="border-t py-6 w-full bg-white/10 backdrop-blur-lg text-gray-300 text-center">
//         <p>© 2025 ClubManager. All rights reserved.</p>
//         <div className="flex justify-center gap-4">
//           <Link href="/terms" className="hover:underline">Terms</Link>
//           <Link href="/privacy" className="hover:underline">Privacy</Link>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import "./globals.css";

import { useMemo, useCallback } from "react";

import Image from "next/image";
import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesComponent from "./particels";
import { Mail, Phone, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const features = [
  {
    imgSrc: 'https://cdn-icons-png.flaticon.com/128/4959/4959502.png',
    title: 'Collaborative Digital Workspaces ',
    description: 'Connect clubs and sponsors effortlessly. ',
    altText: 'Collaboration'
  },
  {
    imgSrc: 'https://cdn-icons-png.flaticon.com/128/11127/11127538.png',
    title: ' AI-Driven Credit & Recognition System  ',
    description: 'Track performance and achievements in real-time.      ',
    altText: 'Leadership'
  },
  {
    imgSrc: 'https://cdn-icons-png.flaticon.com/128/1585/1585316.png',
    title: 'Smart Membership Hub',
    description: ' Simplify membership management and rewards.',
    altText: 'Membership'
  },
  {
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/11287/11287355.png',
      title: 'Automated Event Management',
      description: 'Plan and manage events with ease.',
      altText: 'Event Management'
    },
    {
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/576/576515.png',
      title: 'AI-Powered Multilingual Chatbot',
      description:'Communicate seamlessly across languages.  ',
      altText: 'Multilanguage Chatbot'
    },
    {
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/3540/3540739.png',
      title: 'Secure Resource & Fund Management',
      description: 'Get smart insights with AI-powered analytics.   ',
     altText: 'Security'
    }
];
const testimonials = [
  {
    name: "Emily White",
    image: "https://images.pexels.com/photos/371160/pexels-photo-371160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "This club has completely transformed my college experience! The events are well-organized, and the community is super engaging. Highly recommended!"
  },
  {
    name: "Jane Smith",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    text: "Great club with amazing activities. I’ve learned so much and met some really cool people. Looking forward to more events!"
  },
  {
    name: "Robert Johnson",
    image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "One of the best clubs in college! The members are supportive, and every event is full of energy. Definitely worth joining!"
  },
  {
    name: "John Cena",
    image: "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "This club exceeded my expectations! From networking to skill-building, everything is top-notch. Proud to be a part of this community!"
  }
];

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  
  
  const containerRef = useRef(null);
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  

  const goToPrevious = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };



  
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const extraLeftBoxRef = useRef(null);
  const extraRightBoxRef = useRef(null);

  useEffect(() => {
    gsap.matchMedia().add("(min-width: 1029px)", () => {

      gsap.fromTo(
        leftBoxRef.current,
        { x: -400, rotate: -12 },
        {
          x: 70,
          y: -20,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftBoxRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        extraLeftBoxRef.current,
        { x: -600, rotate: 12 },
        {
          x: -120,
          y: -35,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: extraLeftBoxRef.current,
            start: 'bottom 50%',
            end: 'center center',
            scrub: 3,
          }
        }
      );

      gsap.fromTo(
        rightBoxRef.current,
        { x: 400, rotate: 12 },
        {
          x: 70,
          y: -20,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightBoxRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 2,
          }
        }
      );

      gsap.fromTo(
        extraRightBoxRef.current,
        { x: 600, rotate: -12 },
        {
          x: -120,
          y: -35,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: extraRightBoxRef.current,
            start: 'bottom 50%',
            end: 'center center',
            scrub: 3,
          }
        }
      );
    });
  }, []);

  

  useEffect(() => {
    // GSAP animations code (as you provided)
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1900',
        scrub: true,
        pin: true,
        markers: false,
      },
    })
    .fromTo(
      firstImageRef.current,
      { y: 0, opacity: "1", clipPath: 'inset(0% 0% 0% 0%)' },
      { y: '-500px', duration: 1, clipPath: 'inset(50% 0% 0% 0%)' }
    )
    .fromTo(
      secondImageRef.current,
      { y: '0%', opacity: "0" },
      { y: 0, duration: 1, opacity: "1" },
      '<'
    )
    .fromTo(
      '.image-left', 
      { x: '-120%', opacity: 0 },
      { x: '-220px', opacity: 1, duration: 1 }
    )
    .fromTo(
      '.image-right', 
      { x: '40%', opacity: 0 },
      { x: '170px', opacity: 1, duration: 1 },
      '<'
    )
    .fromTo(
      '.second-image-left', 
      { x: '-150%', opacity: 0 }, 
      { x: '-380px', opacity: 1, duration: 1 }
    )
    .fromTo(
      '.second-image-right', 
      { x: '150%', opacity: 0 }, 
      { x: '330px', opacity: 1, duration: 1 }, 
      '<'
    );
  }, []);
  return (
    <>
   <ParticlesComponent/>

    <div className="main-hero-gradient-box relative -z-10 "
   
     >
      {/* <Navbar/> */}

      <div id="heroSection" className="px-6 py-10 lg:py-10 gap-4 -z-20">
        <div className="mt-24 text-center gap-4">
          <h1 className="main-headin text-5xl sm:text-4xl lg:text-8xl text-white font-bold ">
          TechnoX(AI)
          </h1>
          <br />
          <span className="gradient-text text-3xl lg:text-7xl ">Your all in one cross platform manager</span>
          {/* <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl">
            The all-in-one platform for efficient disaster management and recovery.
          </p> */}
        </div>
      </div>
    </div>



{/*   Reels */}


    <div className="flex flex-col lg:flex-row relative min-h-screen">

      <div className=" lg:w-1/3 flex flex-col lg:flex-row justify-center items-center pt-10 bg-red text-[#FB8569] text-2xl lg:sticky top-14 h-full">
        <div
          ref={leftBoxRef}
          className=" w-68 h-[28rem] lg:w-[30rem] lg:h-[28rem]  bg-gray-100 border-2 border-gray-100 rounded-[3rem] shadow-lg lg:mb-10"
        >
          <video src="/clubVideo1.mp4" className='h-full w-full rounded-[3rem] object-cover p-1' autoPlay muted loop></video>
          {/* <img src="/aboutUs.png" className='h-full w-full rounded-[3rem] object-cover p-1'  alt="" /> */}
        </div>
 
        <div
          ref={extraLeftBoxRef}
          className="w-68 h-[28rem] mt-12 lg:mt-0 lg:w-[30rem] lg:h-[27rem]  bg-gray-100 border-2 border-gray-100 rounded-[3rem] shadow-lg transform"
        >
          <video src="/clubVideo2.mp4" className='h-full w-full rounded-[3rem] object-cover p-1' autoPlay muted loop></video>
   
        </div>
      </div>

      <div className=" text-center lg:text-start lg:w-1/3 pt-16 text-white space-y-10 p-4" style={{ fontFamily: "Philosopher" }}>
        <h1 className="text-5xl font-bold mb-4">Unforgettable Moments, Captured Forever </h1>
        <p className="text-gray-400 text-lg">
        Every event in our club brings a new wave of excitement—fun, creativity, and an opportunity to learn something new with friends. These videos capture those unforgettable memories that will always be a part of our journey.
        </p>

        <h1 className="text-5xl text-cente mb-4 font-bold lg:mt-80">Experience the Energy of Our Events</h1>
        <p className="text-gray-400 text-lg">
        Every event feels like a new adventure! From competitions and performances to workshops and networking, each moment creates an experience that goes beyond just an event—it becomes a cherished memory.

        </p>

        <div className='lg:h-60'></div>
      </div>

      <div className=" lg:w-1/3  flex flex-col lg:flex-row justify-center items-center pt-10 bg-red text-[#FB8569] text-2xl lg:sticky top-16 h-full">
        <div
          ref={rightBoxRef}
          className="w-68 h-[28rem] bg-gray-100 border-2 border-gray-100 rounded-[3rem] shadow-lg  mb-10"
        >
          <video src="/clubVideo3.mp4" className='h-full w-full rounded-[3rem] p-1 object-cover' autoPlay muted loop></video>
        </div>

        <div
          ref={extraRightBoxRef}
          className="w-68 h-[27rem] bg-gray-100 border-2 border-gray-100 rounded-[3rem] shadow-lg "
        >
          <video src="/clubVideo4.mp4" className='h-full w-full rounded-[3rem] p-1 object-cover' autoPlay muted loop></video>
        </div>
      </div>
    </div>




    {/*  Phone    */}
    <h1 className='text-center text-5xl'>Why Choose Us</h1>
    <div 
      ref={containerRef} 
      className="h-screen w-full flex justify-center items-center relative overflow-x-hidden overflow-y-hidden z-10"
      style={{ backgroundImage: `url('')` }}
    >
    
      {/* iPhone Image */}
      <div className="relative w-80 z-10 overflow-hidden">
        <img
          src="/holding-iphone.webp"
          alt="iPhone"
          className="relative inset-0 w-full h-auto z-50 ml-9"
        />

        <div className='absolute top-2 ml-[4.25rem] z-0 w-32 h-[17.25rem] overflow-hidden'>
          <img
            ref={firstImageRef}
            src="/phone-lock.jpg"
            alt="First Image"
            className="absolute w-[100%] h-[100%] object-cover z-0 rounded-2xl mix-blend-difference"
          />
          <img
            ref={secondImageRef}
            src="/phone1.png"
            alt="Second Image"
            className="absolute w-[100%] h-[100%] object-cover z-0"
          />
        </div>
      </div>

      {/* First Pair of Images */}
      <ImmersiveBackground imgLink="/phone2.png" Classprop="image-left absolute" margetop="-5.5rem" />
      <ImmersiveBackground imgLink="/phone3.png" Classprop="image-right absolute" margetop="-5.5rem" />

      {/* Second Pair of Images */}
      <ImmersiveBackground imgLink="/phone4.png" Classprop="second-image-left absolute" margetop="-4rem" small="true" />
      <ImmersiveBackground imgLink="/phone5.png" Classprop="second-image-right absolute" margetop="-4rem" small="true" />

      {/* Add ImageScroller at the bottom */}
      {/* <ImageScroller /> */}
    </div>




    {/* About */}

    <div className="bg-black pb-2 p-2   " id='about'>
     
      <h1 className='text-5xl font-bold text-center text-white pt-5'>About Us</h1>
      <div className="flex flex-col lg:flex-row justify-evenly items-center  lg:space-x-3 mt-10 mb-3 lg:ml-10">
        
       
        <div className=" w-[90%] sm:w-4/5 h-4/5 lg:w-[600px] lg:h-[500px] p-5 h- duration-500 group overflow-hidden relative  bg-neutral-800 text-neutral-50  flex flex-col justify-evenly content-fit rounded-xl">
          <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
          <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
          <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
          <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
          <div className="z-10 flex flex-col justify-evenly w-full h-full">
            <span className="text-2xl font-bold">TechnoX(AI) - Revolutionizing College Club Management with AI</span>
            <p>
            TechnoX(AI) simplifies college club management with AI-driven automation, smart analytics, and seamless collaboration, enhancing engagement and fostering a tech-powered community
              <br/>
              <br/>
              TechnoX(AI) streamlines clubs with AI-driven tracking, automation, and secure management for a seamless experience.
       <br/>
       <br/>
       TechnoX(AI) boosts collaboration and leadership with digital workspaces, real-time analytics, and AI-powered automation for seamless club operations.
        </p>
        </div>
        </div>

        
        <div className='w-[90%] sm:w-4/5 lg:w-[550px] lg:h-[500px]  mt-10 lg:mt-0 rounded-xl duration-500 group overflow-hidden relative bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly'>
          <Image 
            src="/aboutUs.png" 
            alt="Anti-Crisis Measures" 
            width={600} 
            height={500} 
            className="object-cover h-fit w-full lg:w-full rounde-xl"
          />
        </div>
      </div>
      <br />

        <br />
    </div>
   


    {/* Features */}

   
    <div className="bg-zinc-900 ">
      <h1 className="font-bold text-center text-4xl md:text-6xl text-white pt-9">
        Features We Provide
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  place-items-center  px-6 mt-10 lg:mt-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imgSrc={feature.imgSrc}
            title={feature.title}
            description={feature.description}
            altText={feature.altText}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
    </div>

  {/* Contact */}
 
  
    <section id="contact" className="" style={{zIndex:50}}>
      <div className='bg-black p-6'>
        <div>
          <h1 className='text-5xl text-center font-bold text-white pt-10'>Contact Us</h1>
    
          <div className="flex flex-col md:flex-row items-center  justify-between min-h-screen  bg-black ">
            {/* Left side: Contact Form */}
            <div className="md:w-1/2 w-96 mb-8 md:mb-0 ml-8 mr-8 p-8 lg:p-0 " >
              <form className="bg-slate-600 p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4 flex justify-center">Contact Form</h2>
    
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Your Name"
                  />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className=" mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Your Email"
                  />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Your Message"
                  />
                </div>
    
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                 onClick={()=>{console.log('ram')}}
                >
                  Send Message
                </button>
              </form>
            </div>
    
            {/* Right side: Contact Details */}
            <div className="sm:w-1/2 lg:w-[500px] bg-slate-600 p-8  rounded-lg shadow-lg  lg:h-[450px]">
              <h1 className='flex justify-center text-3xl font-bold'>Feel Free to Reach Out</h1>
              <br/>
              <p>We’d love to hear from you! For inquiries, feedback, or assistance, please reach out using the information below:</p>
              <br/>
              <p><strong>Email:</strong> TechnoX(AI)@gmail.com</p>
              <p><strong>Phone:</strong> 9357463528</p>
              <p><strong>Address:</strong> Indore, M.P.</p>
              <br/>
              <p>Have questions or suggestions? We’re here to help! Connect with us anytime, and we’ll get back to you as soon as possible. You can also stay updated by following us on social media.</p>
              <br/>
              <p>Thank you for reaching out!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  
  <div className="relative max-w flex justify-center w-full lg:mb-20 pt-10 pb-10 lg:pb-0">
  <div className="overflow-hidden relative border p-4 w-[85%] lg:min-w-[500px] h-[300px] lg:h-[400px] lg:max-w-[400px] rounded-tl-[35px] rounded-br-[35px] rounded-tr-[20px] rounded-bl-[20px]">
    <AnimatePresence>
      <motion.div
        key={currentIndex}
        className="w-full h-full absolute top-0 left-0"
        initial={{ x: "-100%", y: "105%", opacity: 0 }}
        animate={{ x: "0%", y: "0%", opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <img
          src={testimonials[currentIndex].image}
          alt={`Background ${currentIndex + 1}`}
          className="w-full h-full object-cover absolute top-0 left-0 opacity-40"
        />
        <div className="w-full h-full flex flex-col justify-center items-center text-white p-8">
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            className="w-24 h-24 rounded-full border-4 border-white mb-4"
          />
          <p className="text-xl mb-2">{testimonials[currentIndex].text}</p>
          <h3 className="text-lg font-bold">- {testimonials[currentIndex].name}</h3>
          <div className="flex mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`text-yellow-400 ${
                  index < testimonials[currentIndex].rating ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
    

  </div>

  <div className="absolute bottom-[-16%] left-1/3 flex gap-4">
    <button
      className="w-12 h-12 flex items-center justify-center border border-red-500 text-white rounded-lg bg-transparent hover:bg-red-500 hover:text-white"
      onClick={goToPrevious}
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
    <button
      className="w-12 h-12 flex items-center justify-center border border-red-500 text-white rounded-lg bg-transparent hover:bg-red-500 hover:text-white"
      onClick={goToNext}
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  </div>
</div>

  

    {/* Footer */}


    {/* <footer>
      <div className="footer-container">
       
        <div className="footer-logo">
          {[
            { img: 'https://images.pexels.com/photos/70573/fireman-firefighter-rubble-9-11-70573.jpeg?auto=compress&cs=tinysrgb&w=800', text: 'Support and relief' },
            { img: 'https://images.pexels.com/photos/29090554/pexels-photo-29090554/free-photo-of-fire-drill-at-cw-tower-building-entrance.jpeg?auto=compress&cs=tinysrgb&w=800', text: 'Management And Support' },
            { img: 'https://images.pexels.com/photos/16105713/pexels-photo-16105713/free-photo-of-group-of-paramedics-walking-through-a-demolished-city.jpeg?auto=compress&cs=tinysrgb&w=800', text: 'Analysis and Accuracy' },
            { img: 'https://images.pexels.com/photos/19271633/pexels-photo-19271633/free-photo-of-aerial-shot-of-a-flooded-city.jpeg?auto=compress&cs=tinysrgb&w=800', text: 'On Time Support' },
            { img: 'https://images.pexels.com/photos/9499554/pexels-photo-9499554.jpeg?auto=compress&cs=tinysrgb&w=800', text: 'Security is Our Aim' }
          ].map((item, index) => (
            <div key={index} className='flex justify-center gap-4 mt-2'>
              <Image src={item.img} alt="Support Logo" width={100} height={100} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>

      
        <div className="footer-section">
          <h4 className='ml-20'>Help and Support</h4>
          {[
            { img: '/assets/contact.png', text: 'Contact' },
            { img: '/assets/mail.png', text: 'Email' },
            { img: '/assets/phone.png', text: 'Phone' },
            { img: '/assets/address.png', text: 'Location' }
          ].map((item, index) => (
            <div key={index} className='flex justify-center mt-4'>
              <Image className='h-12 w-10' src={item.img} alt={item.text} width={40} height={40} />
              <Link href="#" legacyBehavior><a>{item.text}</a></Link>
            </div>
          ))}
        </div>

  
        <div className="footer-section">
          <h4 className='text-2xl text-red-400'>Legal</h4>
          {['Privacy policy', 'Terms and conditions', 'Subscription terms', 'Do Not Sell or Share My Personal Information', 'Notice at collection'].map((text, index) => (
            <li key={index}><Link href="#" legacyBehavior><a>{text}</a></Link></li>
          ))}
        </div>

        
        <div className="footer-section">
          <h4>Offices</h4>
          <p>AITR, Indore, Madhya Pradesh, [INDIA]</p>
          <p>At all times available for your service</p>
        </div>

        <div className="social-icons">
          {[
            { img: '/assets/linkedin.png', text: 'LinkedIn' },
            { img: '/assets/facebook.png', text: 'Facebook' },
            { img: '/assets/instagram.png', text: 'Instagram' },
            { img: 'https://cdn-icons-png.flaticon.com/128/5968/5968958.png', text: 'Twitter' }
          ].map((item, index) => (
            <div key={index} className='flex justify-center mt-4'>
              <Image className='h-12 w-10' src={item.img} alt={item.text} width={40} height={40} />
              <Link href="#" legacyBehavior><a>{item.text}</a></Link>
            </div>
          ))}
        </div>
      </div>

  
      <div className="footer-bottom flex items-center ml-96">
        <p>&copy; 2024 DisasterXAI Inc. All Rights Reserved. Made with Love By StellarSync5.O</p>
      </div>
    </footer> */}

{/* <section className="bg-black text-white min-h-screen flex flex-col justify-between">

<div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
  <button className="px-3 py-1 border border-gray-500 rounded-full text-sm">JA</button>
  <div className="text-xs text-gray-400 text-center">
    <p>BASED IN TOKYO</p>
    <p>WORKING WORLDWIDE</p>
  </div>
  <button className="flex items-center gap-2 border border-white rounded-full px-4 py-2">
    <span>BACK TO TOP</span>
    <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full">↑</span>
  </button>
</div>


<div className="flex items-center justify-center text-center">
  <h2 className="text-6xl md:text-9xl font-light tracking-widest" >
    GET IN <span className="inline-block relative">TOUCH</span>
  </h2>
</div>


<div className="flex justify-between gap-4 items-center px-6 py-4 bg-black border-t border-gray-700 text-xs text-gray-400">
  <p>©2021</p>
  <div className="flex justify-center gap-4 ">
  <a href="#" className="underline">INSTAGRAM</a>
  <a href="#" className="underline">FACEBOOK</a>
  <a href="#" className="underline">YOUTUBE</a>
  <a href="#" className="underline">LINKEDIN</a>
  </div>
  <button className="px-3 hidden lg:flex py-1 border border-gray-500 rounded-full">DARK MODE</button>
</div>
</section> */}
    <section className="bg-black text-white min-h-[60vh] flex flex-col mt-20 lg:pt-0 justify-between">
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-700">
        <button className="px-4 py-2 border border-gray-500 rounded-full text-sm">JA</button>
        <div className="text-xs text-gray-400 text-center">
          <p>BASED IN TOKYO</p>
          <p>WORKING WORLDWIDE</p>
        </div>
        <button className="flex items-center gap-2 border border-white rounded-full px-5 py-2">
          <Link href='#'>BACK TO TOP</Link>
          <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full">↑</span>
        </button>
      </div>

      <div className="flex flex-col items-center text-center py-12 px-8">
        <h2 className="text-6xl md:text-8xl font-light tracking-widest">
          GET IN <span className="inline-block relative">TOUCH</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl text-sm md:text-base">
          Let's collaborate! Feel free to reach out via email or follow us on social media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-10 border-t border-gray-700 text-sm text-gray-400">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-medium text-lg">Contact</h3>
          <p className="flex items-center gap-2"><Mail size={16} /> contact@example.com</p>
          <p className="flex items-center gap-2"><Phone size={16} /> +81 123-456-789</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-medium text-lg">Quick Links</h3>
          <a href="#" className="underline">About</a>
          <a href="#" className="underline">Services</a>
          <a href="#" className="underline">Projects</a>
          <a href="#" className="underline">Blog</a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-medium text-lg">Social Media</h3>
          <a href="#" className="flex items-center gap-2 underline"><Instagram size={16} /> Instagram</a>
          <a href="#" className="flex items-center gap-2 underline"><Facebook size={16} /> Facebook</a>
          <a href="#" className="flex items-center gap-2 underline"><Youtube size={16} /> YouTube</a>
          <a href="#" className="flex items-center gap-2 underline"><Linkedin size={16} /> LinkedIn</a>
        </div>
      </div>

      <div className="flex justify-between gap-4 items-center px-8 py-6 bg-black border-t border-gray-700 text-xs text-gray-400">
        <p>©2021 All Rights Reserved</p>
        <button className="px-4 hidden lg:flex py-1 border border-gray-500 rounded-full">DARK MODE</button>
      </div>
    </section>
    </>
  );
};

export default Home;

const FeatureCard = ({ imgSrc, title, description, altText }) => {
  return (
    <div className="group before:hover:scale-95 before:hover:h-72 h-80 mt-10 before:hover:w-80 before:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl bg-gradient-to-br from-black via-slate-950 to-indigo-950 before:absolute before:top-0 w-full sm:w-80  relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
      <div className="w-28 h-28 bg-transparent mt-8 rounded-full border-2 border-blue-300 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500">
        <img className="justify-center ml-6 mt-6" src={imgSrc} width="50px" height="50px" alt={altText} />
      </div>
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <span className="text-2xl font-semibold">{title}</span>
        <p>{description}</p>
      </div>
      <button
        aria-label="Get Started"
        className="px-8 py-2 bg-gray-400 text-black font-bold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 hover:border-green-600 hover: hover:shadow-2xl focus:outline-none"
      >
        Get Started
      </button>
    </div>
  );
};





const ImmersiveBackground = ({
  imghi,
  imgwi,
  widdth,
  heigght,
  Classprop = "",
  imgLink,
  small,
}) => {
  if (small !== "true") {
    return (
      <div
        style={{ width: widdth, height: heigght }}
        className={` ${Classprop} w-36 h-72 top-28 `}
      >
        <Image
          src="/iPhone14.webp" 
          alt={imgLink}
          width={144} 
          height={288} 
          className="relative z-50 w-full h-full "
        />
        <Image
          src={imgLink}
          alt="Background Image"
          width={144}
          height={288}
          className="h-full absolute inset-0 w-full rounded-3xl object-fill z-0 "
        />
      </div>
    );
  }

  return (
    <div
      style={{ width: widdth, height: heigght }}
      className={`w-36 h-72 top-28 ${Classprop}`}
    >
      <Image
        src="/iPhone14.webp"
        alt="iPhone 14 Pro"
        width={144}
        height={288}
        className="relative z-50 block w-full h-full"
      />

      <Image
        src={imgLink}
        alt="Background Image"
        width={144}
        height={288}
        className="h-full absolute inset-0  w-full rounded-3xl object-fill z-0 pt-2 "
      />

    </div>
  );
};








const ImageScroller = () => {
  // Array of image URLs or paths
  const images = [
    
    "https://cdn-icons-png.flaticon.com/128/4643/4643191.png",
    "https://cdn-icons-png.flaticon.com/128/13089/13089739.png",
  




    "https://cdn-icons-png.flaticon.com/128/15566/15566694.png",
    "https://cdn-icons-png.flaticon.com/128/13089/13089739.png",
    "https://cdn-icons-png.flaticon.com/128/15566/15566694.png",
    
    "https://cdn-icons-png.flaticon.com/128/13089/13089739.png",
    
    "https://cdn-icons-png.flaticon.com/128/2321/2321774.png",



    "https://cdn-icons-png.flaticon.com/128/13089/13089739.png",
    "https://cdn-icons-png.flaticon.com/128/4357/4357638.png",


    "https://cdn-icons-png.flaticon.com/128/4668/4668660.png",
    "https://cdn-icons-png.flaticon.com/128/15566/15566694.png",
    "https://cdn-icons-png.flaticon.com/128/4668/4668660.png",
    "https://cdn-icons-png.flaticon.com/128/4325/4325947.png",
    
    

  ];

  return (
    <div className="image-scroller mt-20">
      {/* Render all images without scrolling */}
      {images.map((src, index) => (
        <img key={index} src={src} alt={`image ${index}`} />
      ))}
    </div>
  );
};

