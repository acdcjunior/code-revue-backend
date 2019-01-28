import {firestore} from "../db/db";

let gitlabServerUrl, gitlabApiToken;

async function initializeGitlabInfo() {
    const configRef = firestore.collection('gitlab-server-config').doc('config');
    const configSnapshot = await configRef.get();

    gitlabServerUrl = configSnapshot.data().gitlabServerUrl;

    gitlabApiToken = configSnapshot.data().gitlabApiToken; // api + read_user token with access to the projects that will be tracked
}

export async function gitLabServerInfo() {
    if (!gitlabServerUrl || !gitlabApiToken) {
        await initializeGitlabInfo();
    }
    return {
        gitlabServerUrl,
        gitlabApiToken
    }
}
