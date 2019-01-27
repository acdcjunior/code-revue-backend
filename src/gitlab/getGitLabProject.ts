import axios from 'axios';
import config from '../config';
import {encodeGroupProjectPath} from "./encodeGroupProjectPath";
import {GitLabProject} from "./types/GitLabProject/GitLabProject";


async function getGitLabProject(serverUrl: string, project_id: string | number): Promise<GitLabProject> {
    let {data: getProject} = await axios.get(
        `${serverUrl}/api/v4/projects/${encodeGroupProjectPath(project_id)}`,
        {headers: {"PRIVATE-TOKEN": config.codeRevue.gitlabApiToken}}
    );
    return getProject;
}

export { getGitLabProject };