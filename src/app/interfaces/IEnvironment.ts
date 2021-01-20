import { IContentfulConfig } from './IContentfulConfig';

export interface IEnvironment {
  production: boolean;
  contentful?: IContentfulConfig;
}
