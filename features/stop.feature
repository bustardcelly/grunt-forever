Feature: Developer can stop previously started daemon with grunt task
  As a User of grunt-forever
  I want to stop a previous started target nodejs server file using `forever:<target>:stop`
  So that I can remove the server as a daemon

  Background:
    Given I have the grunt-task plugin installed

  @stop
  Scenario: Daemon stopped
    Given I invoke "start" on target:"test" through grunt task
    When I invoke "stop" on target:"test" through grunt task
    Then I should be shown no content when visiting "http://localhost:1337"
