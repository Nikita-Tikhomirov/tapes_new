<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать файл в "wp-config.php"
 * и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки базы данных
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://ru.wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

 define('WP_REST_API', true);

// ** Параметры базы данных: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define( 'DB_NAME', 'senya211_lenta' );

/** Имя пользователя базы данных */
define( 'DB_USER', '046013128_lenta' );

/** Пароль к базе данных */
define( 'DB_PASSWORD', '8Q]SuVN63b57' );

/** Имя сервера базы данных */
define( 'DB_HOST', 'localhost' );

/** Кодировка базы данных для создания таблиц. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Схема сопоставления. Не меняйте, если не уверены. */
define( 'DB_COLLATE', '' );

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу. Можно сгенерировать их с помощью
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}.
 *
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными.
 * Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '0!~+h@S,.sbeT[<eu<>4dr3QeVl>k|m5@_7P0QG}}(U]J{ya.{>tq=8RzG*7n#{x' );
define( 'SECURE_AUTH_KEY',  '/j9zCS*M<IkF9FVPgg}L?Z8Q2O4|&a&%C?_?O!*m$esnb_dI>8:D+IpuJB%Ncprv' );
define( 'LOGGED_IN_KEY',    '%#Xdf9eDdz$4{l<n!Q>R+;BT(z9wR)6u)/sw:ztkJL^#lVylnOB `mMHPpM<dDy&' );
define( 'NONCE_KEY',        'PgbjHMh/c}o{tn;4QSftTXXN2xn -MLDo$X9#Fj27=1DAlw.e1;]c`V:e/Rv(dQ/' );
define( 'AUTH_SALT',        '83mB#dkQBB%bp1BqG78Q#jz+j|PG5#}v)9eo8GC_%q3bdYdRL,f9(-42?fU^~UH7' );
define( 'SECURE_AUTH_SALT', 'mEYJa%#{%^U}=RIGj.h:I:w*gUD<MzP<{Mu*<lfw^[d5hbQ}MBJ[Oj~EY=qxTheu' );
define( 'LOGGED_IN_SALT',   'usp^clH&OI,%yqlUwHD&tW;$Q05vFs?x/@zs7:x{c+txv(dS?;Itn@NR*8s7@P1L' );
define( 'NONCE_SALT',       'Kgd./UxuhYplN<WLQoFtKvb1Tgx-oG!*oO[p`JSmK,~JASon+8?c;~19,w83_>cx' );

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в документации.
 *
 * @link https://ru.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Произвольные значения добавляйте между этой строкой и надписью "дальше не редактируем". */



/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Инициализирует переменные WordPress и подключает файлы. */
require_once ABSPATH . 'wp-settings.php';
