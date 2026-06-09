# Parmar Tour and Travels

Premium cab services and tour packages across Northern India — Punjab, Himachal Pradesh, Haryana, J&K, Rajasthan & Chandigarh.

## Pages

- **Home** (`index.html`) — Hero section, booking form, vehicle showcase, destination carousels, and service highlights
- **Packages** (`package.html`) — Tour package details and pricing
- **Contact** (`contact.html`) — Contact information and enquiry form

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- Bootstrap 4.5 (CDN)
- Font Awesome 5 (CDN)
- Google Fonts (Poppins)

## How It Works

1. Customer fills in the booking form (name, phone, date, destination, cab preference, etc.)
2. Form data is formatted into a WhatsApp message and opens `wa.me` in a new tab
3. Optional: automated WhatsApp notification via CallMeBot API and email via Web3Forms

## Deployment

This is a static site — no build step required. Upload directly to any hosting provider.

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions covering Netlify, domain setup, and API key configuration.

## Configuration

Before going live, update these placeholders:

| Placeholder | File(s) | Description |
|-------------|---------|-------------|
| `yourdomain.com` | All HTML, `sitemap.xml`, `robots.txt` | Your actual domain |
| `YOUR_WEB3FORMS_ACCESS_KEY_HERE` | `js/main.js` | Free key from [web3forms.com](https://web3forms.com) |
| `YOUR_CALLMEBOT_API_KEY_HERE` | `js/main.js` | Free key from [callmebot.com](https://www.callmebot.com) |

## License

Private — Parmar Tour and Travels.
