import { APIRequestContext, expect } from '@playwright/test';
export async function updateOrder(
  request: APIRequestContext,
  token: string,
  orderId: string,
  newName: string
) {
  const response = await request.patch(`https://simple-books-api.glitch.me/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      customerName: newName
    }
  });

  expect(response.status()).toBe(204);
}
