import {test, expect} from '@playwright/test';

test('Count number of characters', async () =>{
    let text="Hello World";
    text = text.replace(/\s/g, '');
    let count=0;
    for(let i=0;i<text.length;i++){
        count=count+1;
    }
    console.log(`The text is ${text} and the count is ${count}`);
    expect(count).toBe(10);
});




