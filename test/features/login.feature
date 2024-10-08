Feature: User Authentication tests

  Background:
    Given User navigates to the application

  Scenario: Login should be success
    And User enter the username as "csaul"
    And User enter the password as "Pass1234$"
    When User click on the login button
    Then Login should be success

  Scenario: Login should not be success
    Given User enter the username as "koushik@gmail.com"
    Given User enter the password as "Passkoushik"
    When User click on the login button
    But Login should fail
