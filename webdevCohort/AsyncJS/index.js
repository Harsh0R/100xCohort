const { log } = require("console");
const fs = require("fs");

// const data1 = fs.readFileSync("b.txt", "utf8");
// console.log(data1);
// const data = fs.readFileSync("a.txt", "utf8");
// console.log(data);


const printData = (data) => {
  console.log(data);
};

fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) throw err;
  printData(data);
});

fs.readFile("b.txt", "utf8", (err, data) => {
  if (err) throw err;
  printData(data);
});


log("Hello from from index.js");