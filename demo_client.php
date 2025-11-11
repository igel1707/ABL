<?php
$BASE = "http://localhost:3000";

function call($method, $url, $body=null, $query=[]) {
  $ch = curl_init();
  if (!empty($query)) $url .= '?' . http_build_query($query);
  curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $body ? json_encode($body) : null
  ]);
  $res = curl_exec($ch);
  if ($res === false) die(curl_error($ch));
  $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($status >= 400) die("HTTP $status: $res\n");
  return json_decode($res, true);
}

function pretty($title, $data) {
  echo "\n=== $title ===\n";
  echo json_encode($data, JSON_PRETTY_PRINT) . "\n";
}

// 1) Create space
$space = call('POST', "$BASE/spaces", [
  "name"=>"Main Hall L1", "location"=>"Campus A - Tower 1", "totalSeats"=>5
]);
pretty("Create Space", $space);
$spaceId = $space["id"];

// 2) Seed seats
pretty("Seed Seats", call('POST', "$BASE/spaces/$spaceId/seed"));

// 3) List AVAILABLE
$seats = call('GET', "$BASE/spaces/$spaceId/seats", null, ["status"=>"AVAILABLE"]);
pretty("List AVAILABLE Seats", $seats);
$seatId = $seats[0]["id"];

// 4) Lock
pretty("Lock Seat", call('POST', "$BASE/spaces/$spaceId/seats/$seatId/lock"));

// 5) Set RESERVED
pretty("Set RESERVED", call('PATCH', "$BASE/spaces/$spaceId/seats/$seatId/status", ["status"=>"RESERVED"]));

// 6) List RESERVED
pretty("List RESERVED Seats", call('GET', "$BASE/spaces/$spaceId/seats", null, ["status"=>"RESERVED"]));

echo "\n✅ Demo completed.\n";

// To run this demo, ensure the server is running on localhost:3000
// Then execute: & "C:\xampp\php\php.exe" .\demo_client.php