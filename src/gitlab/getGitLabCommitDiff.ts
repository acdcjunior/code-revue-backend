import axios from 'axios';
import {GitLabModifiedFile} from "./types/GitLabDiff/GitLabModifiedFile";
import {gitLabServerInfo} from "../coderevue/server-config";


export async function getGitLabCommitDiff(projectId: number | string, sha: string): Promise<GitLabModifiedFile[]> {
    const gitLabServer = await gitLabServerInfo();

    let url = `${gitLabServer.gitlabServerUrl}/api/v4/projects/${projectId}/repository/commits/${sha}/diff`;
    console.log(url);
    const {data: modifiedFiles} = await axios.get(
        url,
        {headers: {"PRIVATE-TOKEN": gitLabServer.gitlabApiToken}}
    );
    for (const modifiedFile of modifiedFiles) {
        if (modifiedFile.diff[0] === '@') {
            modifiedFile.diff = `--- a/${modifiedFile.old_path}\n+++ b/${modifiedFile.new_path}\n${modifiedFile.diff}`;
        }
    }
    return modifiedFiles;
}