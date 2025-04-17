import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiUdemy, SiGmail } from "react-icons/si";


export interface ISocialMediaItem {
    name: string,
    link: string,
    icon: IconType
}

export const socialMedia: ISocialMediaItem[] = [
    {
        name: "GitHub",
        link: "https://github.com/",
        icon: FaGithub
    },
    {
        name: "X",
        link: "https://x.com/?lang=tr",
        icon: FaSquareXTwitter
    },
    {
        name: "Udemy",
        link: "https://www.udemy.com/",
        icon: SiUdemy
    },
    {
        name: "Mail",
        link: "https://workspace.google.com/intl/tr/gmail/",
        icon: SiGmail
    },
    {
        name: "Linkedin",
        link: "https://www.linkedin.com/",
        icon: FaLinkedin
    },
    {
        name:"Youtube",
        link:"https://www.youtube.com/",
        icon:FaYoutube 
    }
];