const fs = require('fs');

let map;
let guardPosition;

const Directions = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
};

try {
    let input = fs.readFileSync('input.txt', 'utf8').split(/\n/);
    input = input.map(line => [...line]);
    map = input;
} catch (error) {
    console.log(error);
}

/*
    Finds the initial position
*/
const findInitialGuardPos = () => {
    map.forEach((line, y) => {
        if (line.includes('^')) {
            guardPosition = {
                x: line.indexOf('^'),
                y,
                direction: Directions.UP
            };
        }
    });
};

/*
    Simulates guard's traversal on the map and checks for loops.
*/
const simulateGuard = (mapWithObstacle) => {
    let currentGuard = { ...guardPosition }; // Clone the guard's initial state
    const seenStates = new Set(); // Track visited states (position + direction)

    while (true) {
        const state = `${currentGuard.x},${currentGuard.y},${currentGuard.direction}`;
        if (seenStates.has(state)) return true; // Loop detected
        seenStates.add(state);

        const { x, y, direction } = currentGuard;

        switch (direction) {
            case Directions.UP:
                if (mapWithObstacle[y - 1]?.[x] === '#') {
                    currentGuard.direction = Directions.RIGHT; // Turn right
                } else if (mapWithObstacle[y - 1]?.[x] !== undefined) {
                    currentGuard.y -= 1; // Move up
                } else {
                    return false; // Exited the map
                }
                break;
            case Directions.RIGHT:
                if (mapWithObstacle[y]?.[x + 1] === '#') {
                    currentGuard.direction = Directions.DOWN; // Turn right
                } else if (mapWithObstacle[y]?.[x + 1] !== undefined) {
                    currentGuard.x += 1; // Move right
                } else {
                    return false; // Exited the map
                }
                break;
            case Directions.DOWN:
                if (mapWithObstacle[y + 1]?.[x] === '#') {
                    currentGuard.direction = Directions.LEFT; // Turn right
                } else if (mapWithObstacle[y + 1]?.[x] !== undefined) {
                    currentGuard.y += 1; // Move down
                } else {
                    return false; // Exited the map
                }
                break;
            case Directions.LEFT:
                if (mapWithObstacle[y]?.[x - 1] === '#') {
                    currentGuard.direction = Directions.UP; // Turn right
                } else if (mapWithObstacle[y]?.[x - 1] !== undefined) {
                    currentGuard.x -= 1; // Move left
                } else {
                    return false; // Exited the map
                }
                break;
            default:
                throw new Error('Invalid direction');
        }
    }
};

/*
    Counts valid positions for placing an obstacle to cause a loop.
*/
const countValidObstructionPositions = () => {
    let validPositions = 0;

    map.forEach((row, y) => {
        row.forEach((cell, x) => {
            // Skip positions that are already obstacles or the starting position
            if (cell === '#' || (x === guardPosition.x && y === guardPosition.y)) return;

            // Create a copy of the map with the new obstacle
            const mapWithObstacle = map.map((r, i) => [...r]);
            mapWithObstacle[y][x] = '#';

            // Check if this causes a loop
            if (simulateGuard(mapWithObstacle)) {
                validPositions++;
            }
        });
    });

    return validPositions;
};

// Find initial guard position
findInitialGuardPos();

// Count valid obstruction positions
const result = countValidObstructionPositions();
console.log(result);
