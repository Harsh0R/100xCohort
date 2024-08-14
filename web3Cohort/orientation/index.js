const crypto = require('crypto');

// region hashing function
const hashingFunc = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex')
}

const findHashWithPrefix = (prefix) => {
    let num = 0;
    while (true) {
        let hash = hashingFunc(num.toString());
        if (hash.startsWith(prefix)) {
            return {hash , num};
        }
        num++;
    }
}
const findHashWithPrefixOfInputAndOutput = (IPprifix ,OPprefix) => {
    let nounce = 0;
    // let input =`
    // harkirat => Raman | Rs 100
    // Ram => Ankit | Rs 10`
    while (true) {
        let IPstr = IPprifix+nounce.toString()
        // let IPstr = input+nounce.toString()
        let hash = hashingFunc(IPstr);
        if (hash.startsWith(OPprefix)) {
            return {hash , IPstr};
        }
        nounce++;
    }
}




const hash = hashingFunc('Hello');
const hashWithPrefix = findHashWithPrefix('00000')
const hashWithPrefixOfInputAlso = findHashWithPrefixOfInputAndOutput('HarshRadadiya','000000')

// console.log(hash)
console.log(hashWithPrefixOfInputAlso.IPstr , '=>',hashWithPrefixOfInputAlso.hash)