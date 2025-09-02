<?php
/**
 * Plugin Name: LiveTest
 * Description: [Follow Up Questioon] Logging add to cart
 * Version: 0.1
 * Author: Damarre
 */

if (!defined('ABSPATH')) exit;

class LiveTestSample {
    private $option_key = 'livetest_simple_logs';

    public function __construct() {
        add_action('woocommerce_add_to_cart', [$this, 'log_cart_added'], 10, 6);

        add_action('rest_api_init', function() {
            register_rest_route('livetest/v1', '/logs', [
                'methods'  => 'GET',
                'callback' => [$this, 'get_logs'],
            ]);
        });
    }

    public function log_cart_added($cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data) {
        $logs = get_option($this->option_key, []);
        $product = wc_get_product($product_id);

        $logs[] = [
            'time'         => current_time('mysql'),
            'event'        => 'Added to cart',
            'cart_key'     => $cart_item_key,
            'product_id'   => $product_id,
            'variation_id' => $variation_id,
            'variation'    => $variation,
            'quantity'     => $quantity,
            'data'         => $product_data,
            'details'      => $product ? $product->get_name() . " (Qty: $quantity)" : "Product ID $product_id",
        ];

        update_option($this->option_key, $logs);
    }

    public function get_logs() {
        return rest_ensure_response(get_option($this->option_key, []));
    }
}

new LiveTestSample();
