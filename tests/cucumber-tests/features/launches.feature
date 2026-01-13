Feature: Report Portal Launches feature

  As a User who works with Report portal
  I want to be able to view the Launches page after Login
  Also see all the launches with their specific data

  Background:
    Given I navigate to the login page
    And I login to the application

  Scenario: As a user, I want to be able to navigate to Launches page
    When I choose the project from sidebar
      And I click Launches Button in the sidebar
    Then I can see launches grid
