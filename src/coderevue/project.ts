import {firestore} from "../db/db";
import {getGitLabProject} from "../gitlab/getGitLabProject";

class Project {
    "id": number; // 2
    "name": string; // "sample-project-java-maven",
    "description": string; // null,
    "web_url": string; // "http://c3prgitlab:8888/c3pr-bot/sample_user__sample-project-java-maven",
    "path_with_namespace": string; // "c3pr-bot/sample_user__sample-project-java-maven",
    "default_branch": string; // "master",
}

export async function guaranteeProjectExistsInDb(projectId) {

    const projectRef = firestore.collection('gitlab-projects').doc(projectId + '');
    const projectSnapshot = await projectRef.get();

    if (!projectSnapshot.exists) {
        console.log(`GitLab Project ${projectId} does not exist. Adding.`);
        const p = await getGitLabProject(projectId);
        await projectRef.set(p);
        console.log(`GitLab Project ${projectId} added.`);
    } else {
        console.log(`GitLab Project ${projectId} already existed.`);
    }

}