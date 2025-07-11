import { test, expect, request } from '@playwright/test';

test('creation a dog and verification',async ({request})=>{

    let newDogID: number;
    await test.step('dog creation', async ()=>{
        const randomId = Math.floor(Math.random() * 10000);
        const NewPet = {
                        "id": 0,
                        "category": {
                        "id": 0,
                        "name": "string"
                                     },
                        "name": "doggie",
                        "photoUrls": [
                        "string"
                                    ],
                        "tags": [
                        {
                        "id": 0,
                        "name": "string"
                         }
                        ],
                        "status": "available"
                            }

const response = await request.post('https://petstore.swagger.io/v2/pet',{
    data: NewPet
})
expect(response.status()).toBe(200);
const body = await response.json();
console.log(body)

newDogID = body.id

    })

    await test.step('find the dog', async ()=>{

        const response = await request.get(`https://petstore.swagger.io/v2/pet/${newDogID}`)

        expect(response.status()).toBe(200)

    })    
})