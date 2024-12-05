const fs = require('fs');

//definitions
let input = [];
let timesFound = 0;

const findHorizontal = (array) => {
    array.forEach((row, rowIndex) => {
        for (let i = 0; i <= row.length - 4; i++) {
          const segment = row.substring(i, i + 4);
          if (segment === "XMAS") {
            timesFound++;
          } else if (segment === "SAMX") {
            timesFound++;
          }
        }
      });
}

const findVertical = (array) => {
    for (let col = 0; col < array[0].length; col++) {
        let column = "";
        for (let row = 0; row < array.length; row++) {
          column += array[row][col];
        }
      
        for (let i = 0; i <= column.length - 4; i++) {
          const segment = column.substring(i, i + 4);
          if (segment === "XMAS") {
            timesFound++;
          } else if (segment === "SAMX") {
            timesFound++;
          }
        }
      }
}

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

//Where things actually happen
try {
    input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);
} catch (error) {
    console.log(error)
}

findHorizontal(input);
findVertical(input);
findDiagonal(input);

console.log(timesFound);
