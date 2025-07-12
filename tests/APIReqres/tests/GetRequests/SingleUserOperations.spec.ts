import { test, expect, request } from '@playwright/test';

test('single user operations', async ({request})=>{

    await test.step('get single user and verify dat on him', async()=>{
        const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body.data.email).toBe('janet.weaver@reqres.in');
    expect(body.support.url).toBe('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
    })
    
    await test.step('singel user not found 404',async ()=>{
        const response = await request.get('https://reqres.in/api/users/23');
        expect([404, 401]).toContain(response.status());
        //expect(response.status()).toBe(404);

        console.log('Received status:', response.status());
        
        const body = response.json();
        expect(Object.keys(body).length).toBe(0);
    })
})