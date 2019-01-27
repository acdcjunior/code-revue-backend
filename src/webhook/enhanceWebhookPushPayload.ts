import axios from 'axios';
import {GitLabPush} from "./GitLabPush/GitLabPush";
import {GitLabModifiedFile} from "./GitLabDiff/GitLabModifiedFile";
import config from "../config";

export default async function enhanceWebhookPushPayload(webhookPayload: GitLabPush) {
    const lastCommit = webhookPayload.commits[0];
    console.log(`Handling webhook invoked for ${webhookPayload.repository.git_http_url}. Message: '${lastCommit.message.trim()}'.`);

    const outputPayload = JSON.parse(JSON.stringify(webhookPayload));

    const serverUrl = getServerUrl(webhookPayload);

    for (const commit of outputPayload.commits) {
        commit.diff = await getGitLabCommitDiff(serverUrl, webhookPayload.project_id, commit.id);
    }
//    console.log(JSON.stringify(outputPayload, null, '\t'));

    return outputPayload;
}

function getServerUrl(webhookPayload: GitLabPush) {
    return webhookPayload.project.web_url.match(/^(https?:\/\/[\w-.]+(:\d+)?)\//)[1];
}

async function getGitLabCommitDiff(serverUrl: string, projectId: number | string, sha: string): Promise<GitLabModifiedFile[]> {
    let url = `${serverUrl}/api/v4/projects/${projectId}/repository/commits/${sha}/diff`;
    //console.log(url);
    const {data: modifiedFiles} = await axios.get(
        url,
        {headers: {"PRIVATE-TOKEN": config.codeRevue.gitlabApiToken}}
    );
    for (const modifiedFile of modifiedFiles) {
        if (modifiedFile.diff[0] === '@') {
            modifiedFile.diff = `--- a/${modifiedFile.old_path}\n+++ b/${modifiedFile.new_path}\n${modifiedFile.diff}`;
        }
    }
    return modifiedFiles;
}
