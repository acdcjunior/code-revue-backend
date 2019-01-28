export function formatBranchName(refsName: string): string {
    return refsName.replace(/\/?refs\/heads\//g, "");
}