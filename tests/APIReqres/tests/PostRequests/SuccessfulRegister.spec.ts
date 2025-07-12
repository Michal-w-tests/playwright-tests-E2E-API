import { test, expect, request } from '@playwright/test';

test('Successful registration', async ({request})=>{
    const response = await request.post('https://reqres.in/api/register',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body.id).toBe(4);
    expect(body.token).toBe("QpwL5tke4Pnpja7X4");
})