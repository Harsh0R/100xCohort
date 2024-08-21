const fs = require("fs");

const data1 = fs.readFileSync("b.txt", "utf8");
console.log(data1);
const data = fs.readFileSync("a.txt", "utf8");
console.log(data);

