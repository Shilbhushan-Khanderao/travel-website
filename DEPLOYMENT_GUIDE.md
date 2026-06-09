# Parmar Tour and Travels - Deployment Guide

This website has been fully optimized to run as a **Static Website**. This means it requires **no backend server** (no Node.js, no PHP) and can be hosted for completely free on global networks like Netlify. It is also fully SEO optimized and integrated with WhatsApp.

Follow these 6 simple steps to get your website live on your own custom domain.

---

### Step 1: Enable Free Email Notifications (Web3Forms)
Your website's booking form is set up to send an instant email to your inbox when a customer submits it, right before redirecting them to WhatsApp.
1. Go to [Web3Forms](https://web3forms.com/).
2. Enter your email address to "Create your Access Key".
3. Check your email for the key.
4. Open `js/main.js` in your project folder.
5. On **Line 156**, replace `"YOUR_WEB3FORMS_ACCESS_KEY_HERE"` with your actual key.

### Step 2: Enable Automated WhatsApp Notifications (CallMeBot)
If you want to receive a silent, automated WhatsApp notification on your phone every time a customer submits the form (in addition to the email):
1. Open WhatsApp on your phone.
2. Send a WhatsApp message to **+34 644 48 53 60** with the exact text: `I allow callmebot to send me messages`
3. The bot will instantly reply with your personal API Key.
4. Open `js/main.js` and paste that key on **Line 174** where it says `"YOUR_CALLMEBOT_API_KEY_HERE"`.

### Step 3: Buy Your Custom Domain
You need to purchase the name of your website (e.g., `parmartours.in`).
1. Go to a cheap registrar in India like **Hostinger**, **GoDaddy**, or **Namecheap**.
2. Buy the domain name you want. 
3. **DO NOT** buy a web hosting package. You only need the domain name (usually costs around ₹300 - ₹800 per year).

### Step 4: Push Your Code to GitHub
Netlify needs a place to read your code from. GitHub is the standard.
1. Create a free account at [GitHub](https://github.com/).
2. Create a new "Repository" (you can name it `travel-website`).
3. Open your terminal/PowerShell inside your `d:\Shil\Projects\travel\` folder.
4. Run the commands GitHub gives you to push your code. It will look like this:
   ```bash
   git remote add origin https://github.com/your-username/travel-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 5: Launch for Free on Netlify
Netlify will host your site for free and provide free SSL (HTTPS).
1. Go to [Netlify](https://www.netlify.com/) and click "Sign Up" using your GitHub account.
2. Once logged in, click **"Add new site"** and select **"Import an existing project"**.
3. Authorize GitHub and select your `travel-website` repository.
4. Click **"Deploy Site"**. 
5. Within 10 seconds, your site will be live on a temporary Netlify URL!

### Step 6: Connect Your Domain & Finalize SEO
1. In your Netlify dashboard, click **"Domain Management"** and then **"Add Custom Domain"**.
2. Enter the domain you bought in Step 2. Netlify will give you "Nameservers" (e.g., `dns1.p01.nsone.net`).
3. Log into Hostinger/GoDaddy, go to DNS settings, and paste those Netlify Nameservers. 
4. **Final SEO Step:** Open your code editor and do a "Find and Replace". Search for `https://yourdomain.com` and replace it with your actual domain (e.g., `https://parmartours.in`) across `index.html`, `contact.html`, `package.html`, `robots.txt`, and `sitemap.xml`. Commit and push to GitHub, and Netlify will update automatically!

---
**Congratulations!** Your high-speed, secure, and SEO-optimized travel business is now live.
