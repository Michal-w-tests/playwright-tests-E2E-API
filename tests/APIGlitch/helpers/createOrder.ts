import { APIRequestContext, expect } from '@playwright/test';

export async function createOrder(
  request: APIRequestContext,
  token: string,
  bookId: number,
  customerName: string
): Promise<string> {
  const response = await request.post('https://simple-books-api.glitch.me/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      bookId,
      customerName
    }
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  return body.orderId;
}
