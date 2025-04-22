"use client";
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { ISocialMediaItem } from '@/lists/HomeContainer/SocialMedia';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as motion from "motion/react-client"

interface SocialMediaItemProps {
    socialItem: ISocialMediaItem;
}

function SocialMediaItem({ socialItem }: SocialMediaItemProps) {
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    
    const [iconSize, setIconSize] = useState(40);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateIconSize = () => {
                setIconSize(window.innerWidth < 640 ? 30 : 40);
            };

            // Sayfa yüklendiğinde bir kez çalıştır
            updateIconSize();

            // Ekran boyutu değiştiğinde çalışsın
            window.addEventListener("resize", updateIconSize);

            // Cleanup
            return () => window.removeEventListener("resize", updateIconSize);
        }
    }, []);

    const { link, icon: Icon } = socialItem;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ backgroundColor: theme === "dark" ? colorOptions[color].dark : "lightGray" }}
            whileInView={{ opacity: 1 }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: `${iconSize + 10}px`,
                height: `${iconSize + 10}px`,
                transition: "all 0.3s ease",
                borderRadius: "50%"
            }}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon size={iconSize} style={{
                    color: theme === "dark" ? colorOptions[color].light : "#363636",
                    padding: iconSize === 30 ? "4px" : "6px"
                }} />
            </a>
        </motion.div>
    );
}

export default SocialMediaItem;
