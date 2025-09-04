"use client";
import React from "react";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import {  useSelector } from "react-redux";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { darken } from "@mui/material";
import { useRouter } from "next/navigation";

interface IStep {
  step: number;
}

function Stepper({ step }: IStep) {
  const router = useRouter();
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  return (
    <MobileStepper
      variant="progress"
      steps={9}
      position="static"
      activeStep={step}
      sx={{
        flexGrow: 1,
        background: theme === "dark" ? "#333" : colorOptions[color].light,
        "& .css-l16vtb-MuiLinearProgress-bar1": {
          backgroundColor: colorOptions[color].dark,
        },
        "& .css-31i2i5-MuiLinearProgress-root-MuiMobileStepper-progress": {
          backgroundColor: darken(colorOptions[color].light, 0.1),
        },
      }}
      nextButton={
        <Button
          sx={{
            color: colorOptions[color].dark,
            ":disabled": { color: "#999 !important" },
            fontSize: "16px",
          }}
          onClick={() => router.push(`/createPortfolio/${step + 1}`)}
          disabled={step === 8}
          type="button"
        >
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          sx={{
            color: colorOptions[color].dark,
            ":disabled": { color: "#999 !important" },
            fontSize: "16px",
          }}
          onClick={() => router.push(`/createPortfolio/${step - 1}`)}
          disabled={step === 0}
          type="button"
        >
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  );
}

export default Stepper;
