import {firestore} from "../db/db";

export async function assignReviewers(projectId: number, commitId: string, branchName: string) {
    const reviewersRef = firestore.collection('reviewers').doc(commitId);
    const assignedReviewers = await getAssignedReviewers(projectId, branchName);

    const reviewers = {};
    for (const assignedReviewer of assignedReviewers) {
        reviewers[assignedReviewer] = {
            user: assignedReviewer,
            status: 'assigned'
        }
    }
    await reviewersRef.set(reviewers);
}

export async function updateReviewers(projectId: number, commitId: string, branchName: string) {
    const reviewers = await getAssignedReviewers(projectId, branchName);
}

export function getAssignedReviewers(projectId: number, branchName: string): string[] {
    return ['acdcjunior@yo.io', 'bob@nelson.com']
}