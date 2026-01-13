Feature: Report Portal Login

  As a User who works with Report portal
  I want to be able to Login to the application with valid credentials
  Also not to be able to Login with invalid credentials and get corresponding error message

  Background:
    Given I navigate to the login page

  Scenario: As a user, I can log into Report Portal Application with valid credentials
    When I fill the Username field with valid username
      And I fill the Password field with valid password
      And I click the Login Button
    Then I should see "ALL DASHBOARDS" page

  Scenario: As a user, I cannot log into Report Portal Application with invalid credentials
    When I fill the Username field with invalid username
      And I fill the Password field with invalid password
      And I click the Login Button
    Then I should see bad Credentials Error
