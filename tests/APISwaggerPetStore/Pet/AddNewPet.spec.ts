import { test, expect, request } from '@playwright/test';

test('Add new Pet in the store',async ({request})=>{

    const NewPet = {
         "id": 1,
         "category": {
          "id": 1,
          "name": "string"
         },
            "name": "doggie",
            "photoUrls": [
            "string"
             ],
            "tags": [
             {
             "id": 1,
             "name": "string"
             }
            ],
            "status": "available"
            }

    const response = await request.post('https://petstore.swagger.io/v2/pet',{
        headers:{
             'api_key': 'special-key',
             'Content-Type': 'application/json',
        },
        data: NewPet
    })

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body)
    expect(body.name).toBe('doggie')
})