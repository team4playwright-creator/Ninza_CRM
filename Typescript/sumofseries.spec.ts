import {test, expect} from '@playwright/test';

test('Sum Of Series', async () =>{
    const n = 10;
    let sum=0;
    for(let i=1;i<=n;i++){
        sum = sum +i;
    }
    console.log(`Sum of ${n} numbers is ${sum}`);
    expect(sum).toBe(55);
});




