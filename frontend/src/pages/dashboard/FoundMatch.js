import React, {useRef} from 'react';
import {motion} from "framer-motion";
import donutStatic from './donut.jpg';

export function FoundMatch() {

  const constraintsRef = useRef(null)

  return (
    <motion.div className="w-[600px] h-[500px]">
      <p className="animate-pulse mx-auto text-center dark:text-white">Found someone</p>
      <div className="flex justify-between items-center">
        <motion.img className="" src={donutStatic}
                    animate={{
                      x: 200
                    }}
                    transition={{ duration: 4 }}
                    alt=""/>
        <motion.img className="" src={donutStatic}
                    animate={{
                      x: -200,
                    }}
                    transition={{ duration: 4 }}
                    alt=""/>
      </div>
    </motion.div>

  )
}
