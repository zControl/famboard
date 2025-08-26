#!/bin/bash
# deploy.sh - Main deployment script

set -e  # Exit on any error

# Configuration variables
APP_NAME="famboard"
REPO_DIR="$HOME/apps"
DEPLOY_DIR="/var/www/$APP_NAME"
BRANCH="r2d2"

echo "Starting deployment of $APP_NAME..."

# Pull latest code
cd $REPO_DIR
git fetch
git checkout $BRANCH
git pull origin $BRANCH

# Run backend deployment
./deploy-backend.sh

# Run frontend deployment
./deploy-frontend.sh

echo "Deployment completed successfully!"