Feature: Cart management
  As a wholesale user
  I want to get corect pricing when I purchase product

Scenario: Wholesale user sees wholesale, original, and sale prices
  Given I am logged in as "WHOLESALE_ACCOUNT" with password "WHOLESALE_PASSWORD"
  And I am on the "Shop" page
  When I select "Vintage Typewriter" product
  And I add 1 units to the cart
  Then the "Wholesale Price" should be displayed with value 81
  And the "Original Price" should be displayed with value 90
  And the "Sale Price" should be displayed with value 50
  When I navigate to the "Cart" page
  Then the cart should display an original price of 90
  And the cart should display a wholesale price of 81
  And the cart should display a total price of 81
  When I click checkout button from cart
  Then the checkout should display a wholesale price of 81
  And I see place order button is available
