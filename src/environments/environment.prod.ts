export const environment = {
  production: true,
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
        serverUrl: 'http://matching-engine:9095/api/',
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
