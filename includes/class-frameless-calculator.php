<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://facebook.com/celso.malacas.jr
 * @since      1.0.0
 *
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/includes
 * @author     Celso Malacas Jr <celsomalacasjr@gmail.com>
 */
class Frameless_Calculator {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Frameless_Calculator_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'FRAMELESS_CALCULATOR_VERSION' ) ) {
			$this->version = FRAMELESS_CALCULATOR_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'frameless-calculator';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Frameless_Calculator_Loader. Orchestrates the hooks of the plugin.
	 * - Frameless_Calculator_i18n. Defines internationalization functionality.
	 * - Frameless_Calculator_Admin. Defines all hooks for the admin area.
	 * - Frameless_Calculator_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-frameless-calculator-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-frameless-calculator-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-frameless-calculator-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-frameless-calculator-public.php';

		$this->loader = new Frameless_Calculator_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Frameless_Calculator_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Frameless_Calculator_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Frameless_Calculator_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		$this->loader->add_action( 'admin_menu', $plugin_admin, 'admin_menu' );

		$this->loader->add_action("wp_ajax_upload_csv", $plugin_admin, 'upload_csv');

		$this->loader->add_action("wp_ajax_get_fixed_panel", $plugin_admin, 'get_fixed_panel');

		$this->loader->add_action("wp_ajax_get_hinged_panel", $plugin_admin, 'get_hinged_panel');

		$this->loader->add_action("wp_ajax_get_door_panel", $plugin_admin, 'get_door_panel');

		$this->loader->add_action("wp_ajax_get_90_degree_bracket", $plugin_admin, 'get_90_degree_bracket');

		$this->loader->add_action("wp_ajax_get_180_degree_bracket", $plugin_admin, 'get_180_degree_bracket');

		$this->loader->add_action("wp_ajax_get_door_knob", $plugin_admin, 'get_door_knob');

		$this->loader->add_action("wp_ajax_get_door_seal", $plugin_admin, 'get_door_seal');

		$this->loader->add_action("wp_ajax_get_glass_shelf_bracket", $plugin_admin, 'get_glass_shelf_bracket');

		$this->loader->add_action("wp_ajax_get_glass_shelf", $plugin_admin, 'get_glass_shelf');

		$this->loader->add_action("wp_ajax_get_half_round_water_bar", $plugin_admin, 'get_half_round_water_bar');

		$this->loader->add_action("wp_ajax_get_silicone", $plugin_admin, 'get_silicone');

		$this->loader->add_action("wp_ajax_get_spatula", $plugin_admin, 'get_spatula');

		$this->loader->add_action("wp_ajax_get_3mm_packers", $plugin_admin, 'get_3mm_packers');

		$this->loader->add_action("wp_ajax_get_6mm_spade_porcelain_eater_drill", $plugin_admin, 'get_6mm_spade_porcelain_eater_drill');

		$this->loader->add_action("wp_ajax_get_180_degree_wall_to_glass_hinge", $plugin_admin, 'get_180_degree_wall_to_glass_hinge');

		$this->loader->add_action("wp_ajax_get_90_degree_wall_to_glass_hinge", $plugin_admin, 'get_90_degree_wall_to_glass_hinge');

		$this->loader->add_action("wp_ajax_get_panels", $plugin_admin, 'get_panels');

		$this->loader->add_action('woocommerce_add_order_item_meta', $plugin_admin, 'add_values_to_order_item_meta',1,2);

		add_filter( 'woocommerce_cart_item_thumbnail', array( $plugin_admin, 'custom_product_image' ), 10, 3 );


	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Frameless_Calculator_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		add_shortcode('fixed-panel-shower-screen', array($plugin_public, 'fixed_panel_shower_screen'));

		add_shortcode('2-x-panel-inline-screen', array($plugin_public, '_2_x_panel_inline_screen'));

		add_shortcode('2-x-panel-inline-screen-hinge-panel-door', array($plugin_public, '_2_x_panel_inline_screen_hinge_panel_door'));

		add_shortcode('3-x-panel-square-front-and-return-screen-hinge-panel-door-fixed-panel', array($plugin_public, '_3_x_panel_square_front_and_return_screen_hinge_panel_door_fixed_panel'));

		add_shortcode('3-panel-inline-screen-hinge-panel-door-fixed-panel', array($plugin_public, '_3_panel_inline_screen_hinge_panel_door_fixed_panel'));

		
		$this->loader->add_action("wp_ajax_get_frontend_fixed_panel", $plugin_public, 'get_fixed_panels');		
		$this->loader->add_action("wp_ajax_nopriv_get_frontend_fixed_panel", $plugin_public, 'get_fixed_panels');

		$this->loader->add_action("wp_ajax_add-to-cart", $plugin_public, 'add_to_cart');		
		$this->loader->add_action("wp_ajax_nopriv_add-to-cart", $plugin_public, 'add_to_cart');

		$this->loader->add_action( 'woocommerce_before_calculate_totals', $plugin_public, 'custom_price' );

		add_filter( 'woocommerce_get_item_data', array($plugin_public, 'customizing_cart_item_data'), 10, 2 );
		add_filter( 'woocommerce_cart_item_name', array( $plugin_public, 'customizing_cart_item_name'), 20, 3);

		$this->loader->add_action("wp_ajax_get_2x_panel_inline_screen", $plugin_public, 'get_2x_panel_inline_screen');		
		$this->loader->add_action("wp_ajax_nopriv_get_2x_panel_inline_screen", $plugin_public, 'get_2x_panel_inline_screen');

		add_filter( 'woocommerce_cart_item_thumbnail', array( $plugin_public, 'custom_product_image' ), 10, 3 );

	}

	public function load_calculator_after_shop() {
		echo do_shortcode('[frameless-calculator]');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Frameless_Calculator_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
