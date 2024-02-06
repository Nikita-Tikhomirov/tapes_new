<?php
	// require get_template_directory() . '/functions/styles.php';

	// require get_template_directory() . '/functions/start_config.php';
	// require get_template_directory() . '/functions/scripts.php';
	// require get_template_directory() . '/functions/custom_post_types.php';
	// require get_template_directory() . '/functions/acf_grid_posts_block.php';
	// require get_template_directory() . '/functions/register_menu.php';
	// require get_template_directory() . '/functions/fn_get_posts.php';
	// require get_template_directory() . '/functions/breadcrumbs.php';
	// require get_template_directory() . '/functions/init_comments.php';
	// require get_template_directory() . '/functions/init_pagination.php';

if( function_exists('acf_add_options_page') ) { 
    acf_add_options_page(array(
		'page_title' 	=> 'Цены на ленты',
		'menu_title'	=> 'Цены на ленты',
		'menu_slug' 	=> 'acf-options',
		'icon_url' 	=> 'dashicons-edit-page',
		'redirect'		=> false
	));
}

add_filter( 'use_block_editor_for_post', '__return_false', 10 );
add_theme_support( 'post-thumbnails' );

add_action( 'admin_menu', 'edit_admin_menus' );

function edit_admin_menus() {
	global $menu;
	global $submenu;
	$menu[5][0] = 'Аксессуары';
		$submenu['edit.php'][5][0] = 'Все аксессуары';
		$submenu['edit.php'][10][0] = 'Добавить аксессуар';
}

// add_action("admin_menu", "remove_menus");

function remove_menus() {
  // remove_menu_page("index.php");                # Консоль
  // remove_menu_page("edit.php");                 # Записи
  remove_submenu_page("edit.php", "edit-tags.php?taxonomy=post_tag"); # «Записи» - «Метки»
	remove_submenu_page("edit.php", "edit-tags.php?taxonomy=category"); # «Записи» - «Рубрики»
  remove_menu_page("edit-comments.php");        # Комментарии
  remove_menu_page("edit.php?post_type=page");  # Страницы
  // remove_menu_page("upload.php");               # Медиафайлы
  remove_menu_page("themes.php");               # Внешний вид
  remove_menu_page("plugins.php");              # Плагины
  remove_menu_page("users.php");                # Пользователи
  remove_menu_page("tools.php");                # Инструменты
  remove_menu_page("options-general.php");      # Параметры
  remove_menu_page("edit.php?post_type=acf-field-group"); # ACF
}

// ---------------------------------------------------- //

class trueOptionsPage {
 
	public $page_slug;
	public $option_group;
 
	function __construct() {
		// это у нас используется много где, поэтому давайте вынесем как отдельное свойство
		$this->page_slug = 'true_slider';
		$this->option_group = 'true_slider_settings';
 
		add_action( 'admin_menu', array( $this, 'add' ), 25 );
		add_action( 'admin_init', array( $this, 'settings' ) );
		add_action( 'admin_notices', array( $this, 'notice' ) );
 
	}
 
	function add(){
		add_menu_page( 'Номер заказа', 'Номер заказа', 'manage_options', $this->page_slug, array( $this, 'display' ), 'dashicons-images-alt2', 20 );
	}

	function display() {
		echo '<div class="wrap">
			<h1>' . get_admin_page_title() . '</h1>
			<form method="post" action="options.php">';
 
			settings_fields( $this->option_group );
			do_settings_sections( $this->page_slug );
			submit_button(); 
 
		echo '</form></div>';
	}

	function settings(){
		register_setting( $this->option_group, 'number_of_slider_slides', 'absint' );
		add_settings_section( 'slider_settings_section_id', '', '', $this->page_slug );
		add_settings_field(
			'number_of_slider_slides',
			'Номер заказа',
			array( $this, 'field' ),
			$this->page_slug,
			'slider_settings_section_id',
			array(
				'label_for' => 'number_of_slider_slides',
				'class' => 'misha-class',
				'name' => 'number_of_slider_slides',
			)
		);
	}

	function field( $args ){
		// получаем значение из базы данных
		$value = get_option( $args[ 'name' ] );

		printf(
			'<input type="number" min="1" id="%s" name="%s" value="%s" />',
			esc_attr( $args[ 'name' ] ),
			esc_attr( $args[ 'name' ] ),
			absint( $value )
		);
 
	}

	function notice() {
		if(
			isset( $_GET[ 'page' ] )
			&& $this->page_slug == $_GET[ 'page' ]
			&& isset( $_GET[ 'settings-updated' ] )
			&& true == $_GET[ 'settings-updated' ]
		) {
			echo '<div class="notice notice-success is-dismissible"><p>Номер сохранён!</p></div>';
		}
	}
}

new trueOptionsPage();

// ---------------------------------------------------- //

use PHPMailer\PHPMailer\PHPMailer;
 
/**
 * Настройка SMTP
 *
 * @param PHPMailer $phpmailer объект мэилера
 */
function mihdan_send_smtp_email( PHPMailer $phpmailer ) {
  $phpmailer->isSMTP();
  $phpmailer->Host       = SMTP_HOST;
  $phpmailer->SMTPAuth   = SMTP_AUTH;
  $phpmailer->Port       = SMTP_PORT;
  $phpmailer->Username   = SMTP_USER;
  $phpmailer->Password   = SMTP_PASS;
  $phpmailer->SMTPSecure = SMTP_SECURE;
  $phpmailer->From       = SMTP_FROM;
  $phpmailer->FromName   = SMTP_NAME;
}
add_action( 'phpmailer_init', 'mihdan_send_smtp_email' );