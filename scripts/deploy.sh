#!/bin/bash
set -e

echo "========== DEPLOY START =========="

cd /home/jelastic/employee-management

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm install

echo "Restarting application..."
pm2 restart employee-management

echo "Saving PM2 configuration..."
pm2 save

echo "========== DEPLOY SUCCESS =========="
