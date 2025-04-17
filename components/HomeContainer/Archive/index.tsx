"use client";
import React, { useEffect } from "react";
import { IArchiveItem, archive } from "@/lists/HomeContainer/archive";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { colorOptions } from "@/lists/color";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";

function Archive() {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  return (
    <div
      className={`w-full grid grid-cols-1 sm:grid-cols-4 sm:justify-center sm:place-items-center sm:items-center`}
    >
      {archive.map((archiveItem: IArchiveItem) => {
        const Icon: any = archiveItem.icon;
        const EndIcon: any = archiveItem.endIcon;
        const countItem: number = parseInt(archiveItem.count);
        const count = useMotionValue(0);
        const rounded = useTransform(count, (latest) => Math.round(latest));

        useEffect(() => {
          const controls = animate(count, countItem, { duration: 1 });
          return () => controls.stop();
        }, [countItem, count]);

        return (
          <div
            key={archiveItem.name}
            className="flex flex-col justify-center items-center gap-2 h-[160px] sm:h-[200px]"
          >
            <div
              className="text-4xl flex items-center justify-center gap-2"
              style={{ color: theme === "dark" ? "#fff" : "#000" }}
            >
              {/* Icon render ediliyor */}
              {Icon && (
                <Icon
                  style={{
                    color:
                      theme === "dark"
                        ? colorOptions[color].light
                        : colorOptions[color].dark,
                  }}
                />
              )}
              <motion.pre>{rounded}</motion.pre>
              {/* EndIcon render ediliyor */}
              {EndIcon && (
                <div className="text-white text-xl mt-1">
                  <EndIcon />
                </div>
              )}
            </div>

            <Typography
              style={{
                color:
                  theme === "dark"
                    ? colorOptions[color].light
                    : colorOptions[color].dark,
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              {archiveItem.name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

export default Archive;
