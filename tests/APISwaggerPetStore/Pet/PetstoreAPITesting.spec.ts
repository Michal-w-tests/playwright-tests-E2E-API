import { test, expect, request } from '@playwright/test';
import fs from 'fs'

let PetId: number; //definition of global variable
let UpdatedPetBody: any; // global definition

test('PetStore API testing',async ({request})=>{



    await test.step('Add new Pet in the store',async ()=>{
    const randomId = Math.floor(Math.random() * 10000);

    const NewPet = {
         "id": randomId,
         "category": {
          "id": 1,
          "name": "string"
         },
            "name": "Trhac",
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
    expect(body.name).toBe('Trhac')

    PetId = body.id //saving data into global variable (to use it in the next test)
})

    await test.step('upload image', async ()=>{


    const response = await request.post(`https://petstore.swagger.io/v2/pet/${PetId}/uploadImage`, { //using of saved global variable from previous test.step
        multipart: {
        additionalMetadata: 'My dog',
        file: {
            name: 'Dog.png',
            mimeType: 'image/png',
            buffer: fs.readFileSync('tests/APISwaggerPetStore/fixtures/Dog.png')
    }
  }
})
    expect(response.status()).toBe(200);
    const body = await response.json();
    //console.log(body);
    expect(body.message).toContain('Dog.png');

})

await test.step('update an existing pet', async ()=>{

    const UpdatedPet = {
         "id": PetId,
         "category": {
          "id": 1,
          "name": "string"
         },
            "name": "Dunco",
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

    const response = await request.put('https://petstore.swagger.io/v2/pet',{
        data: UpdatedPet
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body.name).toBe('Dunco');

    UpdatedPetBody = body; // save
})

    
})