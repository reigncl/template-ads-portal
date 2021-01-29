import { IContentfulConfig } from './IContentfulConfig';

export interface IEnvironment {
  production: boolean;
  contentful?: IContentfulConfig;
  appVersion?: string;
  commerceLayer?: string;
  emailConfig?: any;
  slugHome?: string;
  enabledRobots?: boolean;
  siteName?: string;
  slugNotFound?: string;
  domain?: string;
}
