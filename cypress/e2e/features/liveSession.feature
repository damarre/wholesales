Feature: Regular Price on the checkout page
  As a wholesale user
  I want to get corect pricing when I purchase product

Scenario: Wholesale users sees correct reguler price
  Given I am logged in as "WHOLESALE_ACCOUNT" with password "WHOLESALE_PASSWORD"
  And I am on the "Shop" page
  And I clear the cart if not empty
  When I select "Vintage Typewriter" product
  And I add 1 units to the cart
  And I go to cart page
  And I click checkout button from cart
  Then the original price should be displayed with value 90


#   When I click checkout button from cart


#   Then the cart should display a regular price of 90
#   And the cart should display a wholesale price of 81
#   And the cart should display a total price of 81
#   When I click checkout button from cart
#   Then the checkout should display a wholesale price of 81
#   And I see place order button is available
