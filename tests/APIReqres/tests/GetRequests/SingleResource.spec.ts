import { test, expect, request } from '@playwright/test';

test('get a single resource',async ({request})=>{
    
    const response = await request.get('https://reqres.in/api/unknown/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body)

    expect(body.data.id).toBe(2);
    expect(body.support.text).toBe("Tired of writing endless social media content? Let Content Caddy generate it for you.");
    

})