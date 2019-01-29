import {firestore} from "../db/db";
import {formatBranchName} from "./formatBranchName";
import {getGitLabCommitDiff} from "../gitlab/getGitLabCommitDiff";
import {getGitLabCommit} from "../gitlab/getGitLabCommit";
import {assignReviewers, updateReviewers} from "./reviewers";

export async function processPossibleNewGitLabCommit(projectId: string, ref: string, commitId: string) {
    const branchName = formatBranchName(ref);

    const commitRef = firestore.collection('gitlab-commits').doc(commitId);

    const commitSnapshot = await commitRef.get();

    if (commitSnapshot.exists) {
        console.log(`GitLab commit ${commitId} exists. Updating branch.`);

        const branches = [...(commitSnapshot.data().branches || [])];
        if (!branches.includes(branchName)) {
            branches.push(branchName);
            await commitRef.update("branches", branches);
            console.log(`GitLab commit ${commitId} updated.`);
            await updateReviewers(projectId, commitId, branchName);
        } else {
            console.log(`GitLab commit ${commitId} already had ${branchName}. No need to update.`);
        }
    } else {
        const commit = await getGitLabCommit(projectId, commitId);
        const diffs = await getGitLabCommitDiff(projectId, commitId);
        await assignReviewers(projectId, commitId, branchName);
        await commitRef.set({...commit, branches: [branchName], diffs});
        console.log(`GitLab commit ${commitId} added.`);
    }

}