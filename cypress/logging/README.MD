## How to use rest cart logging
- Store it to /public/wp-content/livetest
- Enable the plugin via wp cli / wp admin
- As a user, select products, add quantity, then add to cart
- hit the rest endpoint : <sites>/wp-json/livetest/v1/logs

Output example:
```
  {
    "time": "2025-09-02 05:58:10",
    "event": "Added to cart",
    "cart_key": "14bfa6bb14875e45bba028a21ed38046",
    "key": "14bfa6bb14875e45bba028a21ed38046",
    "product_id": 69,
    "variation_id": 0,
    "variation": [],
    "quantity": 10,
    "data": null,
    "details": "3-Speed Bike (Qty: 10)"
  }
```