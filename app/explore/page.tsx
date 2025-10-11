"use client";
import { currentAuth } from "@/lib/redux/features/auth/authSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICreatePortfolio } from "../createPortfolio/IProps";
import PortfolioItem from "@/components/PortfolioItem";
import Link from "next/link";
import axios from "axios";

function Explore() {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const auth = useSelector(currentAuth);
  const [favoritePortfolios, setFavoritePortfolios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFavoritePortfolios();
  }, []);

  // Get Favorite Portoflios
  const getFavoritePortfolios = async () => {
    setLoading(true);
    const resFavorite = await axios.get("/api/favoritePortfolioList");
    const { success, data } = resFavorite.data;
    if (success) {
      setFavoritePortfolios(data);
    } else {
      setFavoritePortfolios([]);
    }
    setLoading(false);
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
      ) : favoritePortfolios.length > 0 ? (
        favoritePortfolios.map(
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
  );
}

export default Explore;
