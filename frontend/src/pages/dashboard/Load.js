import React, {useRef} from 'react';
import {motion} from "framer-motion";
import donutImage from './donut.png';

export function Load() {

  const constraintsRef = useRef(null)

  return (
    <motion.div className="w-[600px] h-[400px]">
      <p className="animate-pulse text-center dark:text-white">Looking for another debater</p>
      <motion.img className="py-16 mx-auto" src={donutImage} drag
                  dragSnapToOrigin={true}
                  dragConstraints={{top:0, bottom: 0.1, left: 0, right: 0.1 }} alt=""/>
    </motion.div>
  )
}
