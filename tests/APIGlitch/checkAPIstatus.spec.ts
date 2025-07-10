import { test, expect, request } from '@playwright/test';

test('check API status', async ({request})=>{
    const response = await request.get('https://simple-books-api.glitch.me/status');

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body)
    expect(body.status).toBe('OK');
})