import { test, expect, request } from '@playwright/test';

test ('test of delayed response',async ({request})=>{
    let response;
    let maxRetries = 5;
    let delay = 1000; // 
    
    for (let i = 0; i < maxRetries; i++) {
  response = await request.get('https://reqres.in/api/users?delay=3',{
    headers:{
        'x-api-key': 'reqres-free-v1' 
    }
  });
  
  console.log(`Attempt ${i + 1}: ${response.status()}`);

  if (response.status() === 200) {
    break;
  }
  await new Promise(r => setTimeout(r, delay)); // počkaj
}
expect(response.status()).toBe(200);

})