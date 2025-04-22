"use client";
import LeftImage from '@/components/Auth/LeftImage'
import RegisterComponent from '@/components/Auth/RegisterComponent'
import { selectColor } from '@/lib/redux/features/color/colorSlice'
import { selectTheme } from '@/lib/redux/features/theme/themeSlice'
import { colorOptions } from '@/lists/color';
import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Register() {
    const color = useSelector(selectColor);
    const theme = useSelector(selectTheme);

    return (
        <Grid container spacing={2}
            style={{
                backgroundColor: theme === "dark" ? "#000" : colorOptions[color].light,
                color: "#fff",
                height: "calc(100vh - 7.5rem)",
            }}>
            <Grid size={{ xs: 0, sm: 0, md: 6 }} sx={{height:{xs:0,sm:0},display:{xs:"none",sm:"none",md:"block"}}}>
                <LeftImage />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{display:"flex", alignItems:"center", padding:"0 10px"}} >
                <RegisterComponent />
            </Grid>
        </Grid>

    )
}

export default Register
