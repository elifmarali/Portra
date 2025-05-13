export interface ICountry {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
  country_id: number;
}
