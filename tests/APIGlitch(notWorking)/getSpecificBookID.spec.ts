import { test, expect, request } from '@playwright/test';

test('get specific book according ID',async ({request})=>{
    const bookID = 1;
   const response = await request.get(`https://simple-books-api.glitch.me/books/${bookID}`); // alebo staci napisat cislo 1 do normalnych zatvoriek
   expect(response.status()).toBe(200);

   const body = await response.json();
   console.log(body);
   expect(body.id).toBe(1);
   expect(body.name).toBe('The Russian');
   expect(body.author).toBe('James Patterson and James O. Born');
   expect(body.available).toBe(true);
})