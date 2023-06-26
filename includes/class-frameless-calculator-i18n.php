<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://facebook.com/celso.malacas.jr
 * @since      1.0.0
 *
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/includes
 * @author     Celso Malacas Jr <celsomalacasjr@gmail.com>
 */
class Frameless_Calculator_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'frameless-calculator',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
