import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion, useScroll, useTransform } from 'framer-motion';

const vid = require("../src/media/vid.mp4");

function App() {
  const containerref = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerref,
  });

  useEffect(() => {
    if (containerref.current) {
      setInitialWidth(containerref.current.clientWidth);
      setInitialHeight(containerref.current.clientHeight);
    }
    window.addEventListener("resize", () => {
      if (containerref.current) {
        setInitialWidth(containerref.current.clientWidth);
        setInitialHeight(containerref.current.clientHeight);
      }
    })
  }, []);

  const width = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [initialWidth, 775, 255],
  );

  const height = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [initialHeight-700, 500,150],
  );

  return (
    <div>
      <section className=" bg-gray-200 p-8 pb-16">
        <div ref={containerref} className="relative min-h-[1500px] h-[1500px] flex items-end">
          <div className=" absolute bottom-0 right-0 min-h-[1500px] h-[1500px] flex items-end" > 
                <motion.div style={{ width,height }} className="sticky bottom-10 right-0">
                  <video loop className="transition duration-200 w-full h-full hover:scale-105 object-cover" autoPlay src={vid}></video>
                </motion.div>
          </div>
          <div className="w-[55%]">
            <h1 className='text-5xl text-gray-500'>Wokine conçoit des solutions et expériences digitales qui allient créativité , technologie et engagement éthique . </h1>
          </div>
        </div>

      </section>
      <div className="min-h-[1200px]"></div>
    </div>
  );
}

export default App;
