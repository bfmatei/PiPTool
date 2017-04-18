import { TInsertType } from "./insertType";

export interface IResource {
  resourceName: string;
  domains: string;
  elementType: string;
  videoSelector: string;
  buttonClassList: string;
  videoParentSelector: string;
  controlsWrapperSelector: string;
  insertType: TInsertType;
  insertTarget?: string;
}
