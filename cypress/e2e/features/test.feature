Feature: Test only management
  As a wholesale user
  I want to get corect pricing when I purchase product

@smoke
Scenario: Wholesale users sees wholesale, original, and sale prices
  Given I am logged in as "WHOLESALE_ACCOUNT" with password "WHOLESALE_PASSWORD"
  And I am on the "Shop" page
  And I clear the cart if not empty
  When I select "Vintage Typewriter" product
  And I add 1 units to the cart
  And I go to "Cart" page from selected product cart
  Then the cart should display an original price of 90
  And the cart should display a wholesale price of 81
  And the cart should display a total price of 81
  When I click checkout button from cart
  Then the checkout should display a wholesale price of 81
  And I see place order button is available

Scenario: Non wholesale users sees wholesale, original, and sale prices
  Given I am logged in as "WHOLESALE_ACCOUNT" with password "WHOLESALE_PASSWORD"
  And I am on the "Shop" page
  When I select "Vintage Typewriter" product--
