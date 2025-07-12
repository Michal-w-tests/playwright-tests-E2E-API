import { test, expect, request } from '@playwright/test';

test('Put update', async ({request})=>{

    const response = await request.put('https://reqres.in/api/users/2',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "name": "orpheus",
            "job": "zion resident"
        }
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    //console.log(body);
    expect(body.name).toBe('orpheus');
    expect(body.job).toBe('zion resident');
})
test('Patch update',async({request})=>{
    const response = await request.patch('https://reqres.in/api/users/2',{
        headers:{
            'x-api-key': 'reqres-free-v1'
        },
        data:{
            "name": "jonatan",
            "job": "worker"
        }
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    //console.log(body);
    expect(body.name).toBe('jonatan');
    expect(body.job).toBe('worker');
})