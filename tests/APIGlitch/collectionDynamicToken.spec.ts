import { test, expect, request, APIRequestContext } from '@playwright/test';

// Globálna premenna na uloženie ID objednávky
let createdOrderId: string;
let token: string;

// 🔥 Funkcia na dynamické získanie tokenu
async function getToken(request: APIRequestContext): Promise<string> {
    const random = Math.floor(Math.random() * 10000);
    const response = await request.post('https://simple-books-api.glitch.me/api-clients', {
        data: {
            clientName: "michal tester 123",
            clientEmail: `michaltester123+${random}@example.com`
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    return body.accessToken;
}


test('get status', async({request})=>{
    const response = await request.get('https://simple-books-api.glitch.me/status');
    expect(response.status()).toBe(200);
})

// 🔥 Vždy keď potrebujeme token, zavoláme getToken()
test.beforeAll('create order', async ({ request }) => {
    token = await getToken(request);
    console.log(token);
    expect(token).toBeTruthy();

    const response = await request.post('https://simple-books-api.glitch.me/orders',{
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:{
            bookId: 1,
            customerName: 'John'
        }
    })
    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log(body);
    createdOrderId = body.orderId
})

test('update order',async ({request})=>{
    expect(token).toBeTruthy();


    const response = await request.patch(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:{
            customerName: 'Jozko ferko'
        }
    })
        expect(response.status()).toBe(204);
        
})

test('display order',async ({request})=>{
    expect(token).toBeTruthy();
    const response = await request.get(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    expect(response.status()).toBe(200)
    const body = await response.json();
    expect(body.customerName).toBe('Jozko ferko');
})

test('delete order',async ({request})=>{
    expect(token).toBeTruthy();
    const response = await request.delete(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    expect(response.status()).toBe(204);

})

test('delete verification', async ({request})=>{
     expect(token).toBeTruthy();
     const response = await request.get(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
     })
     expect(response.status()).toBe(404);
})