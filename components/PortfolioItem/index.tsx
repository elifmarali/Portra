"use client";
import { ICreatePortfolio } from '@/app/createPortfolio/IProps'
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

function PortfolioItem({ portfolio }: { portfolio: ICreatePortfolio }) {
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    return (
        <Grid sx={{ borderRadius: ".4rem", border: `.2px solid var(--color-light)`, height: "14rem", width: "24rem", padding: "1rem" }}>
            {portfolio.id}
        </Grid>
    )
}

export default PortfolioItem
