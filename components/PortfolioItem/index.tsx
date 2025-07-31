"use client";
import { currentFont } from '@/lib/fonts';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { Grid, Typography } from '@mui/material'
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function PortfolioItem({ portfolio }: { portfolio: any }) {
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);

    useEffect(() => {
        console.log("portfolio.photo?.base64 : ", portfolio.photo?.base64);
    }, [portfolio.photo])

    return (
        <Grid
            sx={{
                borderRadius: ".4rem",
                border: `.2px solid var(--color-dark)`,
            }}
            className={`h-[14rem] w-[24rem] flex flex-col relative lg:flex-row lg:h-[20rem] lg:w-[30rem] lg:p-2 lg:relative ${currentFont.className}`}
        >
            {portfolio.photo?.base64 && (
                <div className="relative w-full h-full lg:h-full lg:w-[40%]">
                    <Image
                        src={portfolio.photo.base64}
                        alt={portfolio.photo.name}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
            )}

            {/* Küçük ekranlarda absolute, lg'de normal davranış */}
            <Grid className="p-2 lg:static absolute bottom-0 left-0 w-full lg:flex-1 lg:h-full flex flex-col items-start px-4 py-6"
                sx={{
                    backgroundColor: theme === "dark" ? "var(--color-light)" : "var(--color-dark)",
                    filter: theme === "dark" ? "" : "brightness(1.3)", // 1.3 ile %30 daha parlak
                    color: theme === "dark" ? "#000" : "#fff"
                }}>
                <p style={{ fontWeight: "600", fontSize: "1.5rem" }}>{portfolio.name} {portfolio.surname}</p>
                <Typography variant='body1' sx={{ fontSize: "1.1rem", fontFamily: "italic" }}>{portfolio.title}</Typography>
                <Grid>
                    <Grid className="flex">
                        <Typography sx={{ fontSize: ".9rem", fontWeight: "600" }} variant='body2'>Oluşturulma : </Typography>
                        <Typography sx={{ fontSize: ".9rem" }} variant='body2'>{dayjs(portfolio?.createdAt).format("DD/MM/YYYY hh:mm")}</Typography>
                    </Grid>
                    <Grid className="flex">
                        <Typography sx={{ fontSize: ".9rem", fontWeight: "600" }} variant='body2'>Değiştirilme : </Typography>
                        <Typography sx={{ fontSize: ".9rem" }} variant='body2'>{dayjs(portfolio?.updatedAt).format("DD/MM/YYYY hh:mm")}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default PortfolioItem
