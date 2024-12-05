const { log } = require('console');
const fs = require('fs');

//definitions
let input = [];
let timesFound = 0;


const findDiagonal = (array) => {
    //look right
    let numRows = array.length;
    let numCols = array[0].length;

    for (let startRow = 0; startRow <= numRows - 4; startRow++) {
        for (let startCol = 0; startCol <= numCols - 4; startCol++) {
        let diagonal = "";
        for (let i = 0; i < 4; i++) {
            diagonal += array[startRow + i][startCol + i];
        }
        if (diagonal === "XMAS") {
            timesFound++;
        } else if (diagonal === "SAMX") {
            timesFound++;
        }
        }
    }


    //look left
    //change these values
    numRows = array.length;
    numCols = array[0].length;

    for (let startRow = 0; startRow <= numRows - 4; startRow++) {
        for (let startCol = numCols - 1; startCol >= 3; startCol--) {
        let diagonal = "";
        for (let i = 0; i < 4; i++) {
            diagonal += array[startRow + i][startCol - i];
        }
        if (diagonal === "XMAS") {
            timesFound++;
        } else if (diagonal === "SAMX") {
            timesFound++;
        }
        }
    }
}

const findXmas = (array) => {
    
    let numRows = array.length;//the length of the array
    let numCols = array[0].length;//the length of the first line in the array
    let matches = 0;


    //traverse each row starting at 1 and ending at numCols - 1
    for(let row = 1; row < numRows - 1; row++){
        for(let col = 1; col < numCols - 1; col++){
            if(array[row][col] === 'A') {//find where it matches an A
                let possible1 = "";
                let possible2 = "";
                //found an A and I need to check around it
                possible1 += array[row - 1][col - 1];
                possible1 += array[row][col];
                possible1 += array[row + 1][col + 1];
                
                possible2 += array[row + 1][col - 1];
                possible2 += array[row][col];
                possible2 += array[row - 1][col + 1];

                if(
                    (possible1 === "MAS" || possible1 === "SAM") && 
                    (possible2 === "MAS" || possible2 === "SAM")
                ) {
                    matches++;
                    //console.log(`${possible1} ${possible2}`);
                }
                
            }
        }
    }
    console.log(matches);
}

//Where things actually happen
try {
    input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);
} catch (error) {
    console.log(error)
}

findXmas(input);
