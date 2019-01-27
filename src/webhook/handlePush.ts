
export default function handlePush(webhookPayload) {
    const lastCommit = webhookPayload.commits[0];
    console.log(`Handling webhook invoked for ${webhookPayload.repository.git_http_url}. Message: '${lastCommit.message.trim()}'.`);

    return Promise.resolve(webhookPayload);
}