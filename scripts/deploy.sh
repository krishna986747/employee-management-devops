#!/bin/bash

set -e

echo "========== DEPLOY START =========="

cd /home/jelastic/ROOT

echo "Fetching latest code..."
git fetch origin

echo "Resetting to GitHub..."
git reset --hard origin/main

echo "Installing dependencies..."
npm install

echo "Restarting application..."
pm2 restart app --update-env

pm2 save

echo "========== DEPLOY SUCCESS =========="

