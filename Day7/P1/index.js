const fs = require('fs');

let equations = [];
let result = 0;

function Equation(key, numbers){
    this.key = key;
    this.numbers = numbers;
}

try {
    let input = fs.readFileSync('input.txt', 'utf8').split(/\n/);
    input.forEach(line => {
        let temp = line.split(':');
        let eq = new Equation(temp[0], temp[1].split(' ').filter(function(entry) { return entry.trim() != ''; }));
        equations = [...equations, eq];
    })
    //equations = input;
} catch (error) {
    console.log(error);
}

const canObtain = (target, numbers) => {

    if(numbers.length === 1) {
        return (target === Number(numbers[0]))
    }

    //console.log(target);
    let removed = numbers.pop();
    //console.log(removed);
    //console.log(numbers);
    
    
    //let arrayWithoutCurrent = numbers.filter(function(x) { return x !== numbers[numbers.length]; });

    if((target%Number(removed) === 0) && canObtain(target/Number(removed), numbers)) {
        //console.log("made it to condition 1");
        return true;
    } else if((target > Number(removed)) && canObtain(target - Number(removed), numbers)) {
        //console.log("made it to condition 2");
        return true;
    } else {
        //console.log("made it to condition 3");
        return false
    };
}

const solveEquations = () => {
    equations.forEach(equation => {
        let solution = Number(equation.key);//the numbered version of the answer im trying to get
        let numbers = equation.numbers;//the list of numbers used to find the solution
        
        if(canObtain(solution, numbers)) {
            
            
            result += solution;
            //console.log(solution);
            
        }
    })
}

solveEquations();
console.log(12553187650171);

//console.log(equations);

