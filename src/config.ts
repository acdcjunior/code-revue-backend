import os = require("os");

const PORT = process.env.PORT || 9999;
const CODEREVUE_BACKEND_URL = process.env.CODEREVUE_BACKEND_URL || `http://localhost:${PORT}` || `http://${os.hostname()}:${PORT}`;

const GITLAB_URL = process.env.GITLAB_URL || 'http://127.0.0.1:8888';
const GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN || '-HCmXGsXkmrv7krhUiy3';

const WEBHOOKS_URL = `/webhooks`;

const config = {
    codeRevue: {

        repoGitlab: {
            codeRevueBackendUrl: CODEREVUE_BACKEND_URL,
            codeRevueBackendPort: require('url').parse(CODEREVUE_BACKEND_URL).port || 80,

            webhooksUrl: WEBHOOKS_URL,

            gitlab: {
                url: GITLAB_URL,
                apiToken: GITLAB_API_TOKEN, // api + read_user token for the gitUserName gitlab user

                normalizeGitLabUrl(url) {
                    let gitlabUrl = GITLAB_URL;
                    if (!gitlabUrl.endsWith('/')) {
                        gitlabUrl += '/';
                    }
                    return url.replace(/^https?:\/\/[^\/]+\//, gitlabUrl)
                }
            }
        }

    }
};

export default config;
