import axios from 'axios';
import {encodeGroupProjectPath} from "./encodeGroupProjectPath";
import {GitLabProject} from "./types/GitLabProject/GitLabProject";
import {gitLabServerInfo} from "../coderevue/server-config";


async function getGitLabProject(project_id: string | number): Promise<GitLabProject> {
    const gitLabServer = await gitLabServerInfo();

    let {data: getProject} = await axios.get(
        `${gitLabServer.gitlabServerUrl}/api/v4/projects/${encodeGroupProjectPath(project_id)}`,
        {headers: {"PRIVATE-TOKEN": gitLabServer.gitlabApiToken}}
    );
    return getProject;
}

export { getGitLabProject };