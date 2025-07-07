import { APIRequestContext, expect } from '@playwright/test';

export async function deleteOrder(
  request: APIRequestContext,
  token: string,
  orderId: string
) {
  const response = await request.delete(`https://simple-books-api.glitch.me/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(response.status()).toBe(204);
}
