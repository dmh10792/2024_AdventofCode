

const fs = require('fs');

let rules;
let pages;
let result = 0;

//Where things actually happen
try {
    let input = fs.readFileSync('input.txt', 'utf8').split(/\n\n/);
    rules = input[0].split(/\n/);
    pages = input[1].split(/\n/);
} catch (error) {
    console.log(error)
}

const checkPages = () => {
    //for each page
    pages.forEach(pageList => {
        let safe = true;
        //for each rule
        for(let i = 0; i < rules.length; i++) {
            let rule = rules[i].split(/\|/);
            //check if both pages are in the pages list
            if(pageList.includes(rule[0]) && pageList.includes(rule[1])) {
                //if it is make sure the rule is followed
                let firstPageIndex = pageList.indexOf(rule[0]);
                let secondPageIndex = pageList.indexOf(rule[1]);

                if(firstPageIndex > secondPageIndex) {
                    //if not mark it as not safe
                    safe = false;
                }
            }
                

        }

        //if the list is safe
        if(safe) {
            let numList = pageList.split(/,/);
            //find the middle element
            let len = numList.length;
            //console.log(Math.floor(len/2));
            result += Number(numList[Math.floor(len/2)])
        }

    });

    console.log(result);
     
}

checkPages();
//console.log(pages[0]);

