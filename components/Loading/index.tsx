"use client";
import { selectColor } from '@/lib/redux/features/color/colorSlice'
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { CircularProgress, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Loading() {
    const color = useSelector(selectColor);
    const theme = useSelector(selectTheme);

    return (
        <Stack sx={{
            height: "calc(100vh - 7.5rem)",
            background: theme === 'dark' ? "#000" : "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }} spacing={2} direction="row">
            <CircularProgress style={{ color: colorOptions[color].dark }} size={70} />
        </Stack>
    )
}

export default Loading
