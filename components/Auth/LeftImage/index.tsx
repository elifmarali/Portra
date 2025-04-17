"use client";
import React from "react";
import BgImage from "../../../public/bg-img-3.jpg";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

function LeftImage() {
  return (
    <Grid size={{xs:0,sm:0,md:6}}  style={{height:"calc(100vh - 7.5rem)",width:"100%",padding:"10px"}}>
      <Image
        src={BgImage}
        className="rounded-md w-[100%] h-[100%] object-cover"
        alt="Colorfull gradient"
      />
      <Grid container direction="column">
        <Grid
          size={6}
          sx={{
            position: "absolute",
            top: `140px`,
            padding: "20px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "50%",
            gap: "20px",
          }}
        >
          <Typography variant="h6" color="black" className="inline-block">
            A WISE QUOTE
          </Typography>
          <span className="h-[1px] bg-[gray] block w-[30%]" />
        </Grid>
        <Grid
          size={6}
          sx={{ position: "absolute", bottom: "0px", padding: "20px",width:"50%",paddingBottom:"40px"}}
        >
          <Typography variant="h2" color="#202020" fontWeight={700} paddingBottom={2}>
            Get 
            <br />
            Everything
            <br />
            You Want
          </Typography>
          <Typography variant="h6" color="#323232">
            You can get everything you went if you work hard. <br />
            Trust the process and stick to the plan.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LeftImage;