#!/bin/bash

# Post-create script for GitHub Codespaces
# This script runs after the dev container is created

set -e

echo "=========================================="
echo "Setting up University Research Collaboration Platform"
echo "=========================================="

# Update system packages
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Maven if not already installed
if ! command -v mvn &> /dev/null; then
    echo "📦 Installing Maven..."
    apt-get install -y maven
fi

# Java environment info
echo ""
echo "☕ Java Environment:"
java -version

echo ""
echo "🔨 Maven Environment:"
mvn -version

echo ""
echo "📱 Node Environment:"
node --version
npm --version

# Backend setup
echo ""
echo "=========================================="
echo "Setting up Backend (Spring Boot)"
echo "=========================================="
cd /workspaces/advance-oop-tests/backend

if [ -f pom.xml ]; then
    echo "🔧 Building backend with Maven..."
    mvn clean compile -DskipTests 2>&1 | tail -20
    echo "✅ Backend build completed!"
else
    echo "⚠️  pom.xml not found. Skipping backend build."
fi

# Frontend setup
echo ""
echo "=========================================="
echo "Setting up Frontend (React + TypeScript)"
echo "=========================================="
cd /workspaces/advance-oop-tests/frontend

if [ -f package.json ]; then
    echo "📦 Installing frontend dependencies..."
    npm install --legacy-peer-deps
    echo "✅ Frontend dependencies installed!"
else
    echo "⚠️  package.json not found. Skipping npm install."
fi

# Go back to root
cd /workspaces/advance-oop-tests

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "🚀 To start the application:"
echo ""
echo "  Backend (Spring Boot):"
echo "    cd backend && mvn spring-boot:run"
echo ""
echo "  Frontend (React):"
echo "    cd frontend && npm start"
echo ""
echo "📍 Application URLs:"
echo "  Backend API:  http://localhost:8080/api"
echo "  Frontend:     http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "  Backend:  backend/README.md"
echo "  Frontend: frontend/README.md"
echo ""
