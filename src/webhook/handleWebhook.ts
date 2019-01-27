import handlePush from './handlePush';
import {GitLabPush} from "./GitLabPush/GitLabPush";


function handleWebhook(webhookPayload: GitLabPush): Promise<any> {

    if (webhookPayload.object_kind === "push") {
        let gitlabPush = webhookPayload as GitLabPush;

        console.log(`Received webhook for PUSH from ${gitlabPush.repository.git_http_url}. Message: '${gitlabPush.commits && gitlabPush.commits[0].message.trim()}'.`);
        return handlePush(gitlabPush);
    }

    console.log(`Received webhook. Unknown type: ${webhookPayload.object_kind}.`);
}

export { handleWebhook };