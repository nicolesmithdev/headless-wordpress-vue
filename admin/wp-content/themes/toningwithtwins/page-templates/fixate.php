<?php
/**
 * Template Name: FIXATE
 */

/*
 * Customize sidebar
 */
remove_action('genesis_sidebar', 'genesis_do_sidebar');
add_action('genesis_sidebar', 'fixate_sidebar');
function fixate_sidebar() {
	echo do_shortcode( '[searchandfilter headings=",Categories,Containers,Dietary,Source" fields="search,recipe_cat,container,dietary,source" types=",checkbox,checkbox,checkbox,checkbox" hide_empty=",0,0,0,0" post_types="recipe" submit_label="Filter"]' );
}

// Remove the standard loop
remove_action('genesis_loop', 'genesis_do_loop');

// Customize the loop
add_action('genesis_loop', 'custom_loop');
function custom_loop() {
	global $post;

	// echo '<pre>'; print_r( $post ); echo '</pre>';

	echo '<article '; post_class(); echo '>';

		echo '<header class="entry-header">'; the_title('<h1 class="entry-title">', '</h1>'); echo '</header>';

		echo apply_filters('the_content', $post->post_content);

	echo '</article>';

	/*$applications = get_terms( array(
		'taxonomy' 		=> 'product_application',
		'parent'		=> 0,
		'hide_empty'	=> false
	) );

	// echo '<pre>'; print_r( $applications ); echo '</pre>';

	if ( !empty( $applications ) && !is_wp_error( $applications ) ) {

		echo '<ul class="product-applications">';

			foreach ( $applications as $application ) {

				$id = $application->term_id;

				$app_img 	= get_term_meta( $id, 'application_image', true );
				$headline	= get_term_meta( $id, 'headline', true );

				$image_url = ( $app_img ? $app_img : wc_placeholder_img_src() );				

				echo '<li><a href="' . get_term_link( $id ) . '">' . ( $app_img ? wp_get_attachment_image( $app_img, 'product-application-square' ) : wc_placeholder_img() ) . '<h2>' . $application->name . '</h2>' . ( !empty( $headline ) ? '<em>' . $headline . '</em>' : '' ) . '</a></li>';
			}

		echo '</ul>';
	}*/
}

// This file handles pages, but only exists for the sake of child theme forward compatibility.
genesis();
