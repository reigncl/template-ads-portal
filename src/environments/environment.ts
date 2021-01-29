// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from 'src/app/interfaces/IEnvironment';

export const environment: IEnvironment = {
  production: false,
  contentful: {
    space: 'v2fzqi8oenbe',
    accessToken: 'MsLnFraDjRT1BIdoYLAsNAU8Db4HGcrMPYjFyJNeyr4',
    host: 'cdn.contentful.com',
    environment: 'master',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
