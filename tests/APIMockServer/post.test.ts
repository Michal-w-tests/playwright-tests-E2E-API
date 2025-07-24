import { test , expect, request, APIRequestContext } from "@playwright/test";

test.describe.serial('testing post request', ()=>{
let apiContext: APIRequestContext;
const baseURL = 'http://localhost:3000';

    test.beforeAll(async ({})=>{
        apiContext = await request.newContext({
            extraHTTPHeaders: {
                Authorization: 'Bearer my-secret-token',
            },
        });
    });

    test('get all posts and in post id:1 verify content', async ()=>{
        const response = await apiContext.get(`${baseURL}/posts`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        const post = data.find((p: any) => p.id === 1); // V zozname príspevkov (data) hľadáme objekt, ktorého vlastnosť 'id' má hodnotu 1

        expect(post).toBeDefined();
        expect(post.content).toBe("This is my first post.") // v db.json najdeme pre id.1 content s takymto textom.
    })

    test('directly calling post/1 and verification', async ()=>{
        const response = await apiContext.get(`${baseURL}/posts/1`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.createdAt).toBe("2024-05-01T08:00:00Z");
        expect(data.likes).toBe(5)
    })
})