import { test, expect, request } from '@playwright/test';

test('unsuccessful login', async ({request})=>{
    const response = await request.post('https://reqres.in/api/login',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "email": "peter@klaven"
        }
    })
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Missing password");
})