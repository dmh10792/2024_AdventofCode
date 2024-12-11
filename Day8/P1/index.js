const fs = require('fs');

try {
    let input = fs.readFileSync('TestInput.txt', 'utf8').split(/\n/);
} catch (error) {
    console.log(error);
}

