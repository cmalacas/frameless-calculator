<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://facebook.com/celso.malacas.jr
 * @since      1.0.0
 *
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/admin
 * @author     Celso Malacas Jr <celsomalacasjr@gmail.com>
 */
class Frameless_Calculator_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Frameless_Calculator_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Frameless_Calculator_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		//wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/frameless-calculator-admin.css', array(), $this->version, 'all' );

		wp_enqueue_style( $this->plugin_name, FRAMELESS_CALCULATOR_URL . 'dist/css/app.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Frameless_Calculator_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Frameless_Calculator_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, FRAMELESS_CALCULATOR_URL . 'dist/js/index.js', array( 'jquery'), $this->version, true);

		wp_localize_script( $this->plugin_name, 'qcAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/frameless-calculator-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function admin_menu() {

		global $menu, $submenu;

		add_menu_page( 'Frameless Glass', 'Frameless Glass', 'manage_options', 'frameless-calculator', array($this, 'load')); 

		add_submenu_page( 'frameless-calculator', 'Fixed Panel', 'Fixed Panel', 'manage_options', 'frameless-calculator-fixed-panel', array($this, 'fixedPanel') ); 

		add_submenu_page( 'frameless-calculator', 'Hinged Panel', 'Hinged Panel', 'manage_options', 'frameless-calculator-hinged-panel', array($this, 'hingedPanel') ); 

		add_submenu_page( 'frameless-calculator', 'Door Panel', 'Door Panel', 'manage_options', 'frameless-calculator-door-panel', array($this, 'doorPanel') ); 

		add_submenu_page( 'frameless-calculator', '90 Degree Bracket', '90 Degree Bracket', 'manage_options', 'frameless-calculator-90-degree-bracket', array($this, '_90DegreeBracket') ); 

		add_submenu_page( 'frameless-calculator', '180 Degree Bracket', '180 Degree Bracket', 'manage_options', 'frameless-calculator-180-degree-bracket', array($this, '_180DegreeBracket') ); 

		add_submenu_page( 'frameless-calculator', '180 Degree Wall To Glass Hinge', '180 Degree Wall To Glass Hinge', 'manage_options', 'frameless-calculator-180-degree-wall-to-glass-hinge', array($this, '_180DegreeWallToGlassHinge') ); 

		add_submenu_page( 'frameless-calculator', '90 Degree Wall To Glass Hinge', '90 Degree Wall To Glass Hinge', 'manage_options', 'frameless-calculator-90-degree-wall-to-glass-hinge', array($this, '_90DegreeWallToGlassHinge') ); 

		add_submenu_page( 'frameless-calculator', 'Door Knob', 'Door Knob', 'manage_options', 'frameless-calculator-door-knob', array($this, 'doorKnob') ); 

		add_submenu_page( 'frameless-calculator', 'Door Seal', 'Door Seal', 'manage_options', 'frameless-calculator-door-seal', array($this, 'doorSeal') ); 

		add_submenu_page( 'frameless-calculator', 'Glass Shelf Bracket', 'Glass Shelf Bracket', 'manage_options', 'frameless-calculator-glass-shelf-bracket', array($this, 'glassShelfBracket') ); 

		add_submenu_page( 'frameless-calculator', 'Glass Shelf', 'Glass Shelf', 'manage_options', 'frameless-calculator-glass-shelf', array($this, 'glassShelf') ); 

		add_submenu_page( 'frameless-calculator', 'Half Round Water Bar', 'Half Round Water Bar', 'manage_options', 'frameless-calculator-half-round-water-bar', array($this, 'halfRoundWaterBar') ); 

		add_submenu_page( 'frameless-calculator', 'Silicone', 'Silicone', 'manage_options', 'frameless-calculator-silicone', array($this, 'silicone') ); 

		add_submenu_page( 'frameless-calculator', 'Spatula', 'Spatula', 'manage_options', 'frameless-calculator-spatula', array($this, 'spatula') ); 

		add_submenu_page( 'frameless-calculator', '3mm Packers', '3mm Packers', 'manage_options', 'frameless-calculator-3mm-packers', array($this, '_3mmPackers') ); 

		add_submenu_page( 'frameless-calculator', '6mm Spade Porcelain Eater Drill', '6mm Spade Porcelain Eater Drill', 'manage_options', 'frameless-calculator-6mm-spade-porcelain-eater-drill', array($this, '_6mmSpadePorcelainEaterDrill') ); 
	}

	public function load() {

			include('partials/main.php');

	}

	public function fixedPanel() {

		include('partials/fixed-panel.php');

	}

	public function hingedPanel() {

		include('partials/hinged-panel.php');

	}

	public function doorPanel() {

		include('partials/door-panel.php');

	}

	public function _90DegreeBracket() {

		include('partials/90-degree-bracket.php');

	}

	public function _180DegreeBracket() {

		include('partials/180-degree-bracket.php');

	}

	public function DoorKnob() {

		include('partials/door-knob.php');

	}

	public function doorSeal() {

		include('partials/door-seal.php');

	}

	public function glassShelfBracket() {

		include('partials/glass-shelf-bracket.php');

	}

	public function glassShelf() {

		include('partials/glass-shelf.php');

	}

	public function halfRoundWaterBar() {

		include('partials/half-round-water-bar.php');

	}

	public function silicone() {

		include('partials/silicone.php');

	}

	public function spatula() {

		include('partials/spatula.php');

	}

	public function _3mmPackers() {

		include('partials/3mm-packers.php');

	}

	public function _6mmSpadePorcelainEaterDrill() {

		include('partials/6mm-spade-porcelain-eater-drill.php');

	}

	public function _180DegreeWallToGlassHinge() {

		include('partials/180-degree-wall-to-glass-hinge.php');

	}

	public function _90DegreeWallToGlassHinge() {

		include('partials/90-degree-wall-to-glass-hinge.php');

	}

	public function upload_csv() {

		global $wpdb;

		$file = $_FILES['file'];

		$target_file = plugin_dir_path( __FILE__ ) . 'partials/frameless.csv';

		$wpdb->get_results("TRUNCATE " . $wpdb->prefix . "frameless_products");

		if (move_uploaded_file( $file['tmp_name'], $target_file )) {

			$row = 1;

			if (($handle = fopen($target_file, "r")) !== FALSE) {
				
				while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
					
					if ( $row > 1 ) {

						list( $title, $category, $width, $code, $price ) = $data;

						$add = [
											'title' => $title,
											'category' => $category,
											'width' => $width,
											'code' => $code,
											'price' => $price

									];

						$wpdb->insert( $wpdb->prefix . 'frameless_products', $add);

					}
					
					$row += 1;
					
				}

				fclose($handle);
		
			}

		} else {

			echo "not uploaded";

		}

		$data['success'] = 1;
		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products");

		echo json_encode( $data );

		wp_die();

	}

	public function get_fixed_panel() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Fixed Panel'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_hinged_panel() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Hinge Panel'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_door_panel() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Door Panel'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_90_degree_bracket() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = '90 Degree Bracket'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_180_degree_bracket() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = '180 Degree Bracket'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_door_knob() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Door Knob'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_door_seal() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Door Seal'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_glass_shelf_bracket() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Glass Shelf Bracket'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_glass_shelf() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Glass Shelf'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_half_round_water_bar() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Half Round Water Bar'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_silicone() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Silicone'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_spatula() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Spatula'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_3mm_packers() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = '3mm Packers'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_6mm_spade_porcelain_eater_drill() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Spade Porcelain Eater Drill Bit'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_180_degree_wall_to_glass_hinge() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = '180 Degree Wall To Glass Hinge'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_90_degree_wall_to_glass_hinge() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = '90 Degree Wall To Glass Hinge'");

		echo json_encode( $data );

		wp_die();

	}

	public function get_panels() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products");

		echo json_encode( $data );

		wp_die();

	}

	public function add_values_to_order_item_meta( $item_id, $values ) {

		print_r( $values );


	}

	function custom_product_image( $_product_img, $cart_item, $cart_item_key ) {

		$a =  '<img src="'.$cart_item['image'].'" />';

    return $a;
	}

}
