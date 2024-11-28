const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

/**
 * Updates package.json with the new package version.
 */
async function updatePackageJson(packageName, packageVersion) {
    const filePath = path.resolve('./package.json');
    const packageJson = await fs.readJson(filePath);

    if (!packageJson.dependencies[packageName]) {
        throw new Error(`Package "${packageName}" not found in dependencies.`);
    }

    packageJson.dependencies[packageName] = packageVersion;
    await fs.writeJson(filePath, packageJson, { spaces: 2 });

    console.log(`Updated ${packageName} to version ${packageVersion} in package.json.`);
    return packageJson;
}

/**
 * Creates a pull request in Bitbucket.
 */
async function createPullRequest(repoDetails, auth, branchName, commitMessage) {
    const { workspace, repoSlug, baseBranch } = repoDetails;

    const prUrl = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repoSlug}/pullrequests`;

    const response = await axios.post(
        prUrl,
        {
            title: `Update dependencies`,
            source: { branch: { name: branchName } },
            destination: { branch: { name: baseBranch } },
            description: commitMessage,
        },
        {
            auth,
        }
    );

    return response.data.links.html.href;
}

/**
 * Main function to update package.json and create a PR.
 */
async function updateAndCreatePR(packageName, packageVersion, repoDetails, auth) {
    const branchName = `update-${packageName}-${packageVersion}`;
    const commitMessage = `chore: update ${packageName} to ${packageVersion}`;

    // Step 1: Update package.json
    await updatePackageJson(packageName, packageVersion);

    // Step 2: Push changes to Bitbucket
    console.log(`Creating pull request for branch: ${branchName}`);
    const prUrl = await createPullRequest(repoDetails, auth, branchName, commitMessage);

    return prUrl;
}

module.exports = {
    updateAndCreatePR,
};
