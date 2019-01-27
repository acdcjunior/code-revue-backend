import {GitLabPush} from "./types/GitLabPush/GitLabPush";

export function getGitLabServerUrl(webhookPayload: GitLabPush) {
    return webhookPayload.project.web_url.match(/^(https?:\/\/[\w-.]+(:\d+)?)\//)[1];
}