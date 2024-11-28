# Bitbucket PR Updater

A CLI tool to automate updates to `package.json` and create pull requests in Bitbucket.

## Project structure
```bash
bitbucket-pr-updater/
├── src/
│   ├── index.js          # Entry point for the CLI tool
│   ├── helpers.js        # Helper functions (e.g., API calls)
├── .env                  # Environment variables (ignored in Git)
├── .gitignore            # Ignore files like .env and node_modules
├── package.json          # Project metadata and CLI setup
├── README.md             # Instructions for using the tool
```

## Features

- Updates `package.json` with a specified package and version.
- Creates a new branch and a pull request in Bitbucket.
- Uses environment variables for configuration.

## Installation

```bash
npm install -g bitbucket-pr-updater
```

## Usage
```bash
BITBUCKET_USERNAME=your-username
BITBUCKET_PASSWORD=your-app-password
BITBUCKET_WORKSPACE=your-workspace
BITBUCKET_REPO_SLUG=your-repo-slug
BITBUCKET_BASE_BRANCH=main
```

## Run the CLI 
```bash
bitbucket-pr-updater <package-name> <version>
```

## Example
```bash
bitbucket-pr-updater @redocly/some-package 1.2.3
```

## Publish to npm 

```bash
npm login
npm publish
```

## Apply as dependency

### Install

```bash
npm install bitbucket-pr-updater --save-dev
```

### Add a script 
```bash
{
  "scripts": {
    "update-pr": "bitbucket-pr-updater @redocly/some-package 1.2.3"
  }
}
```

### Run the script
```bash
npm run update-pr
```