// ArchiveItem.tsx
"use client";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { colorOptions } from "@/lists/color";
import { useSelector } from "react-redux";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { IconType } from "react-icons";
import { IArchiveItem } from "@/lists/HomeContainer/archive";

interface ArchiveItemProps {
  item: IArchiveItem;
}

const ArchiveItem = ({ item }: ArchiveItemProps) => {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  const Icon: IconType = item.icon;
  const EndIcon: IconType | undefined = item.endIcon;

  const countItem: number = parseInt(item.count);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, countItem, { duration: 1 });
    return () => controls.stop();
  }, [countItem, count]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-[160px] sm:h-[200px]">
      <div
        className="text-4xl flex items-center justify-center gap-2"
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
      >
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
        {item.name}
      </Typography>
    </div>
  );
};

export default ArchiveItem;
