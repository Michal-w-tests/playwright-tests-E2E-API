import {  test, expect, request } from '@playwright/test';

test('list of resources', async({request})=>{
    const response = await request.get('https://reqres.in/api/unknown')
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body)

    const resource = body.data.find(el => el.id === 1)
    expect(resource.name).toBe('cerulean')
})