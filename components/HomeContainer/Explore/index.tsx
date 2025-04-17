"use client";
import { IColor } from '@/lib/redux/interfaces/IColor'
import { ITheme } from '@/lib/redux/interfaces/ITheme';
import { colorOptions } from '@/lists/color';
import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

function Explore() {
    const color = useSelector((state:IColor) => state.color.color);
    const theme = useSelector((state:ITheme) => state.theme.theme);

    return (
        <div className='w-full py-10' style={{color: theme === "dark" ? "#fff" : colorOptions[color].dark }}>
            <Typography variant='h4' className='text-center !font-black uppercase'>Keşfedebileceğin Projeler</Typography>
            <div className='grid grid-cols-3 h-50'>
                {/* Yapılacak : portfolio uygulamsındaki my project alanı gibi ilk 2 ya da 5 örnek gözüksün ama üzerlerine tıklanıldığında ya da daha fazlaya tıklanıldığında login olması gereksin  */}
            </div>
        </div>
    )
}

export default Explore
