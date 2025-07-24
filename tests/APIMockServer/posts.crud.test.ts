import { test , expect, request, APIRequestContext } from "@playwright/test";

test.describe.serial('CRUD posts', ()=>{
let apiContext: APIRequestContext;
const baseURL = 'http://localhost:3000';
let postId: number;

    test.beforeAll(async ({})=>{
        apiContext = await request.newContext({
            extraHTTPHeaders: {
                Authorization: 'Bearer my-secret-token',
            },
        });
    });

    test('Create new post', async ()=>{

        const newPost = {
            title: 'New generated post',
            content: 'Generated via Playwright test',
            author: 'Michal W.',
            createdAt: new Date().toISOString(),
            likes: 0
        };
        
        const response = await apiContext.post(`${baseURL}/posts`,{
            data: newPost
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.id).toBeDefined(); // server should assign id
        expect(responseBody.title).toBe(newPost.title);
        expect(responseBody.content).toBe(newPost.content);
        expect(responseBody.author).toBe(newPost.author);

        postId = responseBody.id
    })

    test('update newly created post',async ()=>{

        const newData = {
            title: "Updated title",
            content: 'Generated via Playwright test',
            author: 'Michal W.',
            createdAt: new Date().toISOString(),
            likes: 10,
            id: postId
        };

         const response = await apiContext.put(`${baseURL}/posts/${postId}`,{
            data: newData
         });

         expect(response.status()).toBe(200);
         const updatedBody = await response.json();
         expect(updatedBody.title).toBe("Updated title");
         expect(updatedBody.likes).toBe(10);

    });
    test('control get request', async ()=>{
        const response = await apiContext.get(`${baseURL}/posts/${postId}`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Full post after update:', body)
    })

    test('delete post',async () =>{

        const response = await apiContext.delete(`${baseURL}/posts/${postId}`);
        expect(response.status()).toBe(200);
    });

    test('verification that post is delted', async ()=>{
        const response = await apiContext.get(`${baseURL}/posts/${postId}`);
        expect(response.status()).toBe(404)
    })
    
})