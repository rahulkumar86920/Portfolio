import React from "react";
import java from "../../public/java.png";
import python from "../../public/python.webp";
import mongoDB from "../../public/mongodb.jpg";
import express from "../../public/express.png";
import reactjs from "../../public/reactjs.png";
import nodejs from "../../public/node.png";
import JavaScript from "../../public/javascript.png";
import SQL from "../../public/SQL.png";


function Portfolio() {
  const cardItem = [
    {
      id: 1,
      logo: mongoDB,
      name: "MongoDB",
      discription:
        "I have learned MongoDB for effective database management, CRUD operations, and troubleshooting.",
    },
    {
      id: 2,
      logo: express,
      name: "Express",
      discription:
        "I have learned Express for building web applications, handling routing, and managing middleware.",
    },
    {
      id: 3,
      logo: reactjs,
      name: "ReactJS",
      discription:
        "I have learned ReactJS for building dynamic UIs, managing state, and creating reusable components.",
    },
    {
      id: 4,
      logo: nodejs,
      name: "NodeJS",
      discription:
        "I have learned Node.js for building server-side applications, handling APIs, and managing backend logic",
    },
    {
      id: 5,
      logo: python,
      name: "Python",
      discription:
        "I have learned Python for scripting, data analysis, and building versatile applications.",
    },
    {
      id: 6,
      logo: java,
      name: "Java",
      discription:
        "I have learned Java for object-oriented programming, building applications, and solving complex problems.",
    },
    {
      id: 7,
      logo: JavaScript,
      name: "JavaScript",
      discription:
        "I have learned JavaScript for dynamic web development, event handling, and creating interactive interfaces.",
    },
    {
      id: 8,
      logo: SQL,
      name: "SQL",
      discription:
        "I have learned SQL for managing databases, querying data, and performing complex operations.",
    },
  ];
  return (
    <div
      name="Portfolio"
      className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-10 font-semibold"
    >
      <div>
        <h1 className="text-3xl font-bold mb-5">PortFolio</h1>
        <span className="font-semibold">Featured Projects</span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-5">
          {cardItem.map(({ id, logo, name, discription }) => (
            <div
              className="md:w-[300px] md:h-[300px] border-[2px] rounded-lg shadow-lg p-1 cursor-pointer hover:scale-110 duration-300"
              key={id}
            >
              <img
                src={logo}
                className="w-[120px] h-[120px] p-1 rounded-full border-[2px]"
                alt=""
              />
              <div>
                <div className="px-2 font-bold text-xl mb-2">{name}</div>
                <div>{discription}</div>

                {/* <p className="px-2 text-gray-700">
                  I have learned MongoDB for effective database management, CRUD
                  operations, and troubleshooting.
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
