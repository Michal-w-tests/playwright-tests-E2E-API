import { test, expect, request } from '@playwright/test';

test('get list of books', async ({request})=>{

    const response = await request.get('https://simple-books-api.glitch.me//books')
    expect(response.status()).toBe(200);

    const body = await response.json()
    //console.log(body)

    for (const book of body){
        if (book.type === 'fiction') {
            console.log(book)
            expect(book.type).toBe('fiction')
        }
    }
    
    for (const book of body){
        if ([1,3,4,6].includes(book.id)){
            expect(book.type).toBe('fiction')
        }
    }

    const idsTocheck = [1,3,4,6];
    
    for (const book of body){
        if (idsTocheck.includes(book.id)){
            expect(book.type).toBe('fiction');
            expect(book.available).toBe(true);
        }
    }
})
test('query parameter', async ({request})=>{

const response = await request.get('https://simple-books-api.glitch.me/books?type=fiction')
expect(response.status()).toBe(200);

const body = await response.json()
for (const book of body){
    console.log(body)
    expect(book.type).toBe('fiction')
}

})

test('limit query parameter',async ({request})=>{
   const response = await request.get('https://simple-books-api.glitch.me/books?limit=3')
   expect(response.status()).toBe(200);

   const body = await response.json()
   //for (const book of body){
   //  expect(body).toHaveLength(3)
   //  console.log(body)
  // }  alebo 
  expect(body.length).toBeLessThanOrEqual(3);
  console.log(body);

})

test('combination of query parameters', async ({request})=>{
 const response =  await request.get('https://simple-books-api.glitch.me/books?type=fiction&limit=2')
 expect(response.status()).toBe(200);

 const body = await response.json()
    expect(body.length).toBeLessThanOrEqual(2);
    console.log(body)
    
    for (const book of body){
        expect(book.type).toBe('fiction')
        
    }
    

})