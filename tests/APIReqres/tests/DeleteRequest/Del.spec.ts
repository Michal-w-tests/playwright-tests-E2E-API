import { test, expect, request } from '@playwright/test';

test('delete request', async ({request})=>{
    const response = await request.delete('https://reqres.in/api/users/2',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        }
    })
    expect(response.status()).toBe(204)
})