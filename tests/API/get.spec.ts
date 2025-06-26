import test, { expect } from "@playwright/test";
import { log } from "node:console";

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

test("Deleting user", async ({ request }) => {
  const response = await request.post("http://localhost:3000/users", {
    data: {
      name: "Geetu",
      mobile: "5084",
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  const userID = body.id;
  console.log(userID);

  const delResponse = await request.delete(
    `http://localhost:3000/users/${userID}`
  );
  expect(delResponse.status()).toBe(200);
});

test("Updating user using PUT", async ({ request }) => {
  const response = await request.put("http://localhost:3000/users", {
    data: {
      id: 1,
      name: "Ginni",
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
  for (const u of body.users) {
    if (u.id == 1) {
      expect(u.name).toBe("Ginni");
      break;
    }
  }
});

test("Updating user using Patch", async ({ request }) => {
  const response = await request.post("http://localhost:3000/users", {
    data: {
      name: "Geetu",
      mobile: "8979",
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  const userID = body.id;
  console.log(userID);

  const patchResponse = await request.patch("http://localhost:3000/users", {
    data: {
      id: userID,
      name: "Ginni",
    },
  });
  expect(patchResponse.status()).toBe(200);
  const patchBody = await patchResponse.json();
  console.log("body after patch request is==", patchBody);
  for (const u of patchBody.users) {
    if (u.id == userID) {
      expect(u.name).toBe("Ginni");
      break;
    }
  }
});
