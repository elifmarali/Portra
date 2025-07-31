"use client";
import "./style.css";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark.png";
import { Button } from "@mui/material";
import "../../app/globals.css";
import Box from "@mui/material/Box";
import { colorOptions } from "../../lists/color";
import CustomSelect from "../CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { loginNavbarShortcut } from "../../lists/Navbar/loginNavbarShortcut";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSelect";
import * as motion from "motion/react-client";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { currentAuth } from "@/lib/redux/features/auth/authSlice";
import { navbarShortcut } from "@/lists/Navbar/navbarShortcut";
import { deleteToken } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { useRouter } from "next/navigation";

function Navbar() {
  const auth = useSelector(currentAuth);
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <motion.div
      initial={{ backgroundColor: theme === "dark" ? "#fff" : "#000" }}
      animate={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      transition={{ duration: 0.5 }}
      className="flex justify-center w-full"
    >
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-between px-5 py-3 gap-4">
        {/* Logo */}
        <Link href="/" className="flex justify-center lg:justify-start">
          <Image
            alt="Logo"
            src={theme === "dark" ? LogoDark : Logo}
            className="rounded-lg"
            width={90}
            height={100}
          />
        </Link>

        {/* Menü */}
        <ul className="flex flex-wrap justify-center lg:justify-center items-center gap-6 font-bold">
          {(auth.name && auth.email ? navbarShortcut : loginNavbarShortcut).map(
            (navbarItem, i) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                key={i}
              >
                <Link
                  href={navbarItem.path}
                  className="navbarItem"
                  style={{
                    color:
                      theme === "dark"
                        ? colorOptions[color].light
                        : colorOptions[color].dark,
                    fontWeight: 600,
                    fontSize: "1.3rem"
                  }}
                >
                  {navbarItem.name}
                </Link>
              </motion.div>
            )
          )}
        </ul>

        {/* Ayarlar ve Giriş/Çıkış */}
        <Box className="flex flex-col gap-2 items-center lg:items-end">
          {auth.name && auth.email ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Button
                variant="outlined"
                sx={{
                  color:
                    theme === "dark"
                      ? colorOptions[color].dark
                      : colorOptions[color].light,
                  background:
                    theme === "dark"
                      ? colorOptions[color].light
                      : colorOptions[color].dark,
                  border: "none",
                }}
                onClick={() => {
                  deleteToken(dispatch);
                  router.refresh();
                }}
              >
                Çıkış Yap
              </Button>
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: colorOptions[color].dark }}
                >
                  <Link href="/login">Giriş Yap</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: colorOptions[color].dark }}
                >
                  <Link href="/register">Kayıt Ol</Link>
                </Button>
              </motion.div>
            </div>
          )}

          <div className="flex justify-center items-center gap-2">
            <CustomSelect name="object" values={colorOptions} />
            <ThemeSwitcher />
          </div>
        </Box>
      </div>
    </motion.div>
  );
}

export default Navbar;
