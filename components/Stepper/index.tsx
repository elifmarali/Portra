"use client";
import React, { useEffect } from 'react';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from "@/lists/color";
import { changeCurrentPage, currentStep } from "@/lib/redux/features/portfolioCurrentPage/portfolioCurrentPageSlice";
import { useDispatch, useSelector } from 'react-redux';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { darken } from '@mui/material';


function Stepper() {
    const step: number = useSelector(currentStep);
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);

    useEffect(() => {
        console.log("step : ", step);
    }, [step])


    return (
        <MobileStepper
            variant="progress"
            steps={8}
            position="static"
            activeStep={step}
            sx={{
                flexGrow: 1, background: theme === "dark" ? "#333" : colorOptions[color].light,
                "& .css-l16vtb-MuiLinearProgress-bar1": {
                    backgroundColor: colorOptions[color].dark
                },
                "& .css-31i2i5-MuiLinearProgress-root-MuiMobileStepper-progress": {
                    backgroundColor: darken(colorOptions[color].light, .1),
                }
            }}
            nextButton={
                <Button
                    sx={{ color: colorOptions[color].dark, ":disabled": { color: "#999 !important" }, fontSize: "16px" }}
                    onClick={() => dispatch(changeCurrentPage(step + 1))}
                    disabled={step === 7}>
                    Next
                    <KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button
                    sx={{ color: colorOptions[color].dark, ":disabled": { color: "#999 !important" }, fontSize: "16px" }}
                    onClick={() => dispatch(changeCurrentPage(step - 1))}
                    disabled={step === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
            }
        />
    )
}

export default Stepper
