import axios from 'axios';
import config from '../config';
import {GitLabCommit} from "./types/GitLabCommit/GitLabCommit";


export async function getGitLabCommit(serverUrl: string, projectId: number | string, sha: string): Promise<GitLabCommit> {
    let url = `${serverUrl}/api/v4/projects/${projectId}/repository/commits/${sha}`;
    let {data: commit} = await axios.get(url, {headers: {"PRIVATE-TOKEN": config.codeRevue.gitlabApiToken}});
    return commit;
}