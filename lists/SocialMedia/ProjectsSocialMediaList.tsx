import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiUdemy, SiGmail } from "react-icons/si";

export interface ISocialMediaProjectsItem {
  id: number;
  name: string;
  icon: IconType;
}

export const projectsSocialMediaList: ISocialMediaProjectsItem[] = [
  {
    id: 1,
    name: "GitHub",
    icon: FaGithub,
  },
  {
    id: 2,
    name: "X",
    icon: FaSquareXTwitter,
  },
  {
    id: 3,
    name: "Udemy",
    icon: SiUdemy,
  },
  {
    id: 4,
    name: "Mail",
    icon: SiGmail,
  },
  {
    id: 5,
    name: "Linkedin",
    icon: FaLinkedin,
  },
  {
    id: 6,
    name: "Youtube",
    icon: FaYoutube,
  },
];
