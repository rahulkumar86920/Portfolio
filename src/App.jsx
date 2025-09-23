import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experiance from "./components/Experiance";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Home />
        <About />
        <Experiance />
        <Contact />
        <Footer />
      </div>
      <Toaster />
    </>
  );
}

export default App;
