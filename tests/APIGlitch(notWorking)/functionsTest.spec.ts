import { test, expect, APIRequestContext } from '@playwright/test';

import { getDynamicToken } from './helpers/getToken';
import { createOrder } from "./helpers/createOrder";
import { updateOrder } from "./helpers/uddateOrder";
import { deleteOrder } from "./helpers/deleteOrder";
import { getOrderDetail } from "./helpers/getOrderDetail";


let token:string;
let orderId:string;

test('get status',async ({request})=>{
    const response = await request.get('https://simple-books-api.glitch.me/status')
    expect(response.status()).toBe(200)
})
test.beforeAll('create order',async ({request})=>{
    token = await getDynamicToken(request);
    expect(token).toBeTruthy();

   orderId = await createOrder(request,token,1,"John");
    
})
test('Update order',async ({request})=>{
    await updateOrder(request,token,orderId,'Ferdinand')
})
test('get order detail',async({request})=>{
    await getOrderDetail(request,token,orderId,"Ferdinand")
})
test('delete order',async ({request})=>{
    await deleteOrder(request,token,orderId)
})