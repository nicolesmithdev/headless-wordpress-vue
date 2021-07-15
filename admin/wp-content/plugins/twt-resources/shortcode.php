<?php
/**
 * [resources]
 */
function resources_func($atts) {
	global $post;

	extract( shortcode_atts( array(
	), $atts ) );

	$categories = get_categories( array( 'taxonomy' => 'resource_cat' ) );

	$output = "";

	if ( !empty ( $categories ) ) {

		$output.= '<ul class="resource-cats">';

		foreach ( $categories as $cat ) {

			$output.= '<li><a href="#' . $cat->slug . '-resources">' . $cat->cat_name . '</a></li>';
		}

		$output.= '</ul>';

		foreach ( $categories as $cat ) {

			$output.= '<div id="' . $cat->slug . '-resources" class="resources">';

				$output.= '<h2 class="cat-name">' . $cat->cat_name . '</h2>';

				$query = "";
				$query = new WP_Query( array(
					'post_type'			=> 'resource',
					'post_status'		=> 'publish',
					'posts_per_page'	=> -1,
					'tax_query'			=> array(
						array(
							'taxonomy'	=> 'resource_cat',
							'field'		=> 'slug',
							'terms'		=> $cat->slug
						),
					),
					'order'				=> 'ASC',
					'orderby'			=> 'title'
				) );

				if ( $query->have_posts() ) {
					
					while ( $query->have_posts() ) : $query->the_post();

						$blogPost 		= get_post_meta( $post->ID, 'blog_post_url', true );
						$content		= get_the_content();
						$contentEcho	= strip_tags( $content, '<p> <a>');
						$sourceURL		= get_post_meta( $post->ID, 'resource_url', true );

						$output.= '<div class="resource">';

							$thumbnail = get_the_post_thumbnail_url( get_the_ID(), 'toningwithtwins-resource' );

							$output.= '<img src="' . ( $thumbnail ? $thumbnail : '' ) . '" alt=""/>';

							$output.= '<div>';

								$output.= '<strong>' . get_the_title() . '</strong>';

								$output.= $contentEcho;

								if ( $blogPost || $sourceURL ) {

									$output.= '<br />';

									if ( $blogPost ) {
										$output.= '<a href="' . esc_url( $blogPost ) . '" class="link">Read Blog Post</a>';
									}

									if ( $blogPost && $sourceURL ) {
										$output.= ' | ';
									}

									if ( $sourceURL ) {
										$output.= '<a href="' . esc_url( $sourceURL ) . '" class="link">Visit Website <span class="fa fa-external-link"></span></a>';
									}
								}

							$output.= '</div>';

						$output.= '</div>';

					endwhile;
				}

				$query = wp_reset_query();

			$output.= '</div>'; // <!-- .resources -->
		}
	}

	return $output;
}
add_shortcode('resources', 'resources_func');
?>