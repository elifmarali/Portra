import LeftImage from '@/components/Auth/LeftImage'
import LoginComponent from '@/components/Auth/LoginComponent'
import { Grid } from '@mui/material'
import React from 'react'

function Login() {
    return (
        <Grid container>
            <Grid size={{ sm: 0, md: 6 }}>
                <LeftImage />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
                <LoginComponent />
            </Grid>
        </Grid>
    )
}

export default Login
