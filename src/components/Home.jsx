import React from "react";
/* social media import */
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

/* currently working import  */
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";

import { ReactTyped, Typed } from "react-typed";
import pic from "../../public/port-logo.jpg";

function Home() { 
  return (
    <>
      <div
        name="Home"
        className=" max-w-screen-2xl container mx-auto px-4 md:px-20 my-20 font-bold"
      >
        <div className="flex flex-col md:flex-row">
          {/* left part */}
          <div className="md:w-1/2 mt-12 md:mt-24 space-y-5 order-2 md:order-1">
            <span className="text-xl">Welcome In My Feed</span>
            <div className="flex space-x-1 text-2xl md:text-4xl">
              <h1>Hello, I'm a</h1>
              {/*  <span className="text-red-700 font-bold"> Developer</span> */}
              <ReactTyped
                className="text-red-500 font-semibold"
                strings={["Developer", "Programmer", "Coder"]}
                typeSpeed={40}
                backSpeed={50}
                loop={true}
              />
            </div>
            <br />
            <p className="text-sm md:text-md text-justify">
              Software developer with expertise in scalable web applications
              using JavaScript, Node.js, and MongoDB. Delivered projects like a
              MERN stack Airbnb clone, demonstrating full-stack development,
              database management, and seamless functionality integration.
              Passionate about creating impactful, user-focused solutions.
            </p>
            <br />
            <div className="flex  justify-between flex-col md:flex-row space-y-6 md:space-y-0 items-center ">
              {/* social media  */}
              <div className="space-y-3">
                <h1 className=" font-bold text-xl ml-3">Available on</h1>
                <ul className="flex space-x-5">
                  <a
                    href="https://www.linkedin.com/in/rahul-kumar-71a809202/"
                    target="_blank"
                  >
                    <li className="text-2xl cursor-pointer hover:scale-150 duration-200 rounded-full border-[2px] shadow-md">
                      <FaLinkedin />
                    </li>
                  </a>

                  <a
                    href="https://www.instagram.com/mr_rahhul/?hl=en"
                    target="_blank"
                  >
                    <li className="text-2xl cursor-pointer hover:scale-150 duration-200 rounded-full border-[2px] shadow-md">
                      <FaInstagramSquare />
                    </li>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=100084933447489"
                    target="_blank"
                  >
                    {" "}
                    <li className="text-2xl cursor-pointer hover:scale-150 duration-200 rounded-full border-[2px] shadow-md">
                      <FaFacebook />
                    </li>
                  </a>

                  <a href="https://t.me/Rahulkumar86920" target="_blank">
                    <li className="text-2xl cursor-pointer hover:scale-150 duration-200 rounded-full border-[2px] shadow-md">
                      <FaTelegram />
                    </li>
                  </a>
                </ul>
              </div>
              {/* Currently working on */}
              <div className="space-y-3 ml-0">
                <h1 className=" font-bold text-xl">Currently working on</h1>
                <ul className="flex space-x-5">
                  <li className="text-2xl md:text-3xl hover:scale-150 duration-200 cursor-pointer rounded-full border-[2px] shadow-md">
                    <SiMongodb />
                  </li>
                  <li className="text-2xl md:text-3xl hover:scale-150 duration-200 cursor-pointer rounded-full border-[2px] shadow-md">
                    <SiExpress />
                  </li>
                  <li className="text-2xl md:text-3xl hover:scale-150 duration-200 cursor-pointer rounded-full border-[2px] shadow-md">
                    <FaReact />
                  </li>
                  <li className="text-2xl md:text-3xl hover:scale-150 duration-200 cursor-pointer rounded-full border-[2px] shadow-md">
                    <FaNode />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* right part  */}
          <div className="md:w-1/2  md:mt-20 md:ml-48 md:mr-0 mt-10 ml-5 mr-5  order-1">
            <img
              src={pic}
              className="rounded-full md:w-[450px] md:h-[450px] "
              alt=""
            />
          </div>
        </div>
      </div>

      <hr className="color-red" />
    </>
  );
}

export default Home;
