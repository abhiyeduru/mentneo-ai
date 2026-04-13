#!/bin/bash

# Mentneo AI - Push to GitHub Script
# This script will push your local repository to GitHub

echo "🚀 Mentneo AI - GitHub Push Setup"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required."
    exit 1
fi

REPO_NAME="mentneo-ai"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo ""
echo "📋 Steps to complete:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named: $REPO_NAME"
echo "3. Do NOT initialize with README, .gitignore, or license"
echo "4. Click 'Create repository'"
echo ""
read -p "Press Enter once you've created the repository on GitHub..."

echo ""
echo "🔗 Adding remote and pushing..."
echo ""

# Add remote
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

# Rename branch to main
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your repository is now on GitHub"
    echo ""
    echo "📍 Repository URL: $REPO_URL"
    echo ""
    echo "🎉 Next steps:"
    echo "   1. Visit: $REPO_URL"
    echo "   2. Share the link with your team"
    echo "   3. Clone on other machines: git clone $REPO_URL"
    echo ""
else
    echo ""
    echo "❌ Push failed. Make sure:"
    echo "   1. You have GitHub credentials configured"
    echo "   2. The repository exists on GitHub"
    echo "   3. You have push permissions"
    echo ""
    echo "Manual push command:"
    echo "   git remote add origin $REPO_URL"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi
