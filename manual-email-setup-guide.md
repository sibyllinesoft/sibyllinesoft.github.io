# Manual Cloudflare Email Routing Setup Guide

If the automated script doesn't work due to API token permissions, you can set up email routing manually through the Cloudflare dashboard.

## Step 1: Enable Email Routing

1. Go to https://dash.cloudflare.com/
2. Click on your `sibylline.dev` domain
3. Go to **Email** → **Email Routing** in the left sidebar
4. Click **Get started** or **Enable Email Routing**
5. Cloudflare will automatically:
   - Create necessary MX records
   - Set up SPF records
   - Configure DMARC (optional)

## Step 2: Add Destination Email Address

1. In the Email Routing section, click **Destination addresses**
2. Click **Add destination address**
3. Enter your personal email address (where you want emails forwarded)
4. Click **Send verification email**
5. **Check your email and click the verification link**

## Step 3: Create Forwarding Rules

Create these forwarding rules:

### Rule 1: Contact Email
- **Rule name**: Contact Form Forwarding
- **When**: Custom field matches
- **Field**: `To` 
- **Value**: `contact@sibylline.dev`
- **Action**: Forward to your verified email address

### Rule 2: Hello Email  
- **Rule name**: Hello Forwarding
- **When**: Custom field matches
- **Field**: `To`
- **Value**: `hello@sibylline.dev` 
- **Action**: Forward to your verified email address

## Step 4: Update Nameservers (Final Step)

⚠️ **Only do this after email routing is fully configured!**

1. In Cloudflare, go to **DNS** → **Records**
2. Verify these records exist:
   - A records pointing to GitHub Pages IPs
   - CNAME for www pointing to sibyllinesoft.github.io
   - MX records for email routing (should be added automatically)

3. Note the Cloudflare nameservers (found in **DNS** tab):
   - Usually something like `aiden.ns.cloudflare.com`
   - And `beth.ns.cloudflare.com`

4. Go to Namecheap:
   - Login to your Namecheap account
   - Go to **Domain List** → **Manage** next to sibylline.dev
   - Go to **Nameservers** section
   - Change from **Namecheap BasicDNS** to **Custom DNS**
   - Enter the Cloudflare nameservers
   - Save changes

## Step 5: Wait and Test

1. **Wait 24-48 hours** for DNS propagation
2. **Test email forwarding**:
   - Send a test email to contact@sibylline.dev
   - Check that it arrives at your personal email
3. **Test website**:
   - Verify https://sibylline.dev still works
   - Check that GitHub Pages deployment still works

## Troubleshooting

**Email not forwarding?**
- Check that destination email is verified
- Verify forwarding rules are enabled
- Check Cloudflare Email Routing logs

**Website not working?**
- Check DNS records in Cloudflare
- Verify A records point to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

**Domain not resolving?**
- DNS changes can take 24-48 hours
- Use online DNS checking tools to verify propagation
- Check nameservers are correctly set at Namecheap

## Expected DNS Records After Setup

Your Cloudflare DNS should have:

```
Type    Name                Content
A       sibylline.dev       185.199.108.153
A       sibylline.dev       185.199.109.153  
A       sibylline.dev       185.199.110.153
A       sibylline.dev       185.199.111.153
CNAME   www                 sibyllinesoft.github.io
MX      sibylline.dev       (Cloudflare email routing MX records)
TXT     sibylline.dev       (SPF records for email)
```

## Benefits After Setup

✅ **Free email forwarding** with excellent spam filtering  
✅ **Enhanced security** with Cloudflare protection  
✅ **Better performance** with Cloudflare CDN  
✅ **Professional email addresses** (contact@sibylline.dev)  
✅ **Easy management** through Cloudflare dashboard  

Contact form emails from your website will now forward to your personal inbox automatically!