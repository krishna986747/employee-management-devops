cd ~/employee-management-devops

cat > scripts/deploy.sh <<'EOF'
#!/bin/bash
set -e

echo "========== DEPLOY START =========="

cd /home/jelastic/employee-management-devops

echo "Fetching latest code..."
git fetch origin

echo "Resetting to GitHub..."
git reset --hard origin/main

echo "Installing dependencies..."
npm install

echo "Restarting application..."
pm2 restart employee-management --update-env

pm2 save

echo "========== DEPLOY SUCCESS =========="
EOF

chmod +x scripts/deploy.sh
