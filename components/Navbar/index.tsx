"use client";
import Image from 'next/image';
import Logo from "@/public/Portra.png";
import { Button } from '@mui/material';
import "../../app/globals.css";
import Box from '@mui/material/Box';
import { colorOptions } from "../../lists/color";
import CustomSelect from '../CustomSelect';
import { useSelector } from 'react-redux';
import { loginNavbarShortcut } from '../../lists/Navbar/loginNavbarShortcut';
import Link from 'next/link';
import ThemeSwitcher from '../ThemeSelect';
import * as motion from "motion/react-client";
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { selectColor } from '@/lib/redux/features/color/colorSlice';

function Navbar() {
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);

  return (
    <motion.div
      initial={{ backgroundColor: theme === "dark" ? "#fff" : "#000" }}
      animate={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      transition={{ duration: 0.5 }}
      className="flex justify-center"
    >
      <div className="h-[14.5rem] px-5 py-3 text-white grid grid-cols-1 justify-items-center sm:h-[7rem] sm:grid-cols-4 sm:w-[90%] sm:max-w-[90%] sm:justify-items-start">
        <Link href="/" className="flex justify-center sm:justify-start mb-4">
          <Image alt="Logo" src={Logo} className="rounded-md text-center" width={200} height={200} />
        </Link>

        <ul className="w-full col-span-2 text-center sm:text-left flex justify-between items-center gap-4 text-lg font-bold mb-4">
          {
            loginNavbarShortcut.map((navbarItem, i) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                key={i}
              >
                <Link
                  style={{
                    color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark,
                    fontSize: "20px",
                    fontWeight: 600
                  }}
                  href={navbarItem.path}
                >
                  {navbarItem.name}
                </Link>
              </motion.div>
            ))
          }
        </ul>

        <Box className="w-full flex flex-col items-end gap-4 sm:gap-0 sm:flex-col">
          <div className='w-full flex justify-evenly items-start gap-2 sm:w-full sm:justify-end'>
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
          <div className='w-full flex justify-center items-center sm:justify-end sm:mt-2'>
            <CustomSelect name="object" values={colorOptions} />
            <ThemeSwitcher />
          </div>
        </Box>
      </div>
    </motion.div>
  );
}

export default Navbar;
