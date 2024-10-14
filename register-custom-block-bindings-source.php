<?php
/**
 * Plugin Name:       Register Custom Block Bindings Source
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       register-custom-block-bindings-source
 *
 * @package CreateBlock
 */

function register_block_bindings_user_data_source() {
	register_block_bindings_source(
		'my-plugin/user-data',
		array(
			'label'              => _x( 'User Data', 'block bindings source' ),
			'get_value_callback' => '_block_bindings_user_data_get_value',
			'uses_context'       => array( 'postType', 'postAuthor' ),
		)
	);
}
add_action( 'init', 'register_block_bindings_user_data_source' );

function _block_bindings_user_data_get_value( array $source_args, $block_instance ) {
	// If no key or user slug argument is set, bail early.
	if ( ! isset( $source_args['key'] ) || ! isset( $source_args['userSlug'] ) ) {
		return null;
	}

	// Get the user by slug.
	$user = get_user_by( 'slug', $source_args['userSlug'] ) ?? get_user_by( 'id' );

	// Return null if the user is not found.
	if ( ! $user ) {
		return null;
	}

	// Return the data based on the key argument.
	switch ( $source_args['key'] ) {
		case 'name':
			return esc_html( $user->display_name );
		case 'description':
			return $user->description;
		case 'url':
			return esc_url( $user->user_url );
		case 'nickname':
			return esc_html( $user->nickname );
		default:
			return null;
	}
}

function theme_enqueue_scripts() {
	wp_enqueue_script(
		'register-custom-editor-script', // Handle for the script
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-core-data' ),
		'1.0',
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'theme_enqueue_scripts' );

// function register_custom_editor_source_register_block_bindings() {
// 	register_block_bindings_source(
// 		'register_custom_editor_source/custom-post-meta',
// 		array(
// 			'label'              => __( 'Custom Post Meta', 'register_custom_editor_source' ),
// 			'get_value_callback' => 'get_bindings_values',
// 			'uses_context'       => array( 'postType' ),
// 		)
// 	);
// }
// add_action( 'init', 'register_custom_editor_source_register_block_bindings' );