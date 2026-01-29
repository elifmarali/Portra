"use client";
import { currentFont } from "@/lib/fonts";
import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCreateNewFolder } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  currentAuth,
  updateDislikes,
  updateFavorites,
  updateLikes,
} from "@/lib/redux/features/auth/authSlice";
import axios from "axios";
import { ICreatePortfolio } from "@/app/createPortfolio/IProps";
import Loading from "../Loading";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { colorOptions } from "@/lists/color";

function PortfolioItem({
  portfolio,
  size,
}: {
  portfolio: ICreatePortfolio;
  size: string;
}) {
  const color = useSelector(selectColor);
  const auth = useSelector(currentAuth);
  const portfolioIdStr: string = String(portfolio.id);

  const favoriteIds = (auth?.myFavoritePortfolios ?? []) as string[];
  const likeIds = (auth?.likePortfolios ?? []) as string[];
  const dislikeIds = (auth?.dislikePortfolios ?? []) as string[];

  const [isFavorite, setIsFavorite] = useState<boolean>(
    Array.isArray(favoriteIds) ? favoriteIds.includes(portfolioIdStr) : false
  );

  const [isLike, setIsLike] = useState<boolean>(
    Array.isArray(likeIds) ? likeIds.includes(portfolioIdStr) : false
  );

  const [isDislike, setIsDislike] = useState<boolean>(
    Array.isArray(dislikeIds) ? dislikeIds.includes(portfolioIdStr) : false
  );
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(portfolio.likes);
  const [favoriteCount, setFavoriteCount] = useState(portfolio.favorites);
  const [dislikeCount, setDislikeCount] = useState(portfolio.dislikes);
  const dispatch = useDispatch();

  // Auth listesindeki değişikliklere göre local state’i senkronize et
  useEffect(() => {
    const favIds = (auth?.myFavoritePortfolios ?? []) as string[];
    const lIds = (auth?.likePortfolios ?? []) as string[];
    const dIds = (auth?.dislikePortfolios ?? []) as string[];

    setIsFavorite(Array.isArray(favIds) ? favIds.includes(portfolioIdStr) : false);
    setIsLike(Array.isArray(lIds) ? lIds.includes(portfolioIdStr) : false);
    setIsDislike(Array.isArray(dIds) ? dIds.includes(portfolioIdStr) : false);
  }, [
    auth?.myFavoritePortfolios,
    auth?.likePortfolios,
    auth?.dislikePortfolios,
    portfolioIdStr,
  ]);

  // Toggle Favorite
  const toggleFavorite = async () => {
    if (!auth) return;

    try {
      setLoading(true);
      const portfolioIdStr = String(portfolio.id);

      const currentFavorites = (auth.myFavoritePortfolios ?? []) as string[];

      let updated: string[];
      if (currentFavorites.includes(portfolioIdStr)) {
        updated = currentFavorites.filter((p) => p !== portfolioIdStr);
      } else {
        updated = [...currentFavorites, portfolioIdStr];
      }

      setIsFavorite(updated.includes(portfolioIdStr));

      const res = await axios.post("/api/user/update", {
        email: auth.email,
        field: "myFavoritePortfolios",
        value: updated,
      });

      if (!res.data.success) {
        console.error("Favorite update failed!");
      }

      const resFavoriteCounter = await axios.post(
        "/api/portfolio/likeAndDislikeUpdated",
        {
          portfolioId: portfolio.id,
          action: "favorites",
          mode: isFavorite ? "decrement" : "increment",
        }
      );
      const { favorites } = resFavoriteCounter.data.data;
      setFavoriteCount(favorites);

      const resFavoritePortfolios = await axios.get(
        `/api/user/getMyFavoritePortfolios?email=${auth.email}`
      );
      const { success, myFavoritePortfolios } = resFavoritePortfolios.data;

      if (success) {
        dispatch(updateFavorites(myFavoritePortfolios));
      }

      setLoading(false);
    } catch (err) {
      console.error("ERR [ToggleFavorite] : ", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("isFavorite : ", isFavorite);
    console.log("auth?.myFavoritePortfolios : ", auth?.myFavoritePortfolios);
    console.log("auth.likePortfolios : ", auth.likePortfolios);
    console.log("auth.dislikePortfolios : ", auth.dislikePortfolios);
  }, [isFavorite, auth?.myFavoritePortfolios, auth.likePortfolios, auth.dislikePortfolios])


  // Toggle Like
  const toggleLike = async () => {
    if (!auth) return;

    try {
      setLoading(true);

      // 1️⃣ Kullanıcının güncel like listesi API'den alınıyor
      const resGetLikes = await axios.get(
        `/api/user/getLikePortfolios?email=${auth.email}`
      );
      const { success: successGet, likePortfolios } = resGetLikes.data;

      if (!successGet) {
        console.error("Failed to fetch likePortfolios");
        setLoading(false);
        return;
      }

      const portfolioIdStr = String(portfolio.id);

      // 2️⃣ Yeni dizi oluştur
      let newLikes: string[] = likePortfolios || [];

      if (newLikes.includes(portfolioIdStr)) {
        newLikes = newLikes.filter((p: any) => p !== portfolioIdStr);
      } else {
        newLikes = [...newLikes, portfolioIdStr];
      }

      // 3️⃣ State güncellemesi
      setIsLike(newLikes.includes(portfolioIdStr));

      // 4️⃣ Backend'e gönder
      const resUpdate = await axios.post("/api/user/update", {
        email: auth.email,
        field: "likePortfolios",
        value: newLikes,
      });

      if (!resUpdate.data.success) {
        console.error("LikePortfolios update failed!");
      }

      const resLikePortfolios = await axios.post(
        "/api/portfolio/likeAndDislikeUpdated",
        {
          portfolioId: portfolio.id,
          action: "likes",
          mode: isLike ? "decrement" : "increment",
        }
      );
      const { likes } = resLikePortfolios.data.data;
      setLikeCount(likes);

      // 5️⃣ Güncel listeyi tekrar al ve redux'a dispatch et
      const resUpdated = await axios.get(
        `/api/user/getLikePortfolios?email=${auth.email}`
      );
      const { success: successUpdated, likePortfolios: updatedList } =
        resUpdated.data;

      if (successUpdated) {
        dispatch(updateLikes(updatedList));
      }
    } catch (err) {
      console.error("ERR [ToggleLike]:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Dislike
  const toggleDislike = async () => {
    if (!auth) return;

    try {
      setLoading(true);

      const resGetDislikes = await axios.get(
        `/api/user/getDislikePortfolios?email=${auth.email}`
      );
      const { success: successGet, dislikePortfolios } = resGetDislikes.data;

      if (!successGet) {
        console.error("Failed to fetch dislikePortfolios");
        setLoading(false);
        return;
      }

      const portfolioIdStr = String(portfolio.id);

      let newDislikes: string[] = dislikePortfolios || [];

      if (newDislikes.includes(portfolioIdStr)) {
        newDislikes = newDislikes.filter((p) => p !== portfolioIdStr);
      } else {
        newDislikes = [...newDislikes, portfolioIdStr];
      }

      setIsDislike(newDislikes.includes(portfolioIdStr));

      const resUpdate = await axios.post("/api/user/update", {
        email: auth.email,
        field: "dislikePortfolios",
        value: newDislikes,
      });

      if (!resUpdate.data.success) {
        console.error("DislikePortfolios update failed!");
      }

      const resDislikePortfolios = await axios.post(
        "/api/portfolio/likeAndDislikeUpdated",
        {
          portfolioId: portfolio.id,
          action: "dislikes",
          mode: isDislike ? "decrement" : "increment",
        }
      );
      const { dislikes } = resDislikePortfolios.data.data;
      setDislikeCount(dislikes);

      const resUpdated = await axios.get(
        `/api/user/getDislikePortfolios?email=${auth.email}`
      );
      const { success: successUpdated, dislikePortfolios: updatedList } =
        resUpdated.data;

      if (successUpdated) {
        dispatch(updateDislikes(updatedList));
      }
    } catch (err) {
      console.error("ERR [ToggleDislike] : ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      sx={{ borderRadius: "2rem", overflow: "hidden" }}
      className={`${size === "small" ? "h-[22rem]" : "h-[30rem] w-[20rem]"} flex flex-col gap-2 relative ${currentFont.className}`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {portfolio.photo?.base64 && (
            <div className="relative w-full h-full">
              <Image
                src={portfolio.photo.base64}
                alt={portfolio.photo.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Favori kalp */}
          {isFavorite ? (
            <FaHeart
              size={50}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "1px solid #fff",
                borderRadius: "44%",
                padding: "10px",
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
              }}
              onClick={toggleFavorite}
            />
          ) : (
            <FaRegHeart
              size={50}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "1px solid #fff",
                borderRadius: "44%",
                padding: "10px",
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
              }}
              onClick={toggleFavorite}
            />
          )}

          {/* Yazı alanı */}
          <Grid
            className={`absolute bottom-0 left-0 w-full flex flex-col items-start ${size === "small" ? "px-2 py-3" : "px-4 py-6"}`}
            sx={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              color: "#fff",
            }}
          >
            <Grid display="flex" alignItems="center" gap={4}>
              <Grid
                display="flex"
                alignItems="center"
                gap={1}
                color={"#c4c6c7"}
                onClick={toggleLike}
              >
                <AiFillLike
                  size={20}
                  color={
                    isLike
                      ? colorOptions[color].dark
                      : colorOptions[color].light
                  }
                  style={{ cursor: "pointer" }}
                />
                <Typography variant="h6">{likeCount}</Typography>
              </Grid>
              <Grid
                display="flex"
                alignItems="center"
                gap={1}
                color={"#c4c6c7"}
                onClick={toggleDislike}
              >
                <AiFillDislike
                  size={20}
                  color={
                    isDislike
                      ? colorOptions[color].dark
                      : colorOptions[color].light
                  }
                  style={{ cursor: "pointer" }}
                />
                <Typography variant="h6">{dislikeCount}</Typography>
              </Grid>
              <Grid
                display="flex"
                alignItems="center"
                gap={1}
                color={"#c4c6c7"}
                onClick={toggleFavorite}
              >
                <FaHeart
                  size={20}
                  color={
                    isFavorite
                      ? colorOptions[color].dark
                      : colorOptions[color].light
                  }
                  style={{ cursor: "pointer" }}
                />
                <Typography variant="h6">{favoriteCount}</Typography>
              </Grid>
            </Grid>
            <p
              style={{
                fontWeight: 500,
                fontSize: size === "small" ? "1.2rem" : "1.4rem",
              }}
            >
              {portfolio.name} {portfolio.surname}
            </p>
            <Typography
              variant="body1"
              sx={{
                fontSize: size === "small" ? ".9rem" : "1rem",
                fontFamily: "italic",
                color: "#c4c6c7",
              }}
            >
              {portfolio.title}
            </Typography>
            {size === "large" && (
              <Grid className="flex justify-between w-full mt-4">
                <Grid className="flex" alignItems="center" gap={1}>
                  <MdCreateNewFolder size={24} style={{ color: "#c4c6c7" }} />
                  <Typography sx={{ fontSize: ".9rem" }} variant="body2">
                    {dayjs(portfolio?.createdAt).format("DD/MM/YYYY hh:mm")}
                  </Typography>
                </Grid>
                <Grid className="flex" alignItems="center" gap={1}>
                  <IoIosCreate size={24} style={{ color: "#c4c6c7" }} />
                  <Typography sx={{ fontSize: ".9rem" }} variant="body2">
                    {dayjs(portfolio?.updatedAt).format("DD/MM/YYYY hh:mm")}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default PortfolioItem;
