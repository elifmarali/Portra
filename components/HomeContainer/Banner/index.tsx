"use client";
import React from "react";
import { useSelector } from "react-redux";
import { colorOptions } from "@/lists/color";
import { Box, Button, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import BannerImage from "@/public/BannerImage.png";
import Image from "next/image";
import * as motion from "motion/react-client";
import Link from "next/link";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";

function Banner() {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${colorOptions[color].dark}, ${colorOptions[color].light})`,
  };

  return (
    <div className="w-full py-5 grid grid-cols-1 place-items-start gap-10 sm:justify-items-end sm:grid-cols-2">
      <Box className="font- flex flex-col h-full justify-between">
        <Box>
          <Typography
            variant="h1"
            className="text-transparent bg-clip-text !font-bold"
            style={gradientStyle}
          >
            Merhaba
          </Typography>
          <TypeAnimation
            key={`${theme}-${color}`}
            sequence={[
              "Ben Portra.",
              1000,
              "Portfolyo oluşturmanı sağlarım.",
              1000,
              "Yaratıcı tasarımlar yapmanı mümkün kılarım.",
              1000,
              "Projelerinle ilham verici işler ortaya koyabilirsin.",
              1000,
              "Tüm bu özellikleri kolayca keşfetmeni sağlarımdır.",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "1.5em",
              display: "inline-block",
              color:
                theme === "dark"
                  ? colorOptions[color].light
                  : colorOptions[color].dark,
            }}
            repeat={Infinity}
          />
        </Box>
        <Box className="flex flex-col gap-4">
          <Typography
            variant="h6"
            style={{ color: theme === "dark" ? "white" : "gray" }}
          >
            <span
              className="font-semibold"
              style={{ color: colorOptions[color].dark }}
            >
              Portra
            </span>
            , kendi portfolyonu kolayca oluşturabileceğin, projelerini
            sergileyip yaratıcı tasarımlarını paylaşabileceğin modern ve
            kullanıcı dostu bir platformdur.
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            style={{ transformOrigin: "left center" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: colorOptions[color].dark }}
            >
              <Link href="/login">Daha fazlası için...</Link>
            </Button>
          </motion.div>
        </Box>
      </Box>
      <Box
        style={{
          backgroundColor: colorOptions[color].dark,
          borderRadius: "50%",
          padding: "50px",
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image
            alt="Banner Image"
            src={BannerImage}
            width={400}
            height={100}
            className=""
          />
        </motion.div>
      </Box>
    </div>
  );
}

export default Banner;
