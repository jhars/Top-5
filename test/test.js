var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

var listId;

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe('GET /api/lists', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request(baseUrl + '/api/lists', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe('POST /api/lists', function() {
  it('should return statusCode 200', function(done) {
    request.post(
      {
        url: baseUrl + '/api/lists',
        form: {
        	title: "test",
			date: "test",
			genre: "test",
			itemOne: "test",
			itemTwo: "test",
			itemThree: "test",
			itemFour: "test",
			itemFive: "test",
			thumbsUp: 0,
			forks: 0,
			author: "test"
        }
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        listId = JSON.parse(body)._id
        done();
      }
    );
});

describe('PUT /api/lists/:id', function() {
  it('should return statusCode 200', function(done) {
    request.put(
      {
        url: baseUrl + '/api/lists/' + listId,
        form: {
          	title: "put test"
        }
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});

describe('DELETE /api/lists/:id', function() {
  it('should return statusCode 200', function(done) {
    request.del(baseUrl + '/api/lists/' + listId, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});


});