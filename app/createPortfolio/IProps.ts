import { ILanguageArray } from "@/components/Steps/Step2/IProps";
import { ISocialMediaProjectsItem } from "@/lists/SocialMedia/ProjectsSocialMediaList";
import { Dayjs } from "dayjs";

export interface ICountry {
  id: number;
  name: string;
}

export interface ICountryWorkExperience {
  id: number;
  name: string;
  workExperienceId?: number;
}

export interface ICity {
  _id?: string;
  id: number;
  name: string;
  country_id: number;
}

export interface ICityWorkExperience {
  id: number;
  name: string;
  country_id: number;
  workExperienceId?: number;
}

export interface IJob {
  id: number;
  name: string;
}

export interface IDistrict {
  id: number;
  name: string;
  city_id: number;
}

export interface ICertificates {
  id: number;
  title: string;
  companyName: string;
  date: Dayjs | null;
  files: ICertificatesFiles[] | [];
}

export interface ICertificatesFiles {
  base64: string;
  name: string;
  id: number;
  type: string;
  size: number;
}

export interface IWorkExperiences {
  id: number;
  position: string;
  title: string;
  workingMethod: string;
  country: string;
  city: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  description: string;
  isWorking: boolean;
}

export interface IEducations {
  id: number;
  schoolName: string;
  department: IJob | null;
  degree: IJob | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  isSchooling: boolean;
}

export interface IProjectLinks {
  id: number;
  socialMedia: ISocialMediaProjectsItem | null;
  linkUrl: string;
}

export interface IProjects {
  id: number;
  title: string;
  description: string;
  attachment: null | ICertificatesFiles;
  links: [] | IProjectLinks[];
}

interface IPhoto {
  base64:  string;
  name: string;
}

interface IAuthor {
  id: number;
  name: string | null;
  surname: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
}

export interface ICreatePortfolio {
  id: number;
  author: null | IAuthor;
  name: string;
  surname: string;
  title: string;
  photo: null | IPhoto;
  shortBiography: string;
  email: string;
  jobs: [] | IJob[];
  otherJob: string;
  country: null | ICountry;
  city: null | ICity;
  district: null | IDistrict;
  skills: [] | string[];
  languages: [] | ILanguageArray[];
  certificates: [] | ICertificates[];
  workExperiences: [] | IWorkExperiences[];
  educations: [] | IEducations[];
  projects: [] | IProjects[];
  privacyPolicy:boolean;
  termOfUse:boolean;
  explorePermission:boolean;
  likes:number;
  dislikes:number;
  favorites:number;
}
