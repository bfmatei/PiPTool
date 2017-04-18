import { IResource } from "./resource.interface";

export interface IParams {
  baseURI: string;
  buttonTitle: string;
  buttonClass: string;
  resources: IResource[];
}
