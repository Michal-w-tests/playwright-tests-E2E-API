import { test, expect, request } from '@playwright/test';

test('get list of customers',async ({request})=>{

    await test.step('get list of customers and verify one of the customers',async()=>{

        const response = await request.get('https://reqres.in/api/users?page=2');
        expect(response.status()).toBe(200);

        const body = await response.json();
        //console.log(body)  //displays all the customers 

        expect(body.total).toBe(12);

        const user = body.data.find(el => el.id === 7 ); //path to user with id7 and some assertions examples after. 
        expect(user).toBeTruthy();
        expect(user.first_name).toBe('Michael');
        expect(user.last_name).toBe('Lawson')
        console.log(user)
    })
})