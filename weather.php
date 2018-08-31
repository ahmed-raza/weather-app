<?php
  require('config.php');

  date_default_timezone_set("Asia/Karachi");

  if (isset($_GET) && !empty($_GET))
    $city = $_GET['city'];
    $current = $_GET['current'];
    print_r(getReport($city, $current));

  function getReport($city, $current) {
    $appid              = APP_KEY;
    $endpoint_current   = "http://api.openweathermap.org/data/2.5/weather";
    $endpoint_forecast  = "http://api.openweathermap.org/data/2.5/forecast";
  
    $headers = [
      'Accept: application/json',
      'Content-Type: application/json'
    ];
    $ch = curl_init();
    if ($current == 'true'){
      curl_setopt($ch, CURLOPT_URL, $endpoint_current."?q=$city,pk&appid=$appid");
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
      $current_response = curl_exec($ch);
      curl_close($ch);
      $current_response = json_decode($current_response);
      $current_response->sys->sunset = date('h:i A', $current_response->sys->sunset);
      $current_response->sys->sunrise = date('h:i A', $current_response->sys->sunrise);
      $current_response->dt = date('d M, Y | h:i A', $current_response->dt);
      return json_encode($current_response);
    }

    curl_setopt($ch, CURLOPT_URL, $endpoint_forecast."?q=$city,pk&appid=$appid");
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  
    $forecast_response = curl_exec($ch);
    curl_close($ch);
    return $forecast_response;
  }
