"use client";
import "./style.css";
import Image from 'next/image';
import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark.png";
import { Button } from '@mui/material';
import "../../app/globals.css";
import Box from '@mui/material/Box';
import { colorOptions } from "../../lists/color";
import CustomSelect from '../CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { loginNavbarShortcut } from '../../lists/Navbar/loginNavbarShortcut';
import Link from 'next/link';
import ThemeSwitcher from '../ThemeSelect';
import * as motion from "motion/react-client";
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { currentAuth } from '@/lib/redux/features/auth/authSlice';
import { useEffect } from 'react';
import { navbarShortcut } from '@/lists/Navbar/navbarShortcut';
import { deleteToken } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { useRouter } from "next/navigation";


function Navbar() {
  const auth = useSelector(currentAuth);
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("auth : ", auth);
  }, [auth]);

  return (
    <motion.div
      initial={{ backgroundColor: theme === "dark" ? "#fff" : "#000" }}
      animate={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      transition={{ duration: 0.5 }}
      className="flex justify-center"
    >
      <div className="h-[14.5rem] px-5 py-3 text-white grid grid-cols-1 justify-items-center lg:h-[7rem] lg:grid-cols-4 lg:w-[90%] lg:max-w-[90%] lg:justify-items-start">
        <Link href="/" className="flex justify-center lg:justify-start mb-4">
          <Image alt="Logo" src={theme === "dark" ? LogoDark :Logo} className="rounded-lg text-center" width={90} height={100} />
        </Link>

        <ul className="w-full col-span-2 text-center lg:text-left flex justify-between items-center gap-4 font-bold mb-4">
          {
            ((auth.name && auth.email) ? navbarShortcut : loginNavbarShortcut).map((navbarItem, i) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                key={i}
              >
                <Link
                  style={{
                    color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark,
                    fontWeight: 600,
                  }}
                  className='navbarItem'
                  href={navbarItem.path}
                >
                  {navbarItem.name}
                </Link>
              </motion.div>
            ))
          }
        </ul>

        <Box className="w-full flex flex-col items-end gap-4 lg:gap-0 lg:flex-col">
          {
            (auth.name && auth.email) ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                <Button variant="outlined"
                sx={{color: theme === "dark" ? colorOptions[color].dark : colorOptions[color].light, background: theme === "dark"? colorOptions[color].light : colorOptions[color].dark , border:"none"}}                
                onClick={() => {
                  deleteToken(dispatch);
                  router.refresh();
                }}>
                  Çıkış Yap
                </Button>
              </motion.div>
            ) : (
              <div className='w-full flex justify-evenly items-start gap-2 lg:w-full lg:justify-end'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                  <Button variant="contained" style={{ backgroundColor: colorOptions[color].dark }}>
                    <Link href="/login">Giriş Yap</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                  <Button size="medium" variant="contained" style={{ backgroundColor: colorOptions[color].dark }}>
                    <Link href="/register">Kayıt Ol</Link>
                  </Button>
                </motion.div>
              </div>
            )
          }
          <div className={`w-full flex justify-center items-center lg:justify-end ${!auth && "lg:mt-2"}`}>
            <CustomSelect name="object" values={colorOptions} />
            <ThemeSwitcher />
          </div>
        </Box>
      </div>
    </motion.div>
  );
}

export default Navbar;
