"use client";
import "./style.css"
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from "@/lists/color";
import { FormControl, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

function CreatePortfolio() {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  return (
    <Grid container display="flex" justifyContent="center" sx={{ backgroundColor: theme === "dark" ? "#000" : "#fff", minHeight: 'calc(100vh - 7.5rem)' }} >
      <Grid sx={{ width: "90%", marginTop: { xs: 4, sm: 4, md: 4, lg: 2 } }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h3' sx={{ fontWeight: "600", fontFamily: "inherit", textAlign: "center", color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}>Portfolyo Oluştur</Typography>
        </Grid>
        <Grid container spacing={{xs:2,sm:2,md:8}}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="center" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Ad</FormControl>
            <TextField className='portfolioInput' />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="center" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Soyad</FormControl>
            <TextField className='portfolioInput'/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreatePortfolio
