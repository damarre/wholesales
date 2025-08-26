Feature: Product management
  As a user
  I want to see the correct pricing of products in the product listing

Scenario: Retail customer can only see original and sale prices
  Given I am logged in as "NON_WHOLESALE_ACCOUNT" with password "NON_WHOLESALE_PASSWORD"
  And I am on the "Shop" page
  When I select "Vintage Typewriter" product
  Then the "Sale Price" should be displayed with value 50
  And the "Original Reguler Price" should be displayed with value 90
  And the Wholesale Price should not be displayed

Scenario: Wholesale user sees wholesale, original, and sale prices
  Given I am logged in as "WHOLESALE_ACCOUNT" with password "WHOLESALE_PASSWORD"
  And I am on the "Shop" page
  When I select "Vintage Typewriter" product
  Then the "Wholesale Price" should be displayed with value 81
  And the "Original Price" should be displayed with value 90
  And the "Sale Price" should be displayed with value 50

