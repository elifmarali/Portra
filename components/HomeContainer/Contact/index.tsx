import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { LuMessageSquare } from "react-icons/lu";
import { colorOptions } from '@/lists/color';
import { ISocialMediaItem, socialMedia } from '@/lists/HomeContainer/SocialMedia';
import ContactForm from '../ContactForm';
import SocialMediaItem from '../SocialMediaItem';


function Contact() {
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);

  const gradientStyle = theme === "dark"
    ? {
      backgroundImage: `linear-gradient(to bottom, ${colorOptions[color].dark}, ${colorOptions[color].light})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      lineHeight: "36px",
      marginLeft: "20px",
      fontSize: "20px",
      marginBottom:"20px"
    }
    : {
      color: "gray",
      lineHeight: "36px",
      marginLeft: "20px",
      fontSize: "20px",
      marginBottom:"20px"
    };


  return (
    <Box sx={{ minHeight: "350px", display: 'flex', flexDirection: "column", justifyContent: "space-between" }}>
      <Typography variant='h3' className='inline' style={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, fontWeight: "600" }}>
        <LuMessageSquare className='inline mr-4' size={50} />
        Bize Ulaşın
      </Typography>
      <Grid container spacing={6} sx={{
        marginBottom: "20px", paddingX: "20px", height: "100%", width: "100%"
      }}
      className="!w-full flex !flex-col md:!flex-row md:justify-between">
        <Grid size={{ xs: 12, md: 6 }} className="flex flex-col items-center md:mt-4 md:items-start">
          <Typography variant="body1" style={gradientStyle} className='bg-clip-text text-transparent'>
            Merak ettiklerin mi var?
            <br />
            İş birliği teklifin ya da sadece bir “Merhaba” demek mi istiyorsun?
            <br />
            Yandaki formu doldurarak bizimle kolayca iletişime geçebilirsin.
            <br />
            En kısa sürede sana geri dönüş yapacağız!
          </Typography>
          {/*Contact Icons*/}
          <Box display="flex" justifyContent="start" gap={4} sx={{paddingX:"20px"}}>
            {
              socialMedia.map((socialItem: ISocialMediaItem) => {
                return (
                  <SocialMediaItem key={socialItem.name} socialItem={socialItem}/>
                )
              })
            }
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ContactForm />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact
