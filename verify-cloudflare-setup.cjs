#!/usr/bin/env node

/**
 * Cloudflare Setup Verification Script
 * Checks if domain is properly configured before email setup
 */

const https = require('https');

class CloudflareVerifier {
    constructor() {
        this.apiToken = process.env.CLOUDFLARE_API_TOKEN;
        this.domain = 'sibylline.dev';
        this.baseUrl = 'https://api.cloudflare.com/client/v4';
    }

    async makeRequest(method, endpoint) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl + endpoint);
            const options = {
                method,
                headers: {
                    'Authorization': `Bearer ${this.apiToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const req = https.request(url, options, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    try {
                        const response = JSON.parse(body);
                        if (response.success) {
                            resolve(response.result);
                        } else {
                            reject(new Error(`API Error: ${response.errors?.map(e => e.message).join(', ') || 'Unknown error'}`));
                        }
                    } catch (err) {
                        reject(new Error(`Parse Error: ${err.message}`));
                    }
                });
            });

            req.on('error', reject);
            req.end();
        });
    }

    async verifyToken() {
        console.log('🔑 Verifying API token...');
        try {
            const user = await this.makeRequest('GET', '/user/tokens/verify');
            console.log(`✅ Token valid! Status: ${user.status}`);
            return true;
        } catch (error) {
            console.error('❌ Token verification failed:', error.message);
            return false;
        }
    }

    async checkDomain() {
        console.log(`🌐 Checking domain: ${this.domain}`);
        try {
            const zones = await this.makeRequest('GET', '/zones');
            const zone = zones.find(z => z.name === this.domain);
            
            if (!zone) {
                console.error(`❌ Domain ${this.domain} not found in your Cloudflare account`);
                console.log('\n📋 To add your domain to Cloudflare:');
                console.log('1. Go to https://dash.cloudflare.com/');
                console.log('2. Click "Add site"');
                console.log(`3. Enter "${this.domain}"`);
                console.log('4. Follow the setup instructions');
                console.log('5. Update your nameservers at your domain registrar');
                return null;
            }
            
            console.log(`✅ Domain found: ${zone.name}`);
            console.log(`   Status: ${zone.status}`);
            console.log(`   Plan: ${zone.plan.name}`);
            console.log(`   Zone ID: ${zone.id}`);
            
            if (zone.status === 'active') {
                console.log('✅ Domain is active and ready for email routing');
            } else {
                console.log(`⚠️  Domain status is "${zone.status}" - may need nameserver configuration`);
            }
            
            return zone;
        } catch (error) {
            console.error('❌ Error checking domain:', error.message);
            return null;
        }
    }

    async checkDNSRecords(zoneId) {
        console.log('\n🔍 Checking DNS records...');
        try {
            const records = await this.makeRequest('GET', `/zones/${zoneId}/dns_records`);
            
            const aRecords = records.filter(r => r.type === 'A');
            const mxRecords = records.filter(r => r.type === 'MX');
            const cnameRecords = records.filter(r => r.type === 'CNAME');
            
            console.log(`Found ${records.length} DNS records:`);
            console.log(`  - ${aRecords.length} A records`);
            console.log(`  - ${mxRecords.length} MX records`);
            console.log(`  - ${cnameRecords.length} CNAME records`);
            
            if (mxRecords.length > 0) {
                console.log('\n📧 Existing MX records:');
                mxRecords.forEach(record => {
                    console.log(`  - ${record.name} → ${record.content} (priority: ${record.priority})`);
                });
                console.log('⚠️  Note: Email routing will replace existing MX records');
            } else {
                console.log('✅ No existing MX records - clean slate for email routing');
            }
            
            return records;
        } catch (error) {
            console.error('❌ Error checking DNS records:', error.message);
            return [];
        }
    }

    async run() {
        console.log('🔍 Cloudflare Setup Verification');
        console.log('================================\n');

        if (!this.apiToken) {
            console.error('❌ CLOUDFLARE_API_TOKEN environment variable not set');
            console.log('\nPlease set your API token:');
            console.log('export CLOUDFLARE_API_TOKEN="your_token_here"');
            process.exit(1);
        }

        console.log(`Domain: ${this.domain}`);
        console.log(`Token: ${this.apiToken.substring(0, 10)}...${this.apiToken.slice(-4)}\n`);

        // Verify token
        const tokenValid = await this.verifyToken();
        if (!tokenValid) {
            console.log('\n💡 Token issues might be due to:');
            console.log('- Incorrect token (copy/paste error)');
            console.log('- Insufficient permissions');
            console.log('- Token expired or revoked');
            process.exit(1);
        }

        // Check domain
        const zone = await this.checkDomain();
        if (!zone) {
            process.exit(1);
        }

        // Check DNS records
        await this.checkDNSRecords(zone.id);

        console.log('\n🎉 Verification complete!');
        console.log('\n✅ Ready to proceed with email routing setup');
        console.log('\nNext step: Run the email setup script:');
        console.log('node cloudflare-email-setup.js');
    }
}

// Run verification
if (require.main === module) {
    const verifier = new CloudflareVerifier();
    verifier.run().catch(error => {
        console.error('\n💥 Verification failed:', error.message);
        process.exit(1);
    });
}

module.exports = CloudflareVerifier;