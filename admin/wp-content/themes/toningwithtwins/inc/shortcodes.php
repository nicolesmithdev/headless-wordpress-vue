<?php
/**
 * [button]
 */
function button_func($atts) {
	extract( shortcode_atts( array(
		'url'	=> '#',
		'class'	=> '',
		'title'	=> 'Learn More'
	), $atts ) );

	return "<a href='{$url}' class='button {$class}'>{$title}</a>";
}
add_shortcode('button', 'button_func');

/**
 * [icon]
 */
function icon_func($atts) {
	extract( shortcode_atts( array(
		'icon' => '',
		'class' => ''
	), $atts ) );

	return "<span class='icon {$icon} {$class}'></span>";
}
add_shortcode('icon', 'icon_func');

/**
 * [latest_posts]
 */
function latest_posts_func($atts) {
	extract( shortcode_atts( array(
		'num' => 3
	), $atts) );

	$query = null;
	$query = new WP_Query( array(
		'post_type' => 'post',
		'post_status' => 'publish',
		'posts_per_page' => $num,
		'orderby' => 'date'
	) );

	$output = null;

	if($query->have_posts()) {
		$output.= '<div class="wp-block-columns latest-posts has-' . $num . '-columns columns">';
			while($query->have_posts()) : $query->the_post();
				global $post; 

				$output.= '<div class="wp-block-column post post-id-' . $post->ID . '">';
					$output.= '<a href="' . get_the_permalink() . '">';
						$output.= get_the_post_thumbnail($post->ID, 'blog-featured-image');
						$output.= '<strong>' . get_the_title() . '</strong>';
						$output.= wp_trim_words(get_the_excerpt(), '20');
					$output.= '</a>';
				$output.= '</div>';
			endwhile;
		$output.= '</div> <!-- .latest-posts -->';
	} else {
		$output.= "No posts to display";
	}

	return $output;

	$query = wp_reset_query();
}
add_shortcode('latest_posts', 'latest_posts_func');

/*
 * [recipe] ... [/recipe]
 */
function recipe_func($atts, $content = null) {
  return '<div class="recipe">' . do_shortcode($content) . '</div>';
}
add_shortcode('recipe', 'recipe_func');
?>