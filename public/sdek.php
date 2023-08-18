<?php
$formData = file_get_contents('php://input');
$formDataDecode = json_decode($formData, true);

// ==================== Auth ==================== //

$authArray = array();
$authArray['grant_type']    = 'client_credentials';
$authArray['client_id']     = 'Th3qZUSqFEqvRyopUJoVTkfAqH25UkUo';
$authArray['client_secret'] = '09117SwsONyxUplIefJwMpIiJG6BDnYX';

$authData = curl_init('https://api.cdek.ru/v2/oauth/token?parameters');
curl_setopt($authData, CURLOPT_POST, 1);
curl_setopt($authData, CURLOPT_POSTFIELDS, http_build_query($authArray, '', '&')); 
curl_setopt($authData, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
curl_setopt($authData, CURLOPT_TIMEOUT, 30);
curl_setopt($authData, CURLOPT_RETURNTRANSFER, true);
curl_setopt($authData, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($authData, CURLOPT_HEADER, false);

$authHtml = curl_exec($authData);
curl_close($authData);
$auth = json_decode($authHtml, true);

$access_token = $auth['access_token'];

// ==================== Add request ==================== //

// Регистрация заявки
$array = array();
$array['comment'] = 'Тестовый заказ';
$array['type'] = 1;	// Договор "интернет-магазин"
$array['tariff_code'] = '136';
$array['number'] = ''; // НОМЕР_ЗАКАЗА_НА_ВАШЕМ_САЙТЕ	
$array['shipment_point'] = 'TOM10'; // КОД_ПВЗ_ОТГРУЗКИ
$array['delivery_point'] = $formDataDecode['delivery_point']; // КОД_ПВЗ_ПОЛУЧАТЕЛЯ
$array['delivery_recipient_cost'] = array(
  'value' => $formDataDecode['delivery_price']
);

$array['recipient'] = array(
	'name' => $formDataDecode['name'], // Имя получателя
	'phones' => array(
		'number' => $formDataDecode['phone'], // ТЕЛЕФОН_ПОЛУЧАТЕЛЯ
	),
	// 'address' => 'АДРЕС_ПОЛУЧАТЕЛЯ',
	// 'email'   => 'EMAIL_ПОЛУЧАТЕЛЯ',
);

$array['packages'][] = array(
  'number' => 1,
  'weight' => 500,
  'length' => 1,
  'width'  => 1,
  'height' => 1,
  'items'  => array(
    array(
      'name'     => 'Ленты',
      'ware_key' => '-',
      'payment'  => array(
        'value'  => $formDataDecode['price'],
      ),
      'cost'     => $formDataDecode['price'],
      'weight'   => 500,
      'amount'   => 1,
    )
  )
);

$array = json_encode($array, JSON_UNESCAPED_UNICODE);
$ch = curl_init('https://api.cdek.ru/v2/orders');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $array); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	'Content-Type: application/json', 
	'Authorization: Bearer ' . $access_token
));
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
$html = curl_exec($ch);
curl_close($ch);

$res = json_decode($html, true);
