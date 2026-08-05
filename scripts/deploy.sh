#!/bin/bash

echo "========== DEPLOY START =========="

cd /home/jelastic/employee-management || exit 1

echo "Fetching latest code..."
git fetch origin

echo "Resetting to GitHub..."
git reset --hard origin/main

echo "Installing dependencies..."
npm install

echo "Restarting application..."
pm2 restart employee-management --update-env

echo "Saving PM2..."
pm2 save

echo "========== DEPLOY SUCCESS =========="
