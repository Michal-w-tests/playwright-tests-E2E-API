import { test, expect, request } from '@playwright/test';

test('should return users with valid token — using newContext()', async () => {
  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: 'Bearer my-secret-token',
    },
  });

  const response = await apiContext.get('http://localhost:3000/users');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log('newContext body:', body);
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});

test('should return users with valid token — using inline headers', async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get('http://localhost:3000/users', {
    headers: {
      Authorization: 'Bearer my-secret-token',
    },
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log('inline headers body:', body);
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});

test('should fail without token', async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get('http://localhost:3000/users');
  expect(response.status()).toBe(401);
});
