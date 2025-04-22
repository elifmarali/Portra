"use client";
import { colorOptions } from '@/lists/color';
import React from 'react'
import { useSelector } from 'react-redux';
import * as motion from "motion/react-client"
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { FaCode } from "react-icons/fa6";
import { Box } from '@mui/material';
import { ISocialMediaItem, socialMedia } from '@/lists/HomeContainer/SocialMedia';
import SocialMediaItem from '../HomeContainer/SocialMediaItem';

function Footer() {
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);

  return (
      <motion.div
        initial={{ backgroundColor: theme === "dark" ? "#fff" : "#000", color: theme === "dark" ? colorOptions[color].dark : "#fff", border: theme === "dark" ? `.3px solid ${colorOptions[color].dark}` : "none" }}
        animate={{ backgroundColor: theme === "dark" ? "#000" : "#fff", color: theme === "dark" ? "#fff" : colorOptions[color].dark, border: theme === "dark" ? "none" : `.3px solid ${colorOptions[color].dark}` }}
        transition={{ duration: 0.5 }}
        style={{display:"flex",flexDirection:"column",height:"100%",justifyContent:"flex-end",alignItems:"center",minHeight:"10rem",padding:"2rem 0"}}
      >
        <div className='flex gap-5 items-center text-3xl font-medium' style={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}>
          <FaCode />
          Elif Maralı
        </div>
        <div className="flex items-center justify-center gap-2 w-[90%] max-w-[90%] text-[18px] font-black" style={{ color: theme === "dark" ? colorOptions[color].light : "gray" }}>
          Telif © 2025 | <span className='text-[14px] font-normal'>Tüm hakları saklıdır</span>
        </div>
        <Box display="flex" justifyContent="start" gap={4} sx={{ paddingX: "20px"}}>
          {
            socialMedia.map((socialItem: ISocialMediaItem) => {
              return (
                <SocialMediaItem key={socialItem.name} socialItem={socialItem} />
              )
            })
          }
        </Box>
      </motion.div>
  );
}

export default Footer;
