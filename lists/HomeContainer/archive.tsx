import { FiActivity, FiUsers, FiAward, FiClock } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IconType } from "react-icons";

export interface IArchiveItem {
  name: string;
  count: string;
  icon: IconType;
  endIcon?: IconType;
  start?: string;
}

export const archive: IArchiveItem[] = [
  {
    name: "Proje",
    count: "100",
    icon: FiActivity,
    endIcon: FaPlus,
  },
  {
    name: "Kullanıcı",
    count: "100",
    icon: FiUsers,
    start: "~",
  },
  {
    name: "Ödül",
    count: "7",
    icon: FiAward,
  },
  {
    name: "Metrik",
    count: "5",
    icon: FiClock,
  },
];
