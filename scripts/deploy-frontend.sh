#!/bin/bash
# deploy-frontend.sh - Frontend deployment script

set -e  # Exit on any error

# Configuration variables
APP_NAME="famboard"
REPO_DIR="$HOME/apps"
FRONTEND_DIR="$REPO_DIR/frontend"
DEPLOY_DIR="/var/www/$APP_NAME/frontend"

echo "Deploying frontend..."

# Navigate to frontend directory
cd $FRONTEND_DIR

# Install dependencies and build
echo "Installing dependencies and building..."
npm ci
npm run build

# Create deployment directory
sudo mkdir -p $DEPLOY_DIR

# Copy build files
echo "Copying files to deployment directory..."
sudo rm -rf $DEPLOY_DIR/*  # Clean up previous deployment
sudo cp -r build/* $DEPLOY_DIR/

# Set proper permissions
sudo chown -R www-data:www-data $DEPLOY_DIR
sudo chmod -R 755 $DEPLOY_DIR

echo "Frontend deployment completed!"