export interface ISkill {
  id: number;
  name: string;
  filter: string;
  icon?: string; // Cambiado a opcional
}


export interface IProject {
  id: number;
  name: string;
  img: string;
  description: string;
  techs: number[];
  urls: {
    code?: string;
    view?: string;
  };
}
