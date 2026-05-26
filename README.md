# Guide Request Form

This workspace has been simplified into a small customer-request landing page. A visitor fills in the form, and the guide receives a prepared email draft with the details.

## What changed

The homepage now focuses on a single request form, uses the existing photos from the template, and applies a new warm teal/orange visual style.

## Notes

The request form now posts to a PHP endpoint that sends SMS through Twilio. To test automatic delivery locally, serve the project through PHP or a web host and set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `SMS_FROM_NUMBER`, and `SMS_TO_NUMBER`.
