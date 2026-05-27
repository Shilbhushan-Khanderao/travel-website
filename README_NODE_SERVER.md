Node.js server for send_request

This project adds a small Express server that replaces `send_request.php`.

Quick start

1. Open a terminal in the project root (`c:\Users\Vipul\Desktop\travelTemplate\One`).
2. Install dependencies:

```bash
npm install
```

3. Set environment variables (example):

Windows PowerShell:

```powershell
$env:TWILIO_ACCOUNT_SID = "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$env:TWILIO_AUTH_TOKEN = "your_auth_token"
$env:SMS_FROM_NUMBER = "+12025550123"
$env:SMS_TO_NUMBER = "+919876543210"
node server.js
```

Or create a `.env` file with:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
SMS_FROM_NUMBER=+12025550123
SMS_TO_NUMBER=+919876543210
PORT=8000
```

4. Run the server:

```bash
node server.js
```

5. Open http://127.0.0.1:8000/index.html and submit the form — the server exposes `POST /send_request.php` so your existing frontend needs no changes.

Notes
- If you prefer developing with auto-reload install `nodemon` and run `npm run dev`.
- Keep Twilio credentials secret. Use environment variables in production.
