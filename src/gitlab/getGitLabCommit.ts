import axios from 'axios';
import {GitLabCommit} from "./types/GitLabCommit/GitLabCommit";
import {gitLabServerInfo} from "../coderevue/server-config";


export async function getGitLabCommit(projectId: number | string, sha: string): Promise<GitLabCommit> {
    const gitLabServer = await gitLabServerInfo();

    let {data: commit} = await axios.get(
        `${gitLabServer.gitlabServerUrl}/api/v4/projects/${projectId}/repository/commits/${sha}`,
        {headers: {"PRIVATE-TOKEN": gitLabServer.gitlabApiToken}}
    );
    return commit;
}