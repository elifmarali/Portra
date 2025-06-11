"use client";
import React, { useEffect } from "react";
import {
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { colorOptions } from "@/lists/color";
import { useSelector } from "react-redux";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { useFormikContext } from "formik";
import { ICreatePortfolio } from "@/app/createPortfolio/IProps";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";

function Step0() {
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
  const formik = useFormikContext<ICreatePortfolio>();

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}
          variant="h4">
          Temel Bilgiler
        </Typography>
      </Grid>

      {/* Name */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel"
        >Ad <span className="labelRequired">*</span></FormControl>
        <TextField
          name="name"
          id="name"
          className="portfolioInput"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.name && formik.errors.name}
          error={Boolean(formik.errors.name && formik.touched.name)}
          required
        />
      </Grid>

      {/* Surname */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Soyad <span className="labelRequired">*</span></FormControl>
        <TextField
          name="surname"
          id="surname"
          className="portfolioInput"
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.surname && formik.errors.surname}
          error={Boolean(formik.touched.surname && formik.errors.surname)}
        />
      </Grid>

      {/* Title */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Başlık / Unvan <span className="labelRequired">*</span></FormControl>
        <TextField
          name="title"
          id="title"
          className="portfolioInput"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.title && formik.errors.title}
          error={Boolean(formik.touched.title && formik.errors.title)}
        />
      </Grid>

      {/* Short Biography */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">
          Kısa Biyografi <span className="labelRequired">*</span><br />
          <span style={{ fontSize: ".9rem" }}>(max:300 karakter)</span>
        </FormControl>
        <TextField
          multiline
          rows={4}
          name="shortBiography"
          id="shortBiography"
          className="portfolioInput"
          value={formik.values.shortBiography}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.shortBiography && formik.errors.shortBiography
          }
          error={Boolean(
            formik.touched.shortBiography && formik.errors.shortBiography
          )}
        />
      </Grid>

      {/* Email */}
      <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="start">
        <FormControl className="portfolioLabel">Email <span className="labelRequired">*</span></FormControl>
        <TextField
          name="email"
          id="email"
          className="portfolioInput"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.email && formik.errors.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
        />
      </Grid>
    </>
  );
}

export default Step0;
