<?php
/*
 * Create "Resources" custom post type (CPT)
 */

add_action('init', 'create_post_type');
function create_post_type() {
	register_post_type( 'resource', array(
		'labels' => array(
			'name' => __( 'Resources' ),
			'singular_name' => __( 'Resource' ),
			'not_found' => __('No Resources found.'),
			'menu_name' => __('Resources'),
			'name_admin_bar' => __('Resource'),
			'parent_item_colon' => __(''),
			'all_items' => __('All Resources'),
			'add_new_item' => __('Add New Resource'),
			'new_item' => __('New Resource'),
			'edit_item' => __('Edit Resource'),
			'update_item' => __('Update Resource'),
			'view_item' => __('View Resource'),
			'search_items' => __('Search Resources'),
			'not_found_in_trash' => __('No Resources found in Trash'),
			'featured_image' => __('Featured image'),
			'set_featured_image' => __('Set featured image'),
			'remove_featured_image' => __('Remove featured image'),
			'use_featured_image' => __('Use as featured image')
		),
		'public' => true,
		'exclude_from_search' => true,
		'publicly_queryable' => false,
		'has_archive' => true,
		'menu_position' => 20,
		'menu_icon' => 'dashicons-book-alt',
		'supports' => array('title', 'editor', 'thumbnail'),
		'taxonomies' => array('resource_cat'),
	) );
}

/*
 * Register categories taxonomy for resources CPT
 */

add_action('init', 'resources_categories');
function resources_categories() {
	$labels = array(
		'name' => 'Categories',
		'singular_name' => 'Category',
		'menu_name' => 'Categories',
		'add_new_item'	=> 'Add New Category',
	);

	$args = array(
		'hierarchical'		=> true,
		'labels'			=> $labels,
		'show_ui'			=> true,
		'show_admin_column'	=> true,
		'query_var'			=> true,
		'show_in_menu'		=> true
	);

	register_taxonomy('resource_cat', array('resource'), $args);
}
?>