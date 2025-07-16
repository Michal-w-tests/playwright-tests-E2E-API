import { APIRequestContext,expect } from "playwright/test";

export async function getDynamicToken(request: APIRequestContext): Promise<string> {
    const random = Math.floor(Math.random() * 10000);
    const response = await request.post('https://simple-books-api.glitch.me/api-clients', {
        data: {
            clientName: "michal tester 123",
            clientEmail: `michaltester123+${random}@example.com`
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    return body.accessToken;
    
}