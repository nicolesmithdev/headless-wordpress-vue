<?php
/*
 * Plugin Name: Resources
 * Description: Custom programmed specifically for Toning With Twins, this plugin creates a custom post type of `resources`
 * Author: Nicole Smith
 * Author URI: https://nicolesmith.dev/
 * Version: 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load JavaScript in admin
function load_resource_scripts() {
	wp_enqueue_style(
		'twt-resources-css',
		plugins_url('style.css', __FILE__ )
	);
}
add_action('wp_enqueue_scripts', 'load_resource_scripts');

/*
 * Create custom post type
 */
require_once plugin_dir_path( __FILE__ ) . 'cpt.php';

/*
 * Create shortcode
 */
require_once plugin_dir_path( __FILE__ ) . 'shortcode.php';
?>