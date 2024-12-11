
const fs = require('fs');

let map;
let guardPosition;
let visited = 0;

const Directions = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}


try {
    let input = fs.readFileSync('input.txt', 'utf8').split(/\n/);
    input = input.map(line => [...line]);
    map = input;
} catch (error) {
    console.log(error)
}

/*
    Finds the initial position
*/
const findInitialGuardPos = () => {

    map.forEach(line => {
        if(line.includes('^')) {
            
            guardPosition = {
                x : line.indexOf('^'),
                y : map.indexOf(line),
                direction: Directions.UP
            }
            
        }
    });

    //console.log(guardPosition);
}


const traverseMap = () => {

    let onBoard = true;

    //move forward until you hit a '#'
    while (onBoard) {
        
        try {
            switch (guardPosition.direction) {
                case 'UP':
                    if(map[guardPosition.y - 1 ][guardPosition.x] === undefined){//if the next position is off the board
                        map[guardPosition.y][map.guardPosition.x] = 'X';//mark the current position
                        onBoard = false;//mark as false so it exits
                    } else if (map[guardPosition.y - 1 ][guardPosition.x] !== '#') {//if its not a obstacle
                        //move forward
                        map[guardPosition.y][guardPosition.x] = 'X';
                        map[guardPosition.y - 1 ][guardPosition.x] = '^';
                        guardPosition.y -= 1; 
                    } else { //if it is an obstacle
                        //turn right
                        guardPosition.direction = Directions.RIGHT;
                    }
                    break;
                case 'DOWN':
                    if(map[guardPosition.y + 1 ][guardPosition.x] === undefined){//if the next position is off the board
                        map[guardPosition.y][guardPosition.x] = 'X';//mark the current position
                        onBoard = false;//mark as false so it exits
                    } else if (map[guardPosition.y +1 ][guardPosition.x] !== '#') {//if its not a obstacle
                        //move forward
                        map[guardPosition.y][guardPosition.x] = 'X';
                        map[guardPosition.y + 1 ][guardPosition.x] = '^';
                        guardPosition.y += 1; 
                    } else { //if it is an obstacle
                        //turn right
                        guardPosition.direction = Directions.LEFT;
                    }                
                    break;
                case 'LEFT':
                    if(map[guardPosition.y ][guardPosition.x - 1] === undefined){//if the next position is off the board
                        map[guardPosition.y][guardPosition.x] = 'X';//mark the current position
                        onBoard = false;//mark as false so it exits
                    } else if (map[guardPosition.y ][guardPosition.x - 1] !== '#') {//if its not a obstacle
                        //move forward
                        map[guardPosition.y][guardPosition.x] = 'X';
                        map[guardPosition.y ][guardPosition.x - 1] = '^';
                        guardPosition.x -= 1; 
                    } else { //if it is an obstacle
                        //turn right
                        guardPosition.direction = Directions.UP;
                    }                  
                    break;
                case 'RIGHT':
                    if(map[guardPosition.y ][guardPosition.x + 1] === undefined){//if the next position is off the board
                        map[guardPosition.y][guardPosition.x] = 'X';//mark the current position
                        onBoard = false;//mark as false so it exits
                    } else if (map[guardPosition.y ][guardPosition.x + 1] !== '#') {//if its not a obstacle
                        //move forward
                        map[guardPosition.y][guardPosition.x] = 'X';
                        map[guardPosition.y ][guardPosition.x + 1] = '^';
                        guardPosition.x += 1; 
                    } else { //if it is an obstacle
                        //turn right
                        guardPosition.direction = Directions.DOWN;
                    }                 
                    break;        
                default:
                    console.log('Something went wrong.');
                    
                    break;
            } 
        } catch (e) {
            map[guardPosition.y][guardPosition.x] = 'X';//mark the current position
            onBoard = false;//mark as false so it exits
        }
    } 
}

const count = () => {
    map.forEach(row => {
        row.forEach(el => {
            if(el === 'X') visited++;
        })
    })
    console.log(visited);
    
}

       
findInitialGuardPos();
traverseMap();
count();

//console.log(map);
