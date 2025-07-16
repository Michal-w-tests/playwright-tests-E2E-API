import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe.serial('User CRUD API Tests', () => {
    let apiContext: APIRequestContext;
    let createdUserId: number;
    let createdUserName: string;
    let createdUserEmail: string;
    let newName: string;
    
    test.beforeAll(async ({})=>{
        apiContext = await request.newContext({
            extraHTTPHeaders: {
                Authorization: 'Bearer my-secret-token',
            },
        });
    });

    test('Create User',async ()=>{
        const randomSuffix = Date.now(); // alebo Math.floor(Math.random() * 10000);

        const newUser = {
            name: `michal tester ${randomSuffix}`,
            email: `michaltester${randomSuffix}@email.com`
        };
        const response = await apiContext.post('http://localhost:3000/users',{
            headers:{
                Authorization: 'Bearer my-secret-token',
            },
            data: newUser
        })
        expect(response.status()).toBe(201);
        const body = await response.json();
        console.log(JSON.stringify(body, null, 2));

        expect(body.name).toBe(`michal tester ${randomSuffix}`);
        expect(body.email).toBe(`michaltester${randomSuffix}@email.com`);

        createdUserId = body.id;
        createdUserName = body.name;
        createdUserEmail = body.email;
    })

    test('Get created user', async ()=>{

        const response = await apiContext.get(`http://localhost:3000/users/${createdUserId}`)
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(createdUserId);
        expect(body.name).toBe(createdUserName);
        expect(body.email).toBe(createdUserEmail);
    })

    test(' Update created user', async ()=>{
        const updatedUser ={
            name: 'Stefan Tester'
        }
        const response =  await apiContext.put(`http://localhost:3000/users/${createdUserId}`,{
            data: updatedUser
        })
        expect(response.status()).toBe(200);
        const body =  await response.json();

        newName = body.name
        expect(body.name).toBe(newName)
    })

    test('delete user', async () =>{
        const response = await apiContext.delete(`http://localhost:3000/users/${createdUserId}`)
        expect(response.status()).toBe(200);

    })

    test('confirmation that user is deleted', async ()=>{
        const response = await apiContext.get(`http://localhost:3000/users/${createdUserId}`)
        expect(response.status()).toBe(404);
    })
})