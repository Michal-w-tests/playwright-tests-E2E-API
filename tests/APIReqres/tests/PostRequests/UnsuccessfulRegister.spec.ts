import { test, expect, request } from '@playwright/test';

test('something went wrong during registration O:)', async ({request})=>{
    const response = await request.post('https://reqres.in/api/register',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "email": "sydney@fife"
        }
    })
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Missing password");

})