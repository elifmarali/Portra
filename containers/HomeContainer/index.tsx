"use client";
import React from 'react'
import Banner from '@/components/HomeContainer/Banner'
import { useSelector } from 'react-redux'
import * as motion from "motion/react-client"
import Archive from '@/components/HomeContainer/Archive';
import Explore from '@/components/HomeContainer/Explore';
import Contact from '@/components/HomeContainer/Contact';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';

function HomeContainer() {
  const theme = useSelector(selectTheme);
  return (
    <motion.div
      className='flex justify-center'
      initial={{ backgroundColor: theme === "dark" ? "#fff" : "#000" }}
      animate={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      transition={{ duration: 0.5 }}>
      <div className='w-[84%]'>
        <Banner />
        <Archive />
        <Explore />
        <Contact />
      </div>
    </motion.div>
  )
}

export default HomeContainer

