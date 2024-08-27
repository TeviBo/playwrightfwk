Feature: Add products to cart

  Background:
    Given User navigates to the application
    And User click on the login link

  @add
  Scenario Outline: Authenticated Users - Add to cart
    And User enter the username as "<username>"
    And User enter the password as "<password>"
    And User click on the login button
    When user search for a "<product>"
    And user add the product to the cart
    Then the cart badge should get updated

    Examples:
      | username           | password | monitor                  |
      | lramallo@gmail.com | Pass1234 | Samsung SyncMaster 941BW |
  #     | csaul@gmail.com    | Pass1234$ | Galaxy                   |
  # @fail
  # Scenario: UnAuthenticated User - Add to cart
  #   When user search for a "iMac"
  #   And user add the product to the cart
  #   Then the cart badge should get updated
