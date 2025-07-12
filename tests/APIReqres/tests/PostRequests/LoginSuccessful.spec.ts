import { test, expect, request } from '@playwright/test';

test('successful login', async ({request})=>{
    const response = await request.post('https://reqres.in/api/login',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBe("QpwL5tke4Pnpja7X4");
})