"use client";
import { loadTokenFromCookies } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { Button, FormControl, Grid, TextField } from '@mui/material'
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  password: yup
    .string()
    .min(8, "Şifre minimum 8 karakter uzunlukta olmalıdır")
    .max(30, "Şifre maximum 30 karakter uzunlukta olmalıdır")
    .required("Şifre zorunludur")
})

function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParams = searchParams.get("next");
  const dispatch = useDispatch();
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("/api/auth/login",
          {
            email: values.email,
            password: values.password
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          resetForm();
          router.push(nextParams || "/");
          loadTokenFromCookies(dispatch);          
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const message: string =
          error?.response?.data?.message ??
          error?.message ??
          "Bilinmeyen bir hata oluştu.";
        console.error("Error [LoginComponent] : ", message);
      }
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center items-center gap-3 h-[100%] w-full">
      <Grid size={12} className="flex flex-col gap-1">
        <FormControl >Email</FormControl>
        <TextField size="small" fullWidth name='email' id='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            "& .MuiInputBase-root": {
              color: theme === "dark" ? "#fff" : "#303030",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  theme === "dark"
                    ? colorOptions[color].light
                    : colorOptions[color].dark, // varsayılan border rengi
              },
              "&:hover fieldset": {
                borderColor: colorOptions[color].dark, // hover olduğunda
              },
              "&.Mui-focused fieldset": {
                borderColor: colorOptions[color].dark, // odaklanıldığında
              },
            },
          }} />
      </Grid>
      <Grid size={12} className="flex flex-col gap-1">
        <FormControl >Şifre</FormControl>
        <TextField
          type='password'
          size="small" fullWidth name='password' id='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            "& .MuiInputBase-root": {
              color: theme === "dark" ? "#fff" : "#303030",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  theme === "dark"
                    ? colorOptions[color].light
                    : colorOptions[color].dark, // varsayılan border rengi
              },
              "&:hover fieldset": {
                borderColor: colorOptions[color].dark, // hover olduğunda
              },
              "&.Mui-focused fieldset": {
                borderColor: colorOptions[color].dark, // odaklanıldığında
              },
            },
          }} />
      </Grid>
      <Grid size={12}>
        <Button type="submit"
          fullWidth
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            background:
              theme === "dark"
                ? colorOptions[color].light
                : colorOptions[color].dark,
            color:
              theme === "dark"
                ? colorOptions[color].dark
                : colorOptions[color].light,
            padding: "6px",
            ":hover": {
              background: colorOptions[color].dark,
              color: colorOptions[color].light,
            },
          }}>Giriş Yap</Button>
      </Grid>
    </form>
  )
}

export default LoginComponent
