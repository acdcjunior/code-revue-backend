import {GitLabPush} from "../gitlab/types/GitLabPush/GitLabPush";
import {guaranteeProjectExistsInDb} from "../coderevue/project";
import {processPossibleNewGitLabCommit} from "../coderevue/gitlab-commit";


export default async function handlePush(webhookPayload: GitLabPush) {
    const lastCommit = webhookPayload.commits[0];
    console.log(`Handling PUSH invoked for ${webhookPayload.repository.git_http_url}. Message: '${lastCommit.message.trim()}'.`);

    await guaranteeProjectExistsInDb(webhookPayload.project_id + '');

    for (const commit of webhookPayload.commits) {
        await processPossibleNewGitLabCommit(webhookPayload.project_id + '', webhookPayload.ref, commit.id);
    }
}
