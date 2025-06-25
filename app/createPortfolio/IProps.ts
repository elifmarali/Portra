import { ILanguageArray } from "@/components/Steps/Step2/IProps";
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

export interface ICreatePortfolio {
  name: string;
  surname: string;
  title: string;
  photo: null | File;
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
}
