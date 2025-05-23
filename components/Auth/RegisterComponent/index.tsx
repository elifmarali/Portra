"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Modal,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { colorOptions } from "@/lists/color";
import axios, { AxiosError } from "axios";
import { FaX } from "react-icons/fa6";
import { useSearchParams, useRouter } from "next/navigation";
import { loadTokenFromCookies } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import LeftImage from "../LeftImage";
import Link from "next/link";
import { changeLoading, currentAuth } from "@/lib/redux/features/auth/authSlice";
import Loading from "@/components/Loading";


const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Ad minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Ad maximum 30 karakter uzunlukta olmalıdır")
    .required("Ad zorunludur"),
  surname: yup
    .string()
    .min(3, "Soyad minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Soyad maximum 30 karakter uzunlukta olmalıdır")
    .required("Soyad zorunludur"),
  username: yup
    .string()
    .min(3, "Kullanıcı adı minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Kullanıcı adı maximum 30 karakter uzunlukta olmalıdır")
    .required("Kullanıcı adı zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  password: yup
    .string()
    .min(8, "Şifre minimum 8 karakter uzunlukta olmalıdır")
    .max(30, "Şifre maximum 30 karakter uzunlukta olmalıdır")
    .required("Şifre zorunludur"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunludur"),
});

function RegisterComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParams = searchParams.get("next");
  const dispatch = useDispatch();
  const { loading } = useSelector(currentAuth);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [modal, setModal] = React.useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(changeLoading(true));
      try {
        const res = await axios.post(
          "/api/auth/register",
          {
            name: values.name,
            surname: values.surname,
            email: values.email,
            username: values.username,
            password: values.password,
            role: "user",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data.success) {
          resetForm();
          dispatch(changeLoading(false));
          router.push(nextParams || "/");
          loadTokenFromCookies(dispatch);
        }
      } catch (err) {
        dispatch(changeLoading(false));
        const error = err as AxiosError<{ message: string }>;
        const message: string =
          error?.response?.data?.message ??
          error?.message ??
          "Bilinmeyen bir hata oluştu.";
        console.error("Error [RegisterComponent] : ", message);
        setModal({ isOpen: true, message: message });
      }
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "38%",
    bgcolor: theme === "dark" ? "#fff" : "#000",
    color: theme === "dark" ? "#000" : "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.9)",
  };

  const handleClose = () => setModal({ isOpen: false, message: "" });

  return (

    <>
      {loading ? <Loading /> : (<Grid
        container
        spacing={2}
        style={{
          backgroundColor: theme === "dark" ? "#000" : colorOptions[color].light,
          color: "#fff",
          height: "calc(100vh - 7.5rem)",
          padding: "10px"
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
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "0 10px", height: "100%" }}
        >
          <Grid sx={{ display: "flex", flexDirection: "column", maxHeight: "90%" }}>
            <Grid size={12} sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }} className="h-[10rem]">
              <Typography variant="h5" fontWeight={500}>
                Tekrar hoşgeldiniz
              </Typography>
              <Typography variant="body1" fontWeight={500} fontSize={12}>
                Hesabınıza erişmek için gerekli bilgileri giriniz
              </Typography>
            </Grid>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4 md:h-full md:w-full md:justify-center items-center !h-[calc(100vh - 7.5rem)]"
            >
              <Grid container size={12} direction="row" spacing={2}>
                <Grid size={6}>
                  <FormControl
                    sx={{
                      paddingBottom: "4px",
                      fontWeight: "600",
                      fontFamily: "roboto",
                      color: theme === "dark" ? "#fff" : "#303030",
                    }}
                  >
                    Ad
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                <Grid size={6}>
                  <FormControl
                    sx={{
                      paddingBottom: "4px",
                      fontWeight: "600",
                      fontFamily: "roboto",
                      color: theme === "dark" ? "#fff" : "#303030",
                    }}
                  >
                    Soyad
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="surname"
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
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
              </Grid>
              <Grid container size={12} direction="row" spacing={2}>
                <Grid size={6}>
                  <FormControl
                    sx={{
                      paddingBottom: "4px",
                      fontWeight: "600",
                      fontFamily: "roboto",
                      color: theme === "dark" ? "#fff" : "#303030",
                    }}
                  >
                    Kullanıcı Adı
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
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
                <Grid size={6}>
                  <FormControl
                    sx={{
                      paddingBottom: "4px",
                      fontWeight: "600",
                      fontFamily: "roboto",
                      color: theme === "dark" ? "#fff" : "#303030",
                    }}
                  >
                    E-Mail
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    name="email"
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
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container size={12} direction="row" spacing={2}>
                <Grid size={6}>
                  <FormControl
                    sx={{
                      paddingBottom: "4px",
                      fontWeight: "600",
                      fontFamily: "roboto",
                      color: theme === "dark" ? "#fff" : "#303030",
                    }}
                  >
                    Şifre
                  </FormControl>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    name="password"
                    id="password"
                    autoComplete="new-password"
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
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? (
                              <BiSolidHide color={theme === "dark" ? "#fff" : "#000"} />
                            ) : (
                              <BiSolidShow color={theme === "dark" ? "#fff" : "#000"} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl
                    sx={{
                      paddingBottom: "4px",
                      fontWeight: "600",
                      fontFamily: "roboto",
                      color: theme === "dark" ? "#fff" : "#303030",
                    }}
                  >
                    Şifre Tekrarı
                  </FormControl>
                  <TextField
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    autoComplete="new-password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? (
                              <BiSolidHide color={theme === "dark" ? "#fff" : "#000"} />
                            ) : (
                              <BiSolidShow color={theme === "dark" ? "#fff" : "#000"} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container size={12}>
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
                  Kayıt Ol
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid>
            <Typography
              variant="body1"
              fontSize={14}
              className="transition-all ease-linear duration-300"
            >
              Bir hesabın var mı?{" "}
              <Link
                href="/login"
                className="text-[#293fe3] text-[16px] inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:underline"
                style={{ fontSize: "16px", marginLeft: "3px" }}
              >
                Giriş Yap
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      )}

      <Modal open={modal.isOpen} onClose={handleClose}>
        <>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                paddingX: 2,
                paddingY: 2,
              }}
            >
              <FaX onClick={() => handleClose()} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "6px",
                height: "100%",
                paddingX: 4,
                paddingBottom: 6,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "1.52rem" }}>
                {modal.message}
              </Typography>
              <Typography variant="body2">
                {modal.message ===
                  "Bu e-posta veya kullanıcı adı zaten kullanımda" &&
                  "Lütfen farklı bir e-posta adresi veya kullanıcı adı deneyin. Daha önce kayıt olduysanız, giriş yapmayı deneyebilirsiniz."}
              </Typography>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  );
}

export default RegisterComponent;
