import axios from 'axios';
import config from '../config';
import {GitLabModifiedFile} from "./types/GitLabDiff/GitLabModifiedFile";


export async function getGitLabCommitDiff(serverUrl: string, projectId: number | string, sha: string): Promise<GitLabModifiedFile[]> {
    let url = `${serverUrl}/api/v4/projects/${projectId}/repository/commits/${sha}/diff`;
    //console.log(url);
    const {data: modifiedFiles} = await axios.get(
        url,
        {headers: {"PRIVATE-TOKEN": config.codeRevue.gitlabApiToken}}
    );
    for (const modifiedFile of modifiedFiles) {
        if (modifiedFile.diff[0] === '@') {
            modifiedFile.diff = `--- a/${modifiedFile.old_path}\n+++ b/${modifiedFile.new_path}\n${modifiedFile.diff}`;
        }
    }
    return modifiedFiles;
}