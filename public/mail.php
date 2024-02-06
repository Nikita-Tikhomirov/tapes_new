<?php

$formData = file_get_contents('php://input');

// Кому отправляем
// $to = 'tihomirov.pro@gmail.com';
$to = 'maytimelenta@mail.ru';

// Загружаем только ядро WordPress
define( 'WP_USE_THEMES', false );
require( 'wp-load.php' );

$number = get_option( 'number_of_slider_slides' );
$new_number = $number + 1;

update_option( 'number_of_slider_slides', $new_number, $autoload = null );

// Тема письма
$subject = "Заявка на заказ лент № $new_number";

// Само сообщение
$message = "Номер заказа: $new_number \n $formData";

$mailData = array(
  'post_title' => "Заявка на заказ лент № $new_number",
  'post_content' => wp_slash($message),
  'post_status' => 'publish',
  'post_author' => 1,
  'post_type' => 'request'
);

$new_mailData = wp_insert_post($mailData);

if ($new_mailData) {
  echo "Запись успешно сохранена с ID: " . $new_mailData;
} else {
  echo "Ошибка при сохранении записи ";
}

// Отправляем письмо
$sent_message = wp_mail( $to, $subject, $message);

if ( $sent_message ) {
  // Если сообщение успешно отправилось
  echo 'Всё чётко настроил, бро!';
} else {
  // Ошибки при отправке
  echo 'Где-то ты лоханулся знатно!';
}