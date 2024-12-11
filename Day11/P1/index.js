const fs = require('fs');

let stones = [];

/*
    Read the file
*/
try {
    let input = fs.readFileSync('TestInput.txt', 'utf8').split(" ");
    input.forEach(element => stones.push(+element));
    
} catch (error) {
    console.log(error);
}


const blink = () => {

    stones.forEach((stone) => {

        //if it is a zero
        if(stone === 0) {
            stones[stones.indexOf(stone)] = 1;
        } else if (stone.toString().length % 2 === 0){//if it has an even number of digits
            //change the number to a string
            let digit = stone.toString();
            //separate it into two numbers
            let num1 = digit.slice(0, digit.length/2);
            let num2 = digit.slice(digit.length/2, digit.length);

            //add them to the array
            stones[stones.indexOf(stone)] = Number(num1);
            stones.push(Number(num2));
        } else {
            stones[stones.indexOf(stone)] *= 2024;
        }

    })

    //console.log(stones);
    
}

const doBlinks = () => {

    for(let i = 0; i < 75; i++) {
        blink();
        console.log(`Run ${i+1} times.`);
        
    }
}

doBlinks();
console.log(stones.length);