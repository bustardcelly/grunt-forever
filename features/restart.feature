Feature: Developer can restart daemon with grunt task
  As a User of grunt-forever
  I want to start my target nodejs server file using `forever:<target>:restart`
  So that I can restart the server as a daemon

  Background:
    Given I have the grunt-task plugin installed

  @restart
  Scenario: Daemon restarted
    Given I invoke "start" on target:"test" through grunt task
    When I invoke "restart" on target:"test" through grunt task
    And I visit "http://localhost:1337"
    Then I should see the body text: "Hello World"

  @restart
  Scenario: Daemon started when previously not active
    Given I invoke "start" on target:"test" through grunt task
    And I invoke "stop" on target:"test" through grunt task
    When I invoke "restart" on target:"test" through grunt task
    And I visit "http://localhost:1337"
    Then I should see the body text: "Hello World"