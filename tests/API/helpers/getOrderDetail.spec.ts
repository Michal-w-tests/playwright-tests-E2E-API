import { APIRequestContext, expect } from '@playwright/test';
export async function getOrderDetail(
  request: APIRequestContext,
  token: string,
  orderId: string,
  name: string
) {
  const response = await request.get(`https://simple-books-api.glitch.me/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.customerName).toBe(name);

  return response;
}
