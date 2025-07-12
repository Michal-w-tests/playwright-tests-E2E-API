import { test, expect, request } from '@playwright/test';

test('Create user',async({request})=>{
    const response = await request.post('https://reqres.in/api/users',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "name": "morpheus",
            "job": "leader"
        }
    })
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('leader');

    console.log(body)

})