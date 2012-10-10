describe('grunt-forever', function() {

  describe('When forever:start', function() {

    it('should start if not previously started', function() {
      expect(true).not.toBe(true);
    });

    it('should not start a new process if previously started', function() {
      expect(true).not.toBe(true);
    })

  });

  describe('When forever:stop', function() {
    
    it('should not throw exception if process not found', function() {
      expect(true).not.toBe(true);
    });

    it('should kill process from previously started daemon', function() {
      expect(true).not.toBe(true);
    });

  });

  describe('When forever:restart', function() {

    it('should start a new process if one not found', function() {
      expect(true).not.toBe(true);
    });

    it('should stop and restart process and not create a new one', function() {
      expect(true).not.toBe(true);
    });

  });

  describe('When forever:<task_name> is run', function() {

    it('should default to index.js as the main file if not provided', function() {
      expect(true).not.toBe(true);
    });

    it('should use the provided main file option if provided', function() {
      expect(true).not.toBe(true);
    });

  });

});