import axios from 'axios';
import config from '../config';
import {GitLabCommit} from "../../../ports/outbound/types/GitLabCommit/GitLabCommit";
import {OutboundPorts} from "../../../ports/outbound/OutboundPorts";
import {encodeGroupProjectPath} from "./encodeGroupProjectPath";


async function getGitLabCommit(project_id: string | number, sha: string): Promise<GitLabCommit> {
    let {data: commit} = await axios.get(
        `${config.codeRevue.repoGitlab.gitlab.url}/api/v4/projects/${encodeGroupProjectPath(project_id)}/repository/commits/${sha}`,
        {headers: {"PRIVATE-TOKEN": config.codeRevue.repoGitlab.gitlab.apiToken}}
    );
    return commit;
}

// noinspection JSUnusedLocalSymbols
const variableToGuaranteeTheFunctionMatchesTheInterface: OutboundPorts['getGitLabCommit'] = getGitLabCommit;

export { getGitLabCommit };