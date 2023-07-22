<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://facebook.com/celso.malacas.jr
 * @since      1.0.0
 *
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Frameless_Calculator
 * @subpackage Frameless_Calculator/public
 * @author     Celso Malacas Jr <celsomalacasjr@gmail.com>
 */
class Frameless_Calculator_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}


	public function fixed_panel_shower_screen() {

		include('partials/fixed-panel-shower-screen.php');

	}

	public function _2_x_panel_inline_screen() {

		include('partials/2_x_panel_inline_screen.php');

	}

	public function _2_x_panel_inline_screen_hinge_panel_door() {

		include('partials/2_x_panel_inline_screen_hinge_panel_door.php');

	}

	public function _3_x_panel_square_front_and_return_screen_hinge_panel_door_fixed_panel() {

		include('partials/3_x_panel_square_front_and_return_screen_hinge_panel_door_fixed_panel.php');

	}

	public function _3_panel_inline_screen_hinge_panel_door_fixed_panel() {

		include('partials/3_panel_inline_screen_hinge_panel_door_fixed_panel.php');

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		//wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/frameless-calculator-public.css', array(), $this->version, 'all' );

		wp_enqueue_style( $this->plugin_name, FRAMELESS_CALCULATOR_URL . 'dist/css/app.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		wp_enqueue_script( $this->plugin_name, FRAMELESS_CALCULATOR_URL . 'dist/js/frontend.js', array( 'jquery'), $this->version, true);

		wp_localize_script( $this->plugin_name, 'qcAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/frameless-calculator-public.js', array( 'jquery' ), $this->version, false );

	}

	public function get_fixed_panels() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  * FROM " . $wpdb->prefix . "frameless_products WHERE category = 'Fixed Panel'");

		$data['brackets_90'] = $wpdb->get_results("SELECT  *, LOWER(REPLACE(title, ' ', '-')) as slug FROM " . $wpdb->prefix . "frameless_products WHERE category LIKE '%90 Degree Wall Bracket%' GROUP BY code ORDER BY FIELD(title, 'Polished Chrome', 'Bruched Nickel', 'Black', 'Polished Gold', 'Brushed Gold', 'Brushed Brass')");

		$data['brackets_180'] = $wpdb->get_results("SELECT  *, LOWER(REPLACE(title, ' ', '-')) as slug FROM " . $wpdb->prefix . "frameless_products WHERE category LIKE '%180 Degree Wall Bracket%' GROUP BY code ORDER BY FIELD(title, 'Polished Chrome', 'Brushed Nickel', 'Black', 'Satin Chrome' )");

		$data['extras'] = $wpdb->get_results("SELECT ".$wpdb->prefix."frameless_products.*, (SELECT GROUP_CONCAT(CONCAT(title,':',price, ':', LOWER(REPLACE(title, ' ', '-')), ':', code ) SEPARATOR ',') FROM ".$wpdb->prefix."frameless_products p2 WHERE p2.category = ".$wpdb->prefix."frameless_products.category ) as variants FROM " . $wpdb->prefix . "frameless_products WHERE category in ('Glass Shelf', 'SILICON SPATULA', 'Silicone Tube', 'Spade Porcelain Eater Drill Bit', 'Door Seal', 'Shelf Bracket / Floor Bracket', '3MM PACKERS') GROUP BY category");


		

		echo json_encode( $data );

		wp_die();

	}

	public function add_to_cart() {

		global $woocommerce, $wpdb;

		$productID = 24363;

		$product = wc_get_product( $productID );

		$attributes = $product->get_attributes();

		$quantity = $_POST['quantity'];

		$attributes = [];

		if ( $_POST['product'] == 'Fixed Panel') {

			$productID = 3312;

			$width = $_POST['width'];
			$price = $_POST['price'];
			$code = $_POST['code'];
			$image = $_POST['image'];
			$showerWidth = $_POST['showerWidth'];

			$attributes['pa_product'] = $_POST['product'];
			$attributes['pa_width'] = $width;
			$attributes['pa_code'] = $code;
			//$attributes['pa_shower-width'] = $showerWidth;
			$attributes['pa_price'] = $price;

			$variations['pa_product'] = $_POST['product'];
			$variations['pa_width'] = $width;
			$variations['pa_code'] = $code;
			$variations['custom_price'] = $price;
			$variations['image'] = $image;
			$variations['showerWidth'] = $showerWidth;

		} else if ( $_POST['product'] == 'Bracket' ) {

			if ( $_POST['_90_degree_bracket'] > 0 ) {

				$productID = 2710;

				$bracket = $wpdb->get_row($wpdb->prepare("SELECT * FROM " . $wpdb->prefix . "frameless_products WHERE id = %d", $_POST['_90_degree_bracket']));

				$attributes['pa_product'] = '90 Degree Bracket';
				$attributes['pa_color'] = $bracket->title;
				$attributes['pa_code'] = $bracket->code;
				$attributes['pa_price'] = $_POST['_90_degree_price'];

				$variations['product'] = '90 Degree Bracket';
				$variations['bracket'] = $bracket->title;
				$variations['pa_code'] = $bracket->code;
				$variations['custom_price'] = $_POST['_90_degree_price'];
				$variations['image'] = $_POST['_90_degree_image'];

			} elseif ( $_POST['_180_degree_bracket'] > 0 ) {

				$productID = 2758;

				$bracket = $wpdb->get_row($wpdb->prepare("SELECT * FROM " . $wpdb->prefix . "frameless_products WHERE id = %d", $_POST['_180_degree_bracket']));

				$attributes['pa_product'] = '180 Degree Bracket';
				$attributes['pa_color'] = $bracket->title;
				$attributes['pa_code'] = $bracket->code;
				$attributes['pa_price'] = $_POST['_180_degree_price'];

				$variations['product'] = '180 Degree Bracket';
				$variations['bracket'] = $bracket->title;
				$variations['pa_code'] = $bracket->code;
				$variations['custom_price'] = $_POST['_180_degree_price'];
				$variations['image'] = $_POST['_180_degree_image'];

			}

		} else if ( $_POST['product'] == 'Extra' ) {

			$title = $_POST['title'];

			if ( $title == 'Spatula' ) {

				$productID = 3332;

				$image = '/wp-content/uploads/2021/09/SPATULA.jpg';

			} else if ( $title == 'Door Seal' ) {

				$productID = 3310;

				$image = '/wp-content/uploads/2021/09/DOOR-SEAL.jpg';

			} else if ( $title == 'Glass Shelf' ) {

				$productID = 3316;

				$image = '/wp-content/uploads/2021/09/GLASS-SHELF.jpeg';

			} else if ( $title == 'Silicone' ) {

				$productID = 3326;

				$image = '/wp-content/uploads/2021/09/SANITARY-silicone.jpeg';

			} else if ( $title == 'Spade Porcelain Eater Drill Bit')  {

				$productID = 3330;

				$image = '/wp-content/uploads/2021/09/SPADE_PORCELAIN_EATER.jpeg';

			} else if ( $title == 'Glass Shelf Bracket' ) {

				$productID = 3328;

				$image = '/wp-content/uploads/2021/09/SHELF-BRACKET.jpeg';

			}

			if ( isset($_POST['colour']))  {

				$variations['colour'] = $_POST['colour'];
				$attributes['pa_color'] = $_POST['colour'];

			}

			$attributes['pa_product'] = $_POST['title'];
			$attributes['pa_code'] = $_POST['code'];
			$attributes['pa_price'] = $_POST['price'];

			$variations['product'] = $_POST['title'];
			$variations['pa_code'] = $_POST['code'];
			$variations['custom_price'] = $_POST['price'];
			$variations['image'] = $image;

		} else if ( $_POST['product'] == '2 Panel Inline Shower Screen - Fixed Panel + Wall Hung Door' ) {

			$productID = 3305;

			$attributes['product'] = $_POST['product'];
			$attributes['pa_shower-width'] = $_POST['showerWidth'];

			//$attributes['pa_door-panel'] = $_POST['doorPanel'];
			$attributes['pa_door-panel-price'] = $_POST['doorPanelPrice'];
			$attributes['pa_door-panel-code'] = $_POST['doorPanelCode'];
			$attributes['pa_door-panel-width'] = $_POST['doorPanelWidth'];

			//$attributes['pa_fixed-panel'] = $_POST['fixedPanel'];
			$attributes['pa_fixed-panel-price'] = $_POST['fixedPanelPrice'];
			$attributes['pa_fixed-panel-code'] = $_POST['fixedPanelCode'];
			$attributes['pa_fixed-panel-width'] = $_POST['fixedPanelWidth'];

			$attributes['pa_difference'] = $_POST['difference'];
			$attributes['pa_overall-width'] = $_POST['overallWidth'];
			$attributes['pa_price'] = $_POST['price'];

			$variations['product'] = $_POST['product'];
			$variations['showerWidth'] = $_POST['showerWidth'];

			$variations['doorPanel'] = $_POST['doorPanel'];
			$variations['doorPanelPrice'] = $_POST['doorPanelPrice'];
			$variations['doorPanelCode'] = $_POST['doorPanelCode'];
			$variations['doorPanelWidth'] = $_POST['doorPanelWidth'];

			$variations['fixedPanel'] = $_POST['fixedPanel'];
			$variations['fixedPanelPrice'] = $_POST['fixedPanelPrice'];
			$variations['fixedPanelCode'] = $_POST['fixedPanelCode'];
			$variations['fixedPanelWidth'] = $_POST['fixedPanelWidth'];

			$variations['difference'] = $_POST['difference'];
			$variations['overallWidth'] = $_POST['overallWidth'];
			$variations['custom_price'] = $_POST['price'];

			$variations['image'] = $_POST['image'];

		} else if ( $_POST['product'] == '2 Panel Inline Screen - Hinge Panel + Door' ) {

			$productID = 3302;

			$attributes['product'] = $_POST['product'];
			$attributes['pa_shower-width'] = $_POST['showerWidth'];

			//$attributes['pa_door-panel'] = $_POST['doorPanel'];
			$attributes['pa_door-panel-price'] = $_POST['doorPanelPrice'];
			$attributes['pa_door-panel-code'] = $_POST['doorPanelCode'];
			$attributes['pa_door-panel-width'] = $_POST['doorPanelWidth'];

			//$attributes['pa_hinge-panel'] = $_POST['hingePanel'];
			$attributes['pa_hinge-panel-price'] = $_POST['hingePanelPrice'];
			$attributes['pa_hinge-panel-code'] = $_POST['hingePanelCode'];
			$attributes['pa_hinge-panel-width'] = $_POST['hingePanelWidth'];

			$attributes['pa_difference'] = $_POST['difference'];
			$attributes['pa_overall-width'] = $_POST['overallWidth'];
			$attributes['pa_price'] = $_POST['price'];


			$variations['product'] = $_POST['product'];
			$variations['showerWidth'] = $_POST['showerWidth'];

			$variations['doorPanel'] = $_POST['doorPanel'];
			$variations['doorPanelPrice'] = $_POST['doorPanelPrice'];
			$variations['doorPanelCode'] = $_POST['doorPanelCode'];
			$variations['doorPanelWidth'] = $_POST['doorPanelWidth'];

			$variations['hingePanel'] = $_POST['hingePanel'];
			$variations['hingePanelPrice'] = $_POST['hingePanelPrice'];
			$variations['hingePanelCode'] = $_POST['hingePanelCode'];
			$variations['hingePanelWidth'] = $_POST['hingePanelWidth'];

			$variations['difference'] = $_POST['difference'];
			$variations['overallWidth'] = $_POST['overallWidth'];
			$variations['custom_price'] = $_POST['price'];

			$variations['image'] = $_POST['image'];

		} else if ( $_POST['product'] == '3 x Panel Inline Screen – Hinge Panel + Door + Fixed Panel' ) {

			$productID = 847;

			$attributes['product'] = $_POST['product'];
			$attributes['pa_shower-width'] = $_POST['showerWidth'];

			//$attributes['pa_door-panel'] = $_POST['doorPanel'];
			$attributes['pa_door-panel-price'] = $_POST['doorPanelPrice'];
			$attributes['pa_door-panel-code'] = $_POST['doorPanelCode'];
			$attributes['pa_door-panel-width'] = $_POST['doorPanelWidth'];

			$attributes['pa_fixed-panel-price'] = $_POST['fixedPanelPrice'];
			$attributes['pa_fixed-panel-code'] = $_POST['fixedPanelCode'];
			$attributes['pa_fixed-panel-width'] = $_POST['fixedPanelWidth'];

			//$attributes['pa_hinge-panel'] = $_POST['hingePanel'];
			$attributes['pa_hinge-panel-price'] = $_POST['hingePanelPrice'];
			$attributes['pa_hinge-panel-code'] = $_POST['hingePanelCode'];
			$attributes['pa_hinge-panel-width'] = $_POST['hingePanelWidth'];

			$attributes['pa_difference'] = $_POST['difference'];
			$attributes['pa_overall-width'] = $_POST['overallWidth'];
			$attributes['pa_price'] = $_POST['price'];

			$variations['product'] = $_POST['product'];
			$variations['showerWidth'] = $_POST['showerWidth'];

			$variations['doorPanel'] = $_POST['doorPanel'];
			$variations['doorPanelPrice'] = $_POST['doorPanelPrice'];
			$variations['doorPanelCode'] = $_POST['doorPanelCode'];
			$variations['doorPanelWidth'] = $_POST['doorPanelWidth'];

			$variations['hingePanel'] = $_POST['hingePanel'];
			$variations['hingePanelPrice'] = $_POST['hingePanelPrice'];
			$variations['hingePanelCode'] = $_POST['hingePanelCode'];
			$variations['hingePanelWidth'] = $_POST['hingePanelWidth'];

			$variations['fixedPanel'] = $_POST['fixedPanel'];
			$variations['fixedPanelPrice'] = $_POST['fixedPanelPrice'];
			$variations['fixedPanelCode'] = $_POST['fixedPanelCode'];
			$variations['fixedPanelWidth'] = $_POST['fixedPanelWidth'];

			$variations['difference'] = $_POST['difference'];
			$variations['overallWidth'] = $_POST['overallWidth'];
			$variations['custom_price'] = $_POST['price'];

			$variations['image'] = $_POST['image'];

		} else if ( $_POST['product'] == '3 x Panel Square (Front and Return) Screen – Hinge Panel + Door + Fixed Panel' ) {

			$productID = 846;

			$attributes['product'] = $_POST['product'];
			$attributes['pa_shower-width'] = $_POST['showerWidth'];

			//$attributes['pa_door-panel'] = $_POST['doorPanel'];
			$attributes['pa_door-panel-price'] = $_POST['doorPanelPrice'];
			$attributes['pa_door-panel-code'] = $_POST['doorPanelCode'];
			$attributes['pa_door-panel-width'] = $_POST['doorPanelWidth'];

			$attributes['pa_fixed-panel-price'] = $_POST['fixedPanelPrice'];
			$attributes['pa_fixed-panel-code'] = $_POST['fixedPanelCode'];
			$attributes['pa_fixed-panel-width'] = $_POST['fixedPanelWidth'];

			//$attributes['pa_hinge-panel'] = $_POST['hingePanel'];
			$attributes['pa_hinge-panel-price'] = $_POST['hingePanelPrice'];
			$attributes['pa_hinge-panel-code'] = $_POST['hingePanelCode'];
			$attributes['pa_hinge-panel-width'] = $_POST['hingePanelWidth'];

			$attributes['pa_difference'] = $_POST['difference'];
			$attributes['pa_overall-width'] = $_POST['overallWidth'];
			$attributes['pa_price'] = $_POST['price'];

			$variations['product'] = $_POST['product'];
			$variations['showerWidth'] = $_POST['showerWidth'];

			$variations['doorPanel'] = $_POST['doorPanel'];
			$variations['doorPanelPrice'] = $_POST['doorPanelPrice'];
			$variations['doorPanelCode'] = $_POST['doorPanelCode'];
			$variations['doorPanelWidth'] = $_POST['doorPanelWidth'];

			$variations['hingePanel'] = $_POST['hingePanel'];
			$variations['hingePanelPrice'] = $_POST['hingePanelPrice'];
			$variations['hingePanelCode'] = $_POST['hingePanelCode'];
			$variations['hingePanelWidth'] = $_POST['hingePanelWidth'];

			$variations['fixedPanel'] = $_POST['fixedPanel'];
			$variations['fixedPanelPrice'] = $_POST['fixedPanelPrice'];
			$variations['fixedPanelCode'] = $_POST['fixedPanelCode'];
			$variations['fixedPanelWidth'] = $_POST['fixedPanelWidth'];

			$variations['difference'] = $_POST['difference'];
			$variations['overallWidth'] = $_POST['overallWidth'];
			$variations['custom_price'] = $_POST['price'];

			$variations['image'] = $_POST['image'];

		} else if ( $_POST['product'] == 'hinge' || $_POST['product'] == 'door-knob' || $_POST['product'] == 'waterbar' ) {

			$productID = 4280;

			if ( $_POST['product'] == 'hinge' ) {

				$productID = 4278;

			} else if ( $_POST['product'] == 'waterbar' ) {

				$productID = 3337;

			}

			$attributes['pa_product'] = $_POST['title'];
			$attributes['pa_code'] = $_POST['code'];
			$attributes['pa_color'] = $_POST['colour'];
			$attributes['pa_price'] = $_POST['price'];

			$variations['product'] = $_POST['title'];
			$variations['pa_code'] = $_POST['code'];
			$variations['colour'] = $_POST['colour'];
			$variations['custom_price'] = $_POST['price'];
			$variations['image'] = $_POST['image'];

		}
		

		$response = $woocommerce->cart->add_to_cart((int)$productID, $quantity, 0, $attributes, $variations);

		echo json_encode(['success' => true ]) ; 

		wp_die();


	}

	public function custom_price( $cart ) {

		foreach( $cart->get_cart() as $item ) {

			if ( array_key_exists('custom_price', $item ) ) {

				$item['data']->set_price( $item['custom_price'] );

			}

		}

	}

	public function customizing_cart_item_data( $cart_data, $cart_item ) {

		$custom_items = array();

		if( ! empty( $cart_data ) ) $custom_items = $cart_data;

    // Get the data (custom attributes) and set them
    if( ! empty( $cart_item['pa_width'] ) )
        $custom_items[] = array(
            'name'      => 'Width',
            'value'     => $cart_item['pa_width'],
        );
    
		if( ! empty( $cart_item['pa_code'] ) )
        $custom_items[] = array(
            'name'      => 'Product Code',
            'value'     => $cart_item['pa_code'],
        );

		if( ! empty( $cart_item['bracket'] ) ) {

        $custom_items[] = array(
            'name'      => 'Colour',
            'value'     => $cart_item['bracket'],
        );

		}

		if( ! empty( $cart_item['showerWidth'] ) ) {

			$custom_items[] = array(
					'name'      => 'Total Shower Width',
					'value'     => $cart_item['showerWidth'],
			);

		}

		if( ! empty( $cart_item['doorPanelCode'] ) ) {

			$custom_items[] = array(
					'name'      => 'Door Panel Product Code',
					'value'     => $cart_item['doorPanelCode'],
			);

		}

		if( ! empty( $cart_item['doorPanelWidth'] ) ) {

			$custom_items[] = array(
					'name'      => 'Door Panel Product Width',
					'value'     => $cart_item['doorPanelWidth'],
			);

		}

		if( ! empty( $cart_item['doorPanelPrice'] ) ) {

			$custom_items[] = array(
					'name'      => 'Door Panel Product Price',
					'value'     => sprintf("$%s", $cart_item['doorPanelPrice']),
			);

		}

		if( ! empty( $cart_item['fixedPanelCode'] ) ) {

			$custom_items[] = array(
					'name'      => 'Fixed Panel Product Code',
					'value'     => $cart_item['fixedPanelCode'],
			);

		}

		if( ! empty( $cart_item['fixedPanelWidth'] ) ) {

			$custom_items[] = array(
					'name'      => 'Fixed Panel Product Width',
					'value'     => $cart_item['fixedPanelWidth'],
			);

		}

		if( ! empty( $cart_item['fixedPanelPrice'] ) ) {

			$custom_items[] = array(
					'name'      => 'Fixed Panel Product Price',
					'value'     => sprintf("$%s", $cart_item['fixedPanelPrice']),
			);

		}

		if( ! empty( $cart_item['hingePanelCode'] ) ) {

			$custom_items[] = array(
					'name'      => 'Hinge Panel Product Code',
					'value'     => $cart_item['hingePanelCode'],
			);

		}

		if( ! empty( $cart_item['hingePanelWidth'] ) ) {

			$custom_items[] = array(
					'name'      => 'Hinge Panel Product Width',
					'value'     => $cart_item['hingePanelWidth'],
			);

		}

		if( ! empty( $cart_item['hingePanelPrice'] ) ) {

			$custom_items[] = array(
					'name'      => 'Hinge Panel Product Price',
					'value'     => sprintf("$%s", $cart_item['hingePanelPrice']),
			);

		}

		if( ! empty( $cart_item['colour'] ) ) {

			$custom_items[] = array(
					'name'      => 'Colour',
					'value'     => $cart_item['colour'],
			);

		}

		return $custom_items;

	}

	public function customizing_cart_item_name( $title, $values, $cart_item_key ) {

		$custom_title = '';

		if ( isset( $values['pa_product'] ) ) {

			$custom_title = $values['pa_product'];

		} else if ( isset( $values['product'] ) ) {

			$custom_title = $values['product'];

		}

		return $custom_title;

	}

	public function get_2x_panel_inline_screen() {

		global $wpdb;

		$data['panels'] = $wpdb->get_results("SELECT  *, LOWER(REPLACE(title, ' ', '-')) as slug FROM " . $wpdb->prefix . "frameless_products WHERE category IN ('Fixed Panel', 'Hinge Panel', 'Hinged Panel', 'Door Panel', '180 Degree Glass To Glass Hinge', '90 Degree Wall To Glass Hinge', 'Door Knob', 'Half-Round Waterbar')");

		$data['brackets_90'] = $wpdb->get_results("SELECT  *, LOWER(REPLACE(title, ' ', '-')) as slug FROM " . $wpdb->prefix . "frameless_products WHERE category LIKE '%90 Degree Wall Bracket%' GROUP BY code ORDER BY FIELD(title, 'Polished Chrome', 'Bruched Nickel', 'Black', 'Polished Gold', 'Brushed Gold', 'Brushed Brass')");

		$data['brackets_180'] = $wpdb->get_results("SELECT  *, LOWER(REPLACE(title, ' ', '-')) as slug FROM " . $wpdb->prefix . "frameless_products WHERE category LIKE '%180 Degree Wall Bracket%' GROUP BY code ORDER BY FIELD(title, 'Polished Chrome', 'Brushed Nickel', 'Black', 'Satin Chrome' )");

		$data['extras'] = $wpdb->get_results("SELECT ".$wpdb->prefix."frameless_products.*, (SELECT GROUP_CONCAT(CONCAT(title,':',price, ':', LOWER(REPLACE(title, ' ', '-')), ':', code ) SEPARATOR ',') FROM ".$wpdb->prefix."frameless_products p2 WHERE p2.category = ".$wpdb->prefix."frameless_products.category ) as variants FROM " . $wpdb->prefix . "frameless_products WHERE category in ('Glass Shelf', 'SILICON SPATULA', 'Silicone Tube', 'Spade Porcelain Eater Drill Bit', 'Door Seal', 'Shelf Bracket / Floor Bracket', '3MM PACKERS') GROUP BY category");

		echo json_encode( $data );

		wp_die();


	}

	function custom_product_image( $_product_img, $cart_item, $cart_item_key ) {

		$a =  '<img src="'.$cart_item['image'].'" />';

    return $a;
	}

}
