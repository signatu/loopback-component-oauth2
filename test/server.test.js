// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-component-oauth2
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
var Server = require('../lib/server');

describe('Server', function() {
  describe('newly initialized instance', function() {
    var server = new Server();

    it('should wrap authorization middleware', function() {
      expect(server.authorization).to.be.a('function');
      expect(server.authorization).to.have.length(3);
      expect(server.authorize).to.equal(server.authorization);
    });

    it('should wrap decision middleware', function() {
      expect(server.decision).to.be.a('function');
      expect(server.decision).to.have.length(2);
    });

    it('should wrap token middleware', function() {
      expect(server.token).to.be.a('function');
      expect(server.token).to.have.length(1);
    });

    it('should wrap errorHandler middleware', function() {
      expect(server.errorHandler).to.be.a('function');
      expect(server.errorHandler).to.have.length(1);
    });

    it('should have no request parsers', function() {
      expect(server._reqParsers).to.have.length(0);
    });

    it('should have no response handlers', function() {
      expect(server._resHandlers).to.have.length(0);
    });

    it('should have no exchanges', function() {
      expect(server._exchanges).to.have.length(0);
    });

    it('should have no serializers or deserializers', function() {
      expect(server._serializers).to.have.length(0);
      expect(server._deserializers).to.have.length(0);
    });
  });

  describe('#authorization', function() {
    var server = new Server();

    it('should create function handler', function() {
      var handler = server.authorization(function() {});
      expect(handler).to.be.an('function');
      expect(handler).to.have.length(3);
    });
  });

  describe('#decision', function() {
    var server = new Server();

    it('should create handler stack with two functions', function() {
      var handler = server.decision();
      expect(handler).to.be.an('array');
      expect(handler).to.have.length(2);
      expect(handler[0]).to.be.a('function');
      expect(handler[0]).to.have.length(3);
      expect(handler[1]).to.be.a('function');
      expect(handler[1]).to.have.length(3);
    });

    it('should create function handler when transaction loader is disabled', function() {
      var handler = server.decision({loadTransaction: false});
      expect(handler).to.be.an('function');
      expect(handler).to.have.length(3);
    });
  });

  describe('#token', function() {
    var server = new Server();

    it('should create function handler', function() {
      var handler = server.token();
      expect(handler).to.be.an('function');
      expect(handler).to.have.length(3);
    });
  });

  describe('#errorHandler', function() {
    var server = new Server();

    it('should create function error handler', function() {
      var handler = server.errorHandler();
      expect(handler).to.be.an('function');
      expect(handler).to.have.length(4);
    });
  });
});
