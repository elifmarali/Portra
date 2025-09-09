"use client";
import { currentFont } from '@/lib/fonts';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCreateNewFolder } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { currentAuth, updateFavorites } from '@/lib/redux/features/auth/authSlice';
import axios from 'axios';
import { ICreatePortfolio } from '@/app/createPortfolio/IProps';
import Loading from '../Loading';
import { AiFillLike, AiFillDislike } from "react-icons/ai";

function PortfolioItem({ portfolio }: { portfolio: ICreatePortfolio }) {
    const auth = useSelector(currentAuth);
    const [isFavorite, setIsFavorite] = useState<boolean>(auth?.myFavoritePortfolios?.some((item) => Number(item) === portfolio.id) ?? false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const toggleFavorite = async () => {
        if (!auth) return;

        try {
            setLoading(true)
            const portfolioIdStr = String(portfolio.id);

            let updated: string[];
            if (auth.myFavoritePortfolios.includes(portfolioIdStr)) {
                updated = auth.myFavoritePortfolios.filter((p) => p !== portfolioIdStr);
            } else {
                updated = [...auth.myFavoritePortfolios, portfolioIdStr];
            }

            setIsFavorite(updated.includes(portfolioIdStr));
            dispatch(updateFavorites(updated));

            const res = await axios.post("/api/user/update", {
                email: auth.email,
                field: "myFavoritePortfolios",
                value: updated,
            });

            if (!res.data.success) {
                console.error("Favorite update failed!");
            }

            const resFavoritePortfolios = await axios.get(
                `/api/user/getMyFavoritePortfolios?email=${auth.email}`
            );
            const { success, myFavoritePortfolios } = resFavoritePortfolios.data

            if (success) {
                dispatch(updateFavorites(myFavoritePortfolios));
            }

            setLoading(false);
        } catch (err) {
            console.error("ERR [ToggleFavorite] : ", err);
            setLoading(false);
        }
    };

    return (
        <Grid
            sx={{ borderRadius: "2rem", overflow: "hidden" }}
            className={`h-[30rem] w-[24rem] flex flex-col gap-2 relative ${currentFont.className}`}
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
                        className="absolute bottom-0 left-0 w-full flex flex-col items-start px-4 py-6"
                        sx={{
                            backdropFilter: "blur(8px)",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            color: "#fff",
                        }}
                    >
                        <Grid display="flex" alignItems="center" gap={4}>
                            <Grid display="flex" alignItems="center" gap={1} color={"#c4c6c7"}>
                                <AiFillLike size={20} />
                                <Typography variant='h6'>{portfolio?.likes}</Typography>
                            </Grid>
                            <Grid display="flex" alignItems="center" gap={1} color={"#c4c6c7"}>
                                <AiFillDislike size={20} />
                                <Typography variant='h6'>{portfolio?.dislikes}</Typography>
                            </Grid>
                            <Grid display="flex" alignItems="center" gap={1} color={"#c4c6c7"}>
                                <FaHeart size={20} />
                                <Typography variant='h6'>{portfolio?.favorites}</Typography>
                            </Grid>
                        </Grid>
                        <p style={{ fontWeight: 500, fontSize: "1.5rem" }}>
                            {portfolio.name} {portfolio.surname}
                        </p>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1rem", fontFamily: "italic", color: "#c4c6c7" }}
                        >
                            {portfolio.title}
                        </Typography>
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
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default PortfolioItem;
