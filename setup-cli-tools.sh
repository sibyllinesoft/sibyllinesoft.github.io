#!/bin/bash

# CLI Tools Setup Script for Cloudflare and Namecheap
# This script helps configure authentication for automated domain management

echo "🚀 CLI Tools Setup for Domain and Email Management"
echo "=================================================="

# Create config directory
mkdir -p ~/.config/domain-automation

# Cloudflare Wrangler Setup
echo ""
echo "🌩️  Setting up Cloudflare CLI (Wrangler)"
echo "---------------------------------------"
echo "1. Go to https://dash.cloudflare.com/profile/api-tokens"
echo "2. Click 'Create Token'"
echo "3. Use 'Edit Cloudflare Workers' template or create custom token with:"
echo "   - Zone:Zone:Read (for your domain)"
echo "   - Zone:DNS:Edit (for DNS management)"
echo "   - Zone:Zone Settings:Edit (for email routing)"
echo "   - Zone:Zone:Edit (for email routing)"
echo ""
echo "4. Run: npx wrangler login"
echo "   OR"
echo "   Set CLOUDFLARE_API_TOKEN environment variable"
echo ""

# Namecheap Setup
echo "📧 Setting up Namecheap CLI"
echo "---------------------------"
echo "Requirements for Namecheap API access:"
echo "- Account balance of $50+ OR"
echo "- 20+ domains in account OR" 
echo "- $50+ in purchases in last 2 years"
echo ""
echo "Setup steps:"
echo "1. Go to https://ap.www.namecheap.com/settings/tools/apiaccess"
echo "2. Enable API access"
echo "3. Whitelist your IP address"
echo "4. Get your API key"
echo ""

# Get public IP for Namecheap whitelist
PUBLIC_IP=$(curl -s https://api.ipify.org)
echo "Your current public IP (for Namecheap whitelist): $PUBLIC_IP"
echo ""

# Namecheap config template
echo "Creating Namecheap config template..."
cat > ~/.config/domain-automation/namecheap-config.json << 'EOF'
{
  "apiUser": "YOUR_NAMECHEAP_USERNAME",
  "apiKey": "YOUR_NAMECHEAP_API_KEY",
  "ipAddress": "YOUR_WHITELISTED_IP",
  "sandbox": false
}
EOF

echo "✅ Created Namecheap config template at: ~/.config/domain-automation/namecheap-config.json"
echo ""

# Environment template
echo "Creating environment template..."
cat > ~/.config/domain-automation/env-template << 'EOF'
# Cloudflare Configuration
export CLOUDFLARE_API_TOKEN="your_cloudflare_api_token_here"
export CLOUDFLARE_ACCOUNT_ID="your_cloudflare_account_id_here"

# Namecheap Configuration  
export NAMECHEAP_API_USER="your_namecheap_username_here"
export NAMECHEAP_API_KEY="your_namecheap_api_key_here"
export NAMECHEAP_IP_ADDRESS="$PUBLIC_IP"

# Domain Configuration
export PRIMARY_DOMAIN="sibylline.dev"
export EMAIL_FORWARD_TO="your-personal-email@example.com"
EOF

echo "✅ Created environment template at: ~/.config/domain-automation/env-template"
echo ""

echo "📋 Next Steps:"
echo "=============="
echo "1. Complete Cloudflare API token setup"
echo "2. Complete Namecheap API access setup"
echo "3. Edit the config files with your actual credentials"
echo "4. Run the domain automation script"
echo ""
echo "🔐 Security Note:"
echo "Keep your API keys secure and never commit them to version control!"
echo ""

# Create automation script template
cat > ~/.config/domain-automation/domain-automation.js << 'EOF'
#!/usr/bin/env node

/**
 * Domain Automation Script
 * Handles DNS configuration and email routing setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load configuration
const configPath = path.join(process.env.HOME, '.config/domain-automation/namecheap-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('🚀 Starting domain automation...');

// Example functions (to be implemented)
async function setupCloudflareEmailRouting() {
    console.log('📧 Setting up Cloudflare Email Routing...');
    // Implementation will go here
}

async function transferDNSToCloudflare() {
    console.log('🌩️  Transferring DNS to Cloudflare...');
    // Implementation will go here
}

async function main() {
    try {
        console.log('Domain automation script ready!');
        console.log('Edit this file to add your automation logic.');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
EOF

chmod +x ~/.config/domain-automation/domain-automation.js

echo "✅ Created automation script template at: ~/.config/domain-automation/domain-automation.js"
echo ""
echo "Setup complete! 🎉"
echo ""
echo "To get started:"
echo "1. bash $PWD/setup-cli-tools.sh (you just ran this)"
echo "2. Follow the setup instructions above"
echo "3. Edit the config files with your credentials"
echo "4. Run: node ~/.config/domain-automation/domain-automation.js"