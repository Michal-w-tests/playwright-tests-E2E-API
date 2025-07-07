import { test } from '@playwright/test';
import { getToken } from './functions/getToken.spec';

test('get token test',async ()=>{
    await getToken();
})