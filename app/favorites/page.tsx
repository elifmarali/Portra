"use client";
import { currentAuth } from '@/lib/redux/features/auth/authSlice';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice'
import { colorOptions } from '@/lists/color';
import { Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ICreatePortfolio } from '../createPortfolio/IProps';
import PortfolioItem from '@/components/PortfolioItem';
import Link from 'next/link';

function Favorites() {
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    const auth = useSelector(currentAuth);
    const [loading, setLoading] = useState(false);
    const [myFavoritesPortoflios, setMyFavoritesPortfolios] = useState<ICreatePortfolio[]>([]);

    useEffect(() => {
        if (auth.email) {
            getFavorites();
        }
    }, [auth.email, auth.myFavoritePortfolios]);

    // Favori portfolyoları getir
    const getFavorites = async () => {
        try {
            setLoading(true);

            // Kullanıcının favori id’leri (string[]) → number[]
            const favoriteIds = ((auth.myFavoritePortfolios ?? []) as string[])
                .map((id) => Number(id))
                .filter((id) => !Number.isNaN(id));

            // Kullanıcının kendi portfolyo id’leri
            const myPortfolioRes = await axios.get("/api/portfolio/portfolioList", {
                params: { email: auth.email },
            });

            const myPortfolioIds: number[] = Array.isArray(myPortfolioRes.data?.data)
                ? myPortfolioRes.data.data
                      .map((p: ICreatePortfolio) => p.id)
                      .filter((id: any) => typeof id === "number")
                : [];

            const favoriteIdsParam = favoriteIds.join(",");
            const myPortfolioIdsParam = myPortfolioIds.join(",");

            if (!favoriteIdsParam && !myPortfolioIdsParam) {
                setMyFavoritesPortfolios([]);
                return;
            }

            const res = await axios.get(
                `/api/portfolio/favoritePortfolioList`,
                {
                    params: {
                        favoriteIds: favoriteIdsParam,
                        myPortfolioIds: myPortfolioIdsParam,
                    },
                }
            );

            const { success, data } = res.data;

            if (success && Array.isArray(data)) {
                setMyFavoritesPortfolios(data);
            } else {
                setMyFavoritesPortfolios([]);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
            setMyFavoritesPortfolios([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid
            container
            size={10}
            style={{
                backgroundColor: theme === "dark" ? "#000" : colorOptions[color].dark,
                color: "#fff",
                height: "100%",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                minHeight: "calc(100vh - 7rem)",
            }}
        >
            {loading ? (
                <Typography>Yükleniyor...</Typography>
            ) : myFavoritesPortoflios.length > 0 ? (
                myFavoritesPortoflios.map(
                    (portfolioItem: ICreatePortfolio, portfolioItemIndex: number) => (
                        <PortfolioItem
                            portfolio={portfolioItem}
                            size="large"
                            key={portfolioItemIndex}
                        />
                    )
                )
            ) : (
                <Typography>
                    Henüz bir portfolyonuz yok. Yeni bir portfolyo oluşturmak için{" "}
                    <Link href="/createPortfolio/0">Portfolyo Oluştur</Link> sayfasını
                    ziyaret edin.
                </Typography>
            )}
        </Grid>
    )
}

export default Favorites
