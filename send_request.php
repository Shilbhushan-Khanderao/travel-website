<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

function clean_input($value) {
    $value = trim((string) $value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return $value;
}

$customerName = clean_input($_POST['customerName'] ?? '');
$customerPhone = clean_input($_POST['customerPhone'] ?? '');
$travelDate = clean_input($_POST['travelDate'] ?? '');
$travelTime = clean_input($_POST['travelTime'] ?? '');
$tripType = clean_input($_POST['tripType'] ?? '');
$guests = clean_input($_POST['guests'] ?? '');
$customerMessage = trim((string) ($_POST['customerMessage'] ?? ''));

if ($customerName === '' || $customerPhone === '' || $travelDate === '' || $travelTime === '' || $tripType === '' || $guests === '' || $customerMessage === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all fields before sending the request.'
    ]);
    exit;
}

$recipientPhone = getenv('SMS_TO_NUMBER') ?: '+919876543210';
$fromPhone = getenv('SMS_FROM_NUMBER');
$accountSid = getenv('TWILIO_ACCOUNT_SID');
$authToken = getenv('TWILIO_AUTH_TOKEN');

if (!$fromPhone || !$accountSid || !$authToken) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'SMS provider settings are missing. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SMS_FROM_NUMBER, and SMS_TO_NUMBER.'
    ]);
    exit;
}

$smsBody = implode("\n", [
    'New travel enquiry',
    'Name: ' . $customerName,
    'Phone: ' . $customerPhone,
    'Date: ' . $travelDate,
    'Time: ' . $travelTime,
    'Destination: ' . $tripType,
    'Travelers: ' . $guests,
    'Message: ' . $customerMessage,
]);

$payload = http_build_query([
    'To' => $recipientPhone,
    'From' => $fromPhone,
    'Body' => $smsBody,
]);

$ch = curl_init('https://api.twilio.com/2010-04-01/Accounts/' . rawurlencode($accountSid) . '/Messages.json');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_USERPWD, $accountSid . ':' . $authToken);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded',
]);

$response = curl_exec($ch);
$curlError = curl_error($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $curlError) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to connect to the SMS provider.'
    ]);
    exit;
}

$decoded = json_decode($response, true);

if ($statusCode < 200 || $statusCode >= 300) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $decoded['message'] ?? 'SMS could not be sent.'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'SMS sent successfully to the travel team.'
]);