"use client";
import PortfolioItem from "@/components/PortfolioItem";
import { currentAuth, IAuth, updateFavorites, updateLikes } from "@/lib/redux/features/auth/authSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICreatePortfolio } from "../createPortfolio/IProps";

function MyPortfolioList() {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const auth = useSelector(currentAuth);
  const [portfolioList, setPortfolioList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (auth?.email) {
        try {
          const resFavoritePortfolios: any = await axios.get(`/api/user/getMyFavoritePortfolios?email=${auth.email}`); // eslint-disable-line @typescript-eslint/no-explicit-any
          const { success, myFavoritePortfolios } = resFavoritePortfolios.data;

          if (success) {
            dispatch(updateFavorites(myFavoritePortfolios));
          }

          const resLikePortfolios = await axios.get(`/api/user/getLikePortfolios?email=${auth.email}`);

          if (resLikePortfolios.data.success) {
            dispatch(updateLikes(resLikePortfolios.data.likePortfolios));
          }

          await getPortfolios(auth);
        } catch (error) {
          console.error("Error fetching favorite portfolios:", error);
        }
      }
    };

    fetchData();
  }, [auth?.email, dispatch]);

  const getPortfolios = async (auth: IAuth) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/portfolio/portfolioList", {
        params: { email: auth.email },
      });
      if (res.status === 200) {
        setPortfolioList(res.data.data);
      }
    } catch (err) {
      console.error("ERR [PORTFOLİOS] Portfolyolar alınırken hata oluştu : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem(`favoritePortfolios-${auth.id}`);
    if (storedFavorites) {
      dispatch(updateFavorites(JSON.parse(storedFavorites))); // string → string[]
    }
  }, []);

  return (
    <Grid
      container
      size={10}
      style={{
        backgroundColor: theme === "dark" ? "#000" : colorOptions[color].light,
        color: theme === "dark" ? "#fff" : "#222",
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
      ) : portfolioList.length > 0 ? (
        portfolioList.map((portfolioItem: ICreatePortfolio, portfolioItemIndex: number) => (
          <PortfolioItem portfolio={portfolioItem} size="large" key={portfolioItemIndex} />
        ))
      ) : (
        <Typography>
          Henüz bir portfolyonuz yok. Yeni bir portfolyo oluşturmak için{" "}
          <Link href="/createPortfolio/0">Portfolyo Oluştur</Link> sayfasını ziyaret edin.
        </Typography>
      )}
    </Grid>
  );
}

export default MyPortfolioList;
