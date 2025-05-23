
"use client";
import { changeColor } from '@/lib/redux/features/color/colorSlice';
import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa6";
import { motion } from "motion/react"

function CustomSelect({ name, values }: ICustomSelect) {
    const color = useSelector((state: IState) => state.color.color);
    const dispatch = useDispatch();

    return (
        <motion.div
            /* initial={{ opacity: 0 }}  // Başlangıçta görünmez
            animate={{ opacity: 1 }}  // Görünür olacak
            transition={{ duration: 0.5 }} // 0.5 saniye içinde animasyon */
            initial={{ x: '-150%' }}  // Başlangıçta tamamen sol dışarda
            animate={{ x: 0 }}        // Ekranın ortasına kayacak
            transition={{ duration: 0.5 }}
        >
            <Select
                name={name}
                id={name}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            mt: .5, // Menü yukarı kayar
                        },
                    },
                }}
                sx={{
                    height: "30px",
                    position: "relative",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '.MuiSelect-icon': {
                        display: 'none !important',
                    },
                    '.css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                        background: "#00ffff !important"
                    },
                }}
                value={color}
                renderValue={(selected: string) => (
                    <div
                        style={{
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "9999px",
                            backgroundColor: values[selected]?.dark,
                            margin: "0 auto",
                            position: "absolute",
                            left: "5px",
                            top: "8px"
                        }}
                    />
                )}
                onChange={(e) => dispatch(changeColor(e.target.value))}
            >
                {name === "object" && (
                    Object.keys(values).map((key) => (
                        <MenuItem
                            value={key}
                            key={key}
                            sx={{
                                height: '2rem',
                                width: '2rem',
                                borderRadius: '9999px',
                                backgroundColor: values[key].dark,
                                margin: '4px auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                '&:hover': {
                                    backgroundColor: values[key].dark,
                                },
                                '&.Mui-selected': {
                                    opacity: 0.8,
                                    backgroundColor: values[key].dark,
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: values[key].dark,
                                },
                            }}
                        >
                            {key === color && (
                                <FaCheck style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }} />
                            )}
                        </MenuItem>
                    ))
                )}
            </Select>
        </motion.div>
    );
}

export default CustomSelect;

interface ICustomSelect {
    name: string;
    values: { [key: string]: { light: string, dark: string } };
}


interface IState {
    color: {
        color: string
    }
}