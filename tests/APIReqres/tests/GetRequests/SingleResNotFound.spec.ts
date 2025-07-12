import { test, expect, request } from '@playwright/test';

test('single resource not found',async({request})=>{
    const response = await request.get('https://reqres.in/api/unknown/23');
    expect([401,404]).toContain(response.status());

    console.log('Received status:', response.status());
        
        const body = response.json();
        expect(Object.keys(body).length).toBe(0);
        
})