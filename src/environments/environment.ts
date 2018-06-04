// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '(dev)',
  match_engine: {
      serverUrl: 'http://matching-engine:9096/api/',
      defaultLanguage: 'en-US',
      channel: 'PORTAL',
      organizationID: 'MATCH-ENGINE',
      application: 'MATCH_PORTAL',
      supportedLanguages: [
          'en-US',
          'fr-FR',
      ],
  },
  parts_portal: {
      serverUrl: 'http://matching-engine:9095/',
      defaultLanguage: 'en-US',
      channel: 'PORTAL',
      organizationID: 'PART-PORTALS',
      application: 'PARTS_PORTAL',
      supportedLanguages: [
          'en-US',
          'fr-FR',
      ],
  },
  systems: [
    'PART-PORTALS',
    'MATCH-ENGINE',
  ],
};
