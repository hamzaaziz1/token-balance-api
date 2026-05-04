const http = require("http");
const app = require("../src/index");

let server;

// Start the app on a random available port before tests run
beforeAll((done) => {
  server = app.listen(0, done);
});

// Shut down the server after all tests finish
afterAll((done) => {
  server.close(done);
});

// Verify the health endpoint returns a 200 status and correct body
test("GET /health returns status ok", async () => {
  const port = server.address().port;
  const response = await fetch(`http://localhost:${port}/health`);
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data.status).toBe("ok");
});