import os = require("os");

const PORT = process.env.PORT || 9999;
const CODEREVUE_BACKEND_URL = process.env.CODEREVUE_BACKEND_URL || `http://localhost:${PORT}` || `http://${os.hostname()}:${PORT}`;

const WEBHOOKS_URL = `/webhooks`;

const config = {
    codeRevue: {

        dbJson: process.env.DB_JSON_1 + process.env.DB_JSON_2,

        repoGitlab: {
            codeRevueBackendUrl: CODEREVUE_BACKEND_URL,
            codeRevueBackendPort: require('url').parse(CODEREVUE_BACKEND_URL).port || 80,

            webhooksUrl: WEBHOOKS_URL,
        }

    }
};

export default config;
