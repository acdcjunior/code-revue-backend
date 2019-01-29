import {firestore} from "../db/db";
import {getAllUserKeys} from "./users";

export async function assignReviewers(projectId: string, commitId: string, branchName: string) {
    const reviewersRef = firestore.collection('commits-reviewers').doc(commitId);
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

export async function updateReviewers(projectId: string, commitId: string, branchName: string) {
    const reviewers = await getAssignedReviewers(projectId, branchName);
}

async function getAssignedReviewers(projectId: string, branchName: string): Promise<string[]> {
    const projectsReviewersRef = firestore.collection('projects-reviewers').doc(projectId);
    const projectsReviewers = await projectsReviewersRef.get();
    let reviewers = projectsReviewers.data().reviewers;
    return reviewers[Math.floor(Math.random()*reviewers.length)]; // picks a random reviewer
}

export async function createDefaultReviewers(projectId) {
    const projectReviewersRef = firestore.collection('projects-reviewers').doc(projectId);
    projectReviewersRef.set({
        reviewers: await getAllUserKeys()
    });
    console.log(`Added all users as possible system-auto-assignable reviewers of Project ${projectId}'s commits.`);
}