#!/bin/bash
# deploy-backend.sh - Backend deployment script

set -e  # Exit on any error

# Configuration variables
APP_NAME="famboard"
REPO_DIR="$HOME/apps"
BACKEND_DIR="$REPO_DIR/backend"
DEPLOY_DIR="/var/www/$APP_NAME/backend"

echo "Deploying backend..."

# Navigate to backend directory
cd $BACKEND_DIR

# Install dependencies and build
echo "Installing dependencies and building..."
npm ci
npm run build

# Create deployment directory
sudo mkdir -p $DEPLOY_DIR

# Copy build files
echo "Copying files to deployment directory..."
sudo cp -r dist/* $DEPLOY_DIR/
sudo cp package.json $DEPLOY_DIR/
sudo cp .env.production $DEPLOY_DIR/.env  # Assuming you have a production env file

# Install production dependencies in deployment directory
cd $DEPLOY_DIR
sudo npm ci --only=production

# Set proper permissions
sudo chown -R www-data:www-data $DEPLOY_DIR
sudo chmod -R 755 $DEPLOY_DIR

# Restart the service using PM2
echo "Restarting backend service..."
pm2 restart $APP_NAME-backend || pm2 start main.js --name "$APP_NAME-backend"
pm2 save

echo "Backend deployment completed!"