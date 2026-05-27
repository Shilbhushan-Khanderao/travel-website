const path = require('path');
const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const upload = multer(); // for parsing multipart/form-data (FormData without files)

// Serve static frontend files from the project root
app.use(express.static(path.join(__dirname)));

// Allow a simple health check
app.get('/ping', (req, res) => {
  res.json({ ok: true });
});

app.options('/send_request.php', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  return res.sendStatus(200);
});

app.post('/send_request.php', upload.none(), async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const {
    customerName = '',
    customerPhone = '',
    travelDate = '',
    travelTime = '',
    tripType = '',
    guests = '',
    customerMessage = ''
  } = req.body;

  function cleanInput(v) {
    return String(v || '').trim().replace(/\r|\n/g, ' ');
  }

  const name = cleanInput(customerName);
  const phone = cleanInput(customerPhone);
  const date = cleanInput(travelDate);
  const time = cleanInput(travelTime);
  const type = cleanInput(tripType);
  const numGuests = cleanInput(guests);
  const message = String(customerMessage || '').trim();

  if (!name || !phone || !date || !time || !type || !numGuests || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields before sending the request.' });
  }

  const recipientPhone = process.env.SMS_TO_NUMBER || '+919876543210';
  const fromPhone = process.env.SMS_FROM_NUMBER;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!fromPhone || !accountSid || !authToken) {
    return res.status(500).json({ success: false, message: 'SMS provider settings are missing. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SMS_FROM_NUMBER, and SMS_TO_NUMBER.' });
  }

  const smsBody = [
    'New travel enquiry',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Destination: ${type}`,
    `Travelers: ${numGuests}`,
    `Message: ${message}`
  ].join('\n');

  try {
    const twilio = require('twilio')(accountSid, authToken);
    const resp = await twilio.messages.create({ to: recipientPhone, from: fromPhone, body: smsBody });

    if (!resp || !resp.sid) {
      return res.status(500).json({ success: false, message: 'SMS could not be sent.' });
    }

    return res.json({ success: true, message: 'SMS sent successfully to the travel team.' });
  } catch (err) {
    console.error('Twilio error:', err && err.message ? err.message : err);
    return res.status(500).json({ success: false, message: (err && err.message) ? err.message : 'Unable to connect to the SMS provider.' });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
