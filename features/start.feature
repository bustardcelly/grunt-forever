Feature: Developer can start daemon with grunt task
  As a User of grunt-forever
  I want to start my target nodejs server file using `forever:<target>:start`
  So that I can start the server as a daemon

  Background:
    Given I have the grunt-task plugin installed

  @start
  Scenario: Daemon started
    Given I invoke "start" on target:"test" through grunt task
    When I visit "http://localhost:1337"
    Then I should see the body text: "Hello World"

  @start
  Scenario: Subsequent :start invocation does not stop service
    Given I invoke "start" on target:"test" through grunt task
    And I invoke "start" on target:"test" through grunt task
    When I visit "http://localhost:1337"
    Then I should see the body text: "Hello World"