<?php

/**
 * Plugin Name:       Rewind Gutenblocks
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rewind-gutenblocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_rewind_blocks()
{
	register_block_type(__DIR__ . '/build/quick-links');

	register_block_type(__DIR__ . '/build/trusted-logos', array(
		'render_callback' => function ($attributes) {
			return get_dynamic_block($attributes, 'trusted-logos');
		}
	));

	register_block_type(__DIR__ . '/build/image-and-text');
	register_block_type(__DIR__ . '/build/wrapper-section');
}

add_action('init', 'create_rewind_blocks');

/**
 * A utility to get a php file for a block
 *
 * @param  array $attributes
 * @param  string $name
 * @return string
 */
function get_dynamic_block(array $attributes, string $name, string $content = ''): string
{
	$html = '';

	ob_start();

	include __DIR__ . '/dynamic-blocks/' . $name . '-frontend.php';

	$html = ob_get_contents();

	ob_end_clean();

	return $html;
}

/**
 * An api endpoint/function for getting default logos
 *
 * @param  bool $return
 * @return array|void
 */
function rw_header_trust_logos(bool $return = false)
{
	$client_logos_title = !empty(get_field('header_banner_logo_title', 'option')) ? get_field('header_banner_logo_title', 'option') : '';
	$client_logos = !empty(get_field('header_banner_logos', 'option')) ? get_field('header_banner_logos', 'option') : array();

	$stringified_images = array();

	foreach ($client_logos as $logo) {
		array_push($stringified_images, wp_get_attachment_image($logo, 'medium', false, array('class' => 'img-fluid')));
	}

	$res = array(
		'title' 		=> $client_logos_title,
		'logos' 		=> $stringified_images,
		'logo_ids' 		=> $client_logos,
	);

	if (!$return) {
		wp_send_json($res);
		wp_die();
	} else {
		return $res;
	}
}

add_action('wp_ajax_rw_header_trust_logos', 'rw_header_trust_logos');
