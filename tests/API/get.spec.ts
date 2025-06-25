import test, { expect } from "@playwright/test";

test("Get users API response test", async ({ request }) => {
  const response = await request.get("http://localhost:3000/users");
  expect(response.ok).toBeTruthy();
  const jsonres = await response.json();
  console.log(jsonres);
});

test("Creating user using POST", async ({ request }) => {
  const response = await request.post("http://localhost:3000/users", {
    data: {
      name: "Geetu",
      mobile: "5084",
    },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  console.log(body);
  expect(body.name).toBe("Geetu");
});
