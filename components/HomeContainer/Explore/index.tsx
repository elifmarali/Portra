"use client";
import { ICreatePortfolio } from "@/app/createPortfolio/IProps";
import PortfolioItem from "@/components/PortfolioItem";
import { IColor } from "@/lib/redux/interfaces/IColor";
import { ITheme } from "@/lib/redux/interfaces/ITheme";
import { colorOptions } from "@/lists/color";
import { Grid, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Explore() {
  const color = useSelector((state: IColor) => state.color.color);
  const theme = useSelector((state: ITheme) => state.theme.theme);

  const [loading, setLoading] = useState(false);
  const [favoritePortfolios, setFavoritePortfolios] = useState<
    ICreatePortfolio[]
  >([]);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 4;

  useEffect(() => {
    getFavoritePortfolios();
  }, []);

  const getFavoritePortfolios = async () => {
    try {
      setLoading(true);
      const resFavorite = await axios.get("/api/favoritePortfolioList");
      const { success, data } = resFavorite.data;
      if (success) setFavoritePortfolios(data);
      else setFavoritePortfolios([]);
    } catch (error) {
      console.error("Favori portföyler alınamadı:", error);
      setFavoritePortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (favoritePortfolios.length === 0) return;
    setStartIndex((prev) => (prev + visibleCount) % favoritePortfolios.length);
  };

  const handlePrev = () => {
    if (favoritePortfolios.length === 0) return;
    setStartIndex((prev) =>
      prev - visibleCount < 0
        ? favoritePortfolios.length - visibleCount
        : prev - visibleCount
    );
  };

  // Otomatik kaydırma (3 saniyede bir)
  useEffect(() => {
    if (favoritePortfolios.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [favoritePortfolios, startIndex]);

  // Gösterilecek 4 portföyü hesapla
  const total = favoritePortfolios.length;
  let visibleItems: ICreatePortfolio[] = [];

  if (total > 0) {
    visibleItems = favoritePortfolios.slice(
      startIndex,
      startIndex + visibleCount
    );
    if (visibleItems.length < visibleCount) {
      visibleItems = [
        ...visibleItems,
        ...favoritePortfolios.slice(0, visibleCount - visibleItems.length),
      ];
    }
  }

  return (
    <div
      className="w-full py-10 relative"
      style={{
        color: theme === "dark" ? "#fff" : colorOptions[color].dark,
      }}
    >
      <Typography variant="h4" className="text-center !font-black uppercase">
        Keşfedebileceğin Projeler
      </Typography>

      {loading ? (
        <Typography className="text-center my-5">Yükleniyor...</Typography>
      ) : total > 0 ? (
        <div className="relative flex items-center my-5">
          {/* Sol ok */}
          <IconButton
            onClick={handlePrev}
            style={{
              backgroundColor:
                theme === "dark" ? "#fff" : colorOptions[color].dark,
            }}
            className="absolute left-0 z-10 bg-white/70 hover:bg-white shadow-md"
          >
            <ChevronLeft
              style={{ color: theme === "dark" ? "#000" : "#fff" }}
            />
          </IconButton>

          {/* İçerik alanı */}
          <div className="grid grid-cols-4 gap-6 w-full mx-12">
            {visibleItems.map((portfolioItem, index) => (
              <div key={index} className="transition-all duration-300">
                <PortfolioItem portfolio={portfolioItem} size="small" />
              </div>
            ))}
          </div>

          {/* Sağ ok */}
          <IconButton
            onClick={handleNext}
            style={{
              backgroundColor:
                theme === "dark" ? "#fff" : colorOptions[color].dark,
            }}
            className="absolute right-0 z-10 bg-white/70 hover:bg-white shadow-md"
          >
            <ChevronRight
              style={{ color: theme === "dark" ? "#000" : "#fff" }}
            />
          </IconButton>
        </div>
      ) : (
        <Typography className="text-center">
          Henüz bir portfolyonuz yok. Yeni bir portfolyo oluşturmak için{" "}
          <Link
            href="/createPortfolio/0"
            className="underline font-bold"
            style={{ color: colorOptions[color].dark }}
          >
            Portfolyo Oluştur
          </Link>{" "}
          sayfasını ziyaret edin.
        </Typography>
      )}
    </div>
  );
}

export default Explore;
