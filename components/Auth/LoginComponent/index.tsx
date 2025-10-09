"use client";
import { loadTokenFromCookies } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import LeftImage from "../LeftImage";
import Link from "next/link";
import {
  changeLoading,
  currentAuth,
  updateFavorites,
  updateLikes,
} from "@/lib/redux/features/auth/authSlice";
import Loading from "@/components/Loading";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  password: yup
    .string()
    .min(8, "Şifre minimum 8 karakter uzunlukta olmalıdır")
    .max(30, "Şifre maximum 30 karakter uzunlukta olmalıdır")
    .required("Şifre zorunludur"),
});

function LoginComponent() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParams = searchParams.get("next");
  const dispatch = useDispatch();
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
  const { loading, email } = useSelector(currentAuth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(changeLoading(false));
      try {
        const response = await axios.post(
          "/api/auth/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          resetForm();
          dispatch(changeLoading(true));
          router.push(nextParams || "/");
          loadTokenFromCookies(dispatch);
          const resFavoritePortfolios = await axios.get(
            `api/user/getMyFavoritePortfolios?email=${values.email}`
          );
          if (resFavoritePortfolios.data.success) {
            dispatch(
              updateFavorites(resFavoritePortfolios.data.myFavoritePortfolios)
            );
          }
          const resLikePortfolios = await axios.get(
            `api/user/getLikePortfolios?email=${values.email}`
          );
          if (resLikePortfolios.data.success) {
            dispatch(updateLikes(resLikePortfolios.data.likePortfolios));
          }
        }
      } catch (err) {
        dispatch(changeLoading(false));
        const error = err as AxiosError<{ message: string }>;
        const message: string =
          error?.response?.data?.message ??
          error?.message ??
          "Bilinmeyen bir hata oluştu.";
        console.error("Error [LoginComponent] : ", message);
      }
    },
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          container
          style={{
            backgroundColor:
              theme === "dark" ? "#000" : colorOptions[color].light,
            color: "#fff",
            height: "calc(100vh - 7.5rem)",
            padding: "10px",
          }}
        >
          <Grid
            size={{ xs: 0, sm: 0, md: 6 }}
            sx={{
              height: { xs: 0, sm: 0 },
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            <LeftImage />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "10px",
              width: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "90%",
                height: "90%",
              }}
            >
              <Grid
                size={12}
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "15%",
                }}
              >
                <Typography variant="h5" fontWeight={500}>
                  Tekrar hoşgeldiniz
                </Typography>
                <Typography variant="body1" fontWeight={500} fontSize={12}>
                  Hesabınıza erişmek için e-postanızı ve şifrenizi girin
                </Typography>
              </Grid>
              <Grid className="h-full w-[26rem]">
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col justify-center items-center gap-3 h-[100%] w-full"
                >
                  <Grid size={12} className="flex flex-col gap-1">
                    <FormControl>Email</FormControl>
                    <TextField
                      size="small"
                      fullWidth
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                      }}
                    />
                  </Grid>
                  <Grid size={12} className="flex flex-col gap-1">
                    <FormControl>Şifre</FormControl>
                    <TextField
                      type={showPass ? "text" : "password"}
                      size="small"
                      fullWidth
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
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
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPass(!showPass)}
                              edge="end"
                              size="small"
                            >
                              {showPass ? (
                                <BiSolidHide
                                  color={theme === "dark" ? "#fff" : "#000"}
                                />
                              ) : (
                                <BiSolidShow
                                  color={theme === "dark" ? "#fff" : "#000"}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button
                      type="submit"
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
                      }}
                    >
                      Giriş Yap
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <Grid>
              <Typography
                variant="body1"
                fontSize={14}
                className="transition-all ease-linear duration-300"
              >
                Bir hesabın yok mu?
                <Link
                  href="/register"
                  className="text-[#293fe3] text-[16px] inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:underline"
                  style={{ fontSize: "16px", marginLeft: "3px" }}
                >
                  Kayıt Ol
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default LoginComponent;
