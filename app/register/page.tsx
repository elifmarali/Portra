"use client";
import LeftImage from "@/components/Auth/LeftImage";
import RegisterComponent from "@/components/Auth/RegisterComponent";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function Register() {
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);

  return (
    <Grid
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
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"space-between" ,padding: "0 10px",height:"100%" }}
      >
        <Grid sx={{display:"flex", flexDirection:"column",maxHeight:"90%"}}>
          <Grid size={12} sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center"}} className="h-[10rem]">
            <Typography variant="h5" fontWeight={500}>
              Tekrar hoşgeldiniz
            </Typography>
            <Typography variant="body1" fontWeight={500} fontSize={12}>
              Hesabınıza erişmek için gerekli bilgileri giriniz
            </Typography>
          </Grid>
          <RegisterComponent />
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
  );
}

export default Register;
