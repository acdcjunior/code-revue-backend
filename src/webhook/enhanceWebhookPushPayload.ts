import {GitLabPush} from "../gitlab/types/GitLabPush/GitLabPush";
import {getGitLabCommitDiff} from "../gitlab/getGitLabCommitDiff";

export default async function enhanceWebhookPushPayload(webhookPayload: GitLabPush) {
    const lastCommit = webhookPayload.commits[0];
    console.log(`Handling webhook invoked for ${webhookPayload.repository.git_http_url}. Message: '${lastCommit.message.trim()}'.`);

    const outputPayload = JSON.parse(JSON.stringify(webhookPayload));

    for (const commit of outputPayload.commits) {
        commit.diff = await getGitLabCommitDiff(webhookPayload.project_id, commit.id);
    }
//    console.log(JSON.stringify(outputPayload, null, '\t'));

    return outputPayload;
}