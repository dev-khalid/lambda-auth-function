#!/usr/bin/env node

// Simple test script to verify the auth endpoint works
const http = require("http");

const baseUrl = "http://localhost:3000";

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${baseUrl}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: data,
          headers: res.headers,
        });
      });
    });

    req.on("error", reject);
    req.setTimeout(5000, () => reject(new Error("Request timeout")));
  });
}

async function test() {
  console.log("Testing auth endpoint...\n");

  try {
    // Test with access token
    console.log("1. Testing with access token:");
    const withToken = await makeRequest("/auth?accessToken=test123");
    console.log(`   Status: ${withToken.statusCode}`);
    console.log(`   Response: ${withToken.body}\n`);

    // Test without access token
    console.log("2. Testing without access token:");
    const withoutToken = await makeRequest("/auth");
    console.log(`   Status: ${withoutToken.statusCode}`);
    console.log(`   Response: ${withoutToken.body}\n`);

    if (withToken.statusCode === 200 && withoutToken.statusCode === 401) {
      console.log("✅ All tests passed!");
    } else {
      console.log("❌ Tests failed!");
    }
  } catch (error) {
    console.error("Error running tests:", error.message);
    console.log("Make sure the server is running with: npm start");
  }
}

test();
