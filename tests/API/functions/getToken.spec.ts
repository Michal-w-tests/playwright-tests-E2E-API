import { request } from '@playwright/test';
import fs from 'fs';

export async function getToken(){
    const context = await request.newContext();
    const response = await context.post('https://simple-books-api.glitch.me/api-clients/',{
    data: {
        clientName: "michal tester 123",
        clientEmail: "michaltester123@example.com"
    }
})

    const body = await response.json();
    console.log(body);

    fs.writeFileSync('tests/API/data/token.json', JSON.stringify(body, null, 2));
    return body.accessToken;

}