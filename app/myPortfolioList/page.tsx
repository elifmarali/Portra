"use client";
import PortfolioItem from '@/components/PortfolioItem';
import { currentAuth, IAuth } from '@/lib/redux/features/auth/authSlice';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice'
import { colorOptions } from '@/lists/color';
import { Grid, Typography } from '@mui/material'
import axios from 'axios';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ICreatePortfolio } from '../createPortfolio/IProps';

function MyPortfolioList() {
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    const auth = useSelector(currentAuth);
    const [portfolioList, setPortfolioList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth?.email) {
            getPortfolios(auth);
        }
    }, [auth.email])

    const getPortfolios = async (auth: IAuth) => {
        setLoading(true);
        try {
            const res = await axios.get("/api/portfolioList", {
                params: { email: auth.email }
            });
            if (res.status === 200) {
                setPortfolioList(res.data.data);
            }
        } catch (err) {
            console.error("ERR [PORTFOLİOS] Portfolyolar alınırken hata oluştu : ", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log("portfolioList : ", portfolioList);
    }, [portfolioList])
    return (
        <Grid container
        size={10}
            style={{                
                backgroundColor:
                    theme === "dark" ? "#000" : colorOptions[color].dark,
                color: "#fff",
                height: "calc(100vh - 7rem)",
                padding: "10px", 
                display:"flex",
                justifyContent:"center"               
            }}>
            {
                loading ? (
                    <Typography>Yükleniyor...</Typography>
                ) : (
                    portfolioList.length > 0 ? (
                        portfolioList.map((portfolioItem:ICreatePortfolio,portfolioItemIndex:number)=>(
                            <PortfolioItem portfolio={portfolioItem} key={portfolioItemIndex}/>
                        ))
                    ) : (
                        <Typography>
                            Henüz bir portfolyonuz yok. Yeni bir portfolyo oluşturmak için{" "}
                            <Link href="/createPortfolio/0">Portfolyo Oluştur</Link> sayfasını ziyaret edin.
                        </Typography>
                    )
                )
            }
        </Grid>
    )
}

export default MyPortfolioList
