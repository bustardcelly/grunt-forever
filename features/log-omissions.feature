Feature: Allow log omissions
  As a User of grunt-forever
  I would like to not specifiy a log target in task options
  So that unnecessary log files are not generated

  @logs
  Scenario: Log omissions does not produce file
    Given I have the grunt-task plugin installed
    And I have not specified an "outFile" option
    When I invoke "start" on target:"testLog" through grunt task
    Then the "out.log" file is not generated
