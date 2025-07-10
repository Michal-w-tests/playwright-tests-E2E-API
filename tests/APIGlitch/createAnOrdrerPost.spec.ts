import { test, expect, request } from '@playwright/test';
import fs from 'fs';

// ⬇️ Tu deklaruješ premennú mimo testov, aby bola "globálna" pre tento súbor
let createdOrderId: string;



test('create order', async ({request})=>{
    // Načítaš token
const tokenData = JSON.parse(fs.readFileSync('tests/API/data/token.json', 'utf-8'));
const token = tokenData.accessToken;
    const response = await request.post('https://simple-books-api.glitch.me/orders',{
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:{
            bookId: 1,
            customerName: 'MichalTester123'

        }
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    //console.log(body);

    // Uložíme ID do globálnej premennej
  createdOrderId = body.orderId;
})

test.skip('get order ID details',async({request})=>{
// ⬇️ Overíme, že premenna je naozaj vyplnená
  expect(createdOrderId).toBeTruthy();

  // Načítaš token
const tokenData = JSON.parse(fs.readFileSync('tests/API/data/token.json', 'utf-8'));
const token = tokenData.accessToken;

const response = await request.get(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
expect(response.status()).toBe(200);
const body = await response.json();
//console.log(body);
expect(body.bookId).toBe(1);
expect(body.customerName).toBe('MichalTester123');
expect(body.quantity).toBe(1);


})

test.skip('get all orders', async ({request})=>{

  // Načítaš token
const tokenData = JSON.parse(fs.readFileSync('tests/API/data/token.json', 'utf-8'));
const token = tokenData.accessToken;

const response = await request.get('https://simple-books-api.glitch.me/orders',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
expect(response.status()).toBe(200);
const body = await response.json();
console.log(body);
})

test('Update an order',async ({request})=>{
// ⬇️ Overíme, že premenna je naozaj vyplnená
  expect(createdOrderId).toBeTruthy();

  // Načítaš token
const tokenData = JSON.parse(fs.readFileSync('tests/API/data/token.json', 'utf-8'));
const token = tokenData.accessToken;

const response = await request.patch(`https://simple-books-api.glitch.me/orders/${createdOrderId}`, {
    headers:{
        Authorization: `Bearer ${token}`
    },
    data:{
        customerName: 'Jozko Ferko'
    }
})
        expect(response.status()).toBe(204);
})
test('verification od update',async({request})=>{

    // ⬇️ Overíme, že premenna je naozaj vyplnená
  expect(createdOrderId).toBeTruthy();

  // Načítaš token
const tokenData = JSON.parse(fs.readFileSync('tests/API/data/token.json', 'utf-8'));
const token = tokenData.accessToken;

const response = await request.get(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
expect(response.status()).toBe(200);
const body = await response.json()
//console.log(body)
expect(body.customerName).toBe('Jozko Ferko');

})

test('delete order',async({request})=>{
// Načítaš token
const tokenData = JSON.parse(fs.readFileSync('tests/API/data/token.json', 'utf-8'));
const token = tokenData.accessToken;

const response = await request.delete(`https://simple-books-api.glitch.me/orders/${createdOrderId}`,{
    headers:{
         Authorization: `Bearer ${token}`
    }
})
expect(response.status()).toBe(204);


})