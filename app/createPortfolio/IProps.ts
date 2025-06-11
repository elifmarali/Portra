import { ILanguageArray } from "@/components/Steps/Step2/IProps";
import { Dayjs } from "dayjs";

export interface ICountry {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
  country_id: number;
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
}
