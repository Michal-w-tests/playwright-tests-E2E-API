import { test } from '@playwright/test';
import { getToken } from './functions/getToken';

test('get token test',async ()=>{
    await getToken();
})