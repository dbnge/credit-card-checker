// Valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// Invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]; //invalid
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]; //invalid
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]; //invalid
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];


// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


//Steps to validate credit card number https://www.google.com/search?q=credit-card-checker+diagram&tbm=isch&ved=2ahUKEwiOy46R06_3AhUQM-wKHdjNBI8Q2-cCegQIABAA&oq=credit-card-checker+diagram&gs_lcp=CgNpbWcQAzIHCCMQ7wMQJzIHCCMQ7wMQJ1DFAljFAmCLBGgAcAB4AIABT4gBlwGSAQEymAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=Wc5mYs66GJDmsAfYm5P4CA&bih=788&biw=1440&rlz=1C5GCEM_enDE999DE1000#imgrc=nYcT0SrXTCbppM

//Validation function 
const validateCred = card => {

    //Starting from the farthest digit to the right, AKA the check digit, iterate to the left
    let newArr = card.slice().reverse();
    //As iterating through arry...
    for (let i = 0; i < newArr.length; i++) {
        //...every other digit is doubled ...
        if (i % 2 !== 0) {
            newArr[i] = newArr[i] *= 2;
        }
        //...and if number is greater than 9 after doubling, subtract 9 from its value
        if (newArr[i] > 9) {
            newArr[i] = newArr[i] -= 9;
        }
    }
    //Sum up all digits after previous steps
    const sum = newArr.reduce((a, b) => a + b, 0);
    //If sum modulo 10 is 0 the number is valid, otherwise invalid
    return sum % 10 === 0;
}

//Batch processing function
const findInvalidCards = cards => {
    let invalidCards = [];

    for (const card of cards) {
        if (validateCred(card) === false) {
            invalidCards.push(card);
        }
    }
    return invalidCards;
}        

//Batch processing function - Return bank company name based on check digit (Amex=3, Visa=4, Mastercard=5, Discover=6)
const idInvalidCardCompanies = cards => {

    //Invoke findInvalidCards function
    let invalidCards = findInvalidCards(cards);
    //Reverse nested array (.map() calls a isArray method on every element in the calling array, if true reverse, else return false)
    invalidCards.map(arr => Array.isArray(arr) ? arr.reverse() : false);
    
    let companyList = [];

    //Iterate through each element of invalidCards and based on number in index [0] push bank company name to companyList 
    for (const card of invalidCards) {
        if (card[0] === 3) {
            companyList.push('Amex');
        }
        if (card[0] === 4) {
            companyList.push('Visa');
        }
        if (card[0] === 5) {
            companyList.push('Mastercard');
        }
        if (card[0] === 6) {
            companyList.push('Discover');
        }
    }

    //Removing duplicates (elements that pass the test implemented by the function will be added)
    let removedDuplicates = companyList.filter((element, index) => companyList.indexOf(element) === index);

    return removedDuplicates;
}
    

//Test
console.log(validateCred(mystery1));

console.log(findInvalidCards(batch));

console.log(idInvalidCardCompanies(batch));


