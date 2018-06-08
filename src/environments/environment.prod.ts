export const environment = {
  production: true,
    version: '(dev)',
    tn_portal: {
        serverUrl: 'http://silindatn.us.openode.io',
        defaultLanguage: 'en-US',
        channel: 'PORTAL',
        organizationID: 'SILINDATN',
        application: 'TN_PORTAL',
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
