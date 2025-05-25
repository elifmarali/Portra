"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { colorOptions } from "@/lists/color";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import {
  createPortfolio,
  updateForms,
} from "@/lib/redux/features/createPortfolio/createPortfolioSlice";
import * as motion from "motion/react-client";
import { useFormikContext } from "formik";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

function Step0() {
  const formik = useFormikContext<any>();
  const dispatch = useDispatch();
  const color = useSelector(selectColor);

  const {
    name,
    surname,
    title,
    photo: photoState,
    shortBiography,
    email,
  } = useSelector(createPortfolio);

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ color: colorOptions[color].light }} variant="h4">
          Temel Bilgiler
        </Typography>
      </Grid>

      {/* Name */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Ad</FormControl>
        <TextField
          name="name"
          id="name"
          className="portfolioInput"
          value={name}
          onChange={(e) => {
            dispatch(updateForms({ name: e.target.value }));
          }}
        />
      </Grid>

      {/* Surname */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Soyad</FormControl>
        <TextField
          name="surname"
          id="surname"
          className="portfolioInput"
          value={surname}
          onChange={(e) => {
            dispatch(updateForms({ surname: e.target.value }));
          }}
        />
      </Grid>

      {/* Title */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Başlık / Unvan</FormControl>
        <TextField
          name="title"
          id="title"
          className="portfolioInput"
          value={title}
          onChange={(e) => {
            dispatch(updateForms({ title: e.target.value }));
          }}
        />
      </Grid>

      {/* Short Biography */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">
          Kısa Biyografi <br />
          <span style={{ fontSize: ".9rem" }}>(max:300 karakter)</span>
        </FormControl>
        <TextField
          multiline
          rows={4}
          name="shortBiography"
          id="shortBiography"
          className="portfolioInput"
          value={shortBiography}
          onChange={(e) => {
            dispatch(updateForms({ shortBiography: e.target.value }));
          }}
        />
      </Grid>

      {/* Email */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Email</FormControl>
        <TextField
          name="email"
          id="email"
          className="portfolioInput"
          value={email}
          onChange={(e) => {
            dispatch(updateForms({ email: e.target.value }));
          }}
        />
      </Grid>
    </>
  );
}

export default Step0;
