export interface ICountry {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
  country_id: number;
}

export interface IJob{
  id:number;
  name:string;
}

export interface IDistirct{
  id:number;
  name:string;
  city_id:number;
}