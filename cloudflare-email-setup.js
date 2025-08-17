#!/usr/bin/env node

/**
 * Cloudflare Email Routing Setup Script
 * Automates the setup of email forwarding for sibylline.dev
 */

const https = require('https');
const readline = require('readline');

class CloudflareEmailSetup {
    constructor() {
        this.apiToken = process.env.CLOUDFLARE_API_TOKEN;
        this.domain = 'sibylline.dev';
        this.baseUrl = 'https://api.cloudflare.com/client/v4';
        this.zoneId = null;
    }

    async makeRequest(method, endpoint, data = null) {
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

            if (data) {
                req.write(JSON.stringify(data));
            }

            req.end();
        });
    }

    async findZoneId() {
        console.log(`🔍 Looking for zone: ${this.domain}`);
        try {
            const zones = await this.makeRequest('GET', '/zones');
            const zone = zones.find(z => z.name === this.domain);
            
            if (!zone) {
                throw new Error(`Domain ${this.domain} not found in your Cloudflare account. Please add it first.`);
            }
            
            this.zoneId = zone.id;
            console.log(`✅ Found zone: ${this.domain} (${this.zoneId})`);
            return this.zoneId;
        } catch (error) {
            console.error('❌ Error finding zone:', error.message);
            throw error;
        }
    }

    async checkEmailRouting() {
        console.log('\n📧 Checking Email Routing status...');
        try {
            const routing = await this.makeRequest('GET', `/zones/${this.zoneId}/email/routing`);
            console.log(`Email Routing status: ${routing.enabled ? '✅ Enabled' : '❌ Disabled'}`);
            console.log(`Email Routing name: ${routing.name || 'Not set'}`);
            return routing;
        } catch (error) {
            console.log('ℹ️  Email Routing not yet configured');
            return null;
        }
    }

    async enableEmailRouting() {
        console.log('\n🚀 Enabling Email Routing...');
        try {
            const result = await this.makeRequest('POST', `/zones/${this.zoneId}/email/routing/enable`, {
                enabled: true
            });
            console.log('✅ Email Routing enabled successfully!');
            return result;
        } catch (error) {
            console.error('❌ Error enabling Email Routing:', error.message);
            throw error;
        }
    }

    async listDestinations() {
        console.log('\n📬 Checking existing destination addresses...');
        try {
            const destinations = await this.makeRequest('GET', `/zones/${this.zoneId}/email/routing/addresses`);
            if (destinations.length > 0) {
                console.log('Existing destinations:');
                destinations.forEach(dest => {
                    console.log(`  - ${dest.email} (${dest.verified ? '✅ verified' : '❌ unverified'})`);
                });
            } else {
                console.log('No destination addresses configured yet.');
            }
            return destinations;
        } catch (error) {
            console.error('❌ Error listing destinations:', error.message);
            return [];
        }
    }

    async addDestination(email) {
        console.log(`\n📧 Adding destination: ${email}`);
        try {
            const result = await this.makeRequest('POST', `/zones/${this.zoneId}/email/routing/addresses`, {
                email: email
            });
            console.log(`✅ Destination added! Verification email sent to ${email}`);
            console.log('🔔 Please check your email and click the verification link');
            return result;
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log(`ℹ️  Destination ${email} already exists`);
                return null;
            }
            console.error('❌ Error adding destination:', error.message);
            throw error;
        }
    }

    async listRules() {
        console.log('\n📋 Checking existing forwarding rules...');
        try {
            const rules = await this.makeRequest('GET', `/zones/${this.zoneId}/email/routing/rules`);
            if (rules.length > 0) {
                console.log('Existing rules:');
                rules.forEach(rule => {
                    console.log(`  - ${rule.name}: ${rule.matchers[0]?.field}="${rule.matchers[0]?.value}" → ${rule.actions[0]?.value.join(', ')}`);
                });
            } else {
                console.log('No forwarding rules configured yet.');
            }
            return rules;
        } catch (error) {
            console.error('❌ Error listing rules:', error.message);
            return [];
        }
    }

    async createForwardingRule(fromEmail, toEmail, name) {
        console.log(`\n🔄 Creating forwarding rule: ${fromEmail} → ${toEmail}`);
        try {
            const result = await this.makeRequest('POST', `/zones/${this.zoneId}/email/routing/rules`, {
                name: name,
                enabled: true,
                matchers: [{
                    type: "literal",
                    field: "to",
                    value: fromEmail
                }],
                actions: [{
                    type: "forward",
                    value: [toEmail]
                }]
            });
            console.log(`✅ Forwarding rule created: ${fromEmail} → ${toEmail}`);
            return result;
        } catch (error) {
            console.error('❌ Error creating forwarding rule:', error.message);
            throw error;
        }
    }

    async setupComplete() {
        console.log('\n🎉 Email Routing setup complete!');
        console.log('\n📋 Summary:');
        console.log(`Domain: ${this.domain}`);
        console.log('Email addresses configured:');
        console.log('  - contact@sibylline.dev');
        console.log('  - hello@sibylline.dev');
        console.log('\n⚠️  Important:');
        console.log('1. Check your destination email for verification messages');
        console.log('2. Click all verification links to activate forwarding');
        console.log('3. Test by sending emails to contact@sibylline.dev');
        console.log('4. Your website contact forms will work once verification is complete');
    }

    async run() {
        console.log('🚀 Cloudflare Email Routing Setup');
        console.log('==================================\n');

        if (!this.apiToken) {
            console.error('❌ CLOUDFLARE_API_TOKEN environment variable not set');
            console.log('\nPlease set your API token:');
            console.log('export CLOUDFLARE_API_TOKEN="your_token_here"');
            console.log('\nOr create one at: https://dash.cloudflare.com/profile/api-tokens');
            process.exit(1);
        }

        try {
            // Step 1: Find the zone
            await this.findZoneId();

            // Step 2: Check email routing status
            const routingStatus = await this.checkEmailRouting();

            // Step 3: Enable email routing if not enabled
            if (!routingStatus || !routingStatus.enabled) {
                await this.enableEmailRouting();
            }

            // Step 4: Check existing destinations
            const destinations = await this.listDestinations();

            // Step 5: Get destination email from user
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const destinationEmail = await new Promise(resolve => {
                rl.question('\n📧 Enter your personal email address (where emails should be forwarded): ', resolve);
            });

            rl.close();

            // Step 6: Add destination if not exists
            const existingDest = destinations.find(d => d.email === destinationEmail);
            if (!existingDest) {
                await this.addDestination(destinationEmail);
            } else {
                console.log(`ℹ️  Destination ${destinationEmail} already configured (${existingDest.verified ? 'verified' : 'unverified'})`);
            }

            // Wait for user to verify if needed
            if (!existingDest || !existingDest.verified) {
                await new Promise(resolve => {
                    const rl2 = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    rl2.question('\n⏳ Please verify your email address first, then press Enter to continue...', () => {
                        rl2.close();
                        resolve();
                    });
                });
            }

            // Step 7: Check existing rules
            const rules = await this.listRules();

            // Step 8: Create forwarding rules
            const emailAddresses = [
                { from: 'contact@sibylline.dev', name: 'Contact Form Forwarding' },
                { from: 'hello@sibylline.dev', name: 'Hello Forwarding' }
            ];

            for (const email of emailAddresses) {
                const existingRule = rules.find(r => 
                    r.matchers[0]?.value === email.from
                );

                if (!existingRule) {
                    await this.createForwardingRule(email.from, destinationEmail, email.name);
                } else {
                    console.log(`ℹ️  Rule for ${email.from} already exists`);
                }
            }

            // Step 9: Setup complete
            await this.setupComplete();

        } catch (error) {
            console.error('\n❌ Setup failed:', error.message);
            process.exit(1);
        }
    }
}

// Run the setup if this script is executed directly
if (require.main === module) {
    const setup = new CloudflareEmailSetup();
    setup.run();
}

module.exports = CloudflareEmailSetup;