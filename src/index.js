#!/usr/bin/env node

require('dotenv').config(); // Load .env variables
const { updateAndCreatePR } = require('./helpers');

// Extract CLI arguments
const args = process.argv.slice(2);
const [packageName, packageVersion] = args;

if (!packageName || !packageVersion) {
    console.error('Usage: bitbucket-pr-updater <package-name> <version>');
    process.exit(1);
}

// Extract environment variables
const auth = {
    username: process.env.BITBUCKET_USERNAME,
    password: process.env.BITBUCKET_PASSWORD,
};

const repoDetails = {
    workspace: process.env.BITBUCKET_WORKSPACE,
    repoSlug: process.env.BITBUCKET_REPO_SLUG,
    baseBranch: process.env.BITBUCKET_BASE_BRANCH,
};

(async () => {
    try {
        const prUrl = await updateAndCreatePR(packageName, packageVersion, repoDetails, auth);
        console.log(`Pull request created successfully: ${prUrl}`);
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
