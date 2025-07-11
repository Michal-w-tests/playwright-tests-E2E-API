import { test,expect,request } from '@playwright/test';

let petId = 1;

test('changing data via post form data', async({request})=>{

    await test.step('post form data technique', async ()=>{

        const response = await request.post(`https://petstore.swagger.io/v2/pet/${petId}`,{
            form:{
                name: 'Doggy Dog',
                status: 'sold'
            }
        })
        expect(response.status()).toBe(200);
        const body = await response.json();
        //console.log(body);

        
    });

    await test.step('verify if the changes were made',async ()=>{

        const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body)
    })

})

