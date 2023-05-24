// let foo = Symbol();
// let bar = Symbol();

// if(foo === bar) {
//     console.log("같습니다.");
// } else {
//     console.log("유일성 보장으로 서로 다릅니다.")
//     console.log(foo);
//     console.log(bar);
// }

// let lim = {
//     firstname: "seoyoung",
//     lastname: "lim",
//     age: 25,
//     address: "incheon"
// };

// console.log(lim);
// console.log(lim.age);

// // print all fruits
// for (let i=0; i<fruits.length; i++) {
//     console.log(fruits[i]);
// }

// for (let fruit of fruits) {
//     console.log(fruit);
// }

// fruits.forEach((fruit, index) => console.log(fruit, index));

// const fruits = ['🍎','🍌'];
// console.log(fruits);
// console.log(fruits.length);
// console.log(fruits[0]);
// console.log(fruits[fruits.length-1]);

// // push: add an item to the end
// fruits.push('🍒','🥑');
// console.log(fruits);

// // pop: remove an item from the end
// fruits.pop();
// console.log(fruits);

// let x = 10;
// let y = 4;
// let result = 0;
// result = ++x - y;
// console.log(result);
// console.log(x);

const date = new Date();
const hour = date.getHours();

console.log('년도 ' + date.getFullYear());
console.log('월 ' + date.getMonth() + 1);
console.log('일 ' + date.getDate());
console.log('시 ' + date.getHours());
console.log('분 ' + date.getMinutes());
console.log('초 ' + date.getSeconds());

if (hour < 12) {
    alert('오전입니다.');
}

if (hour >= 12) {
    alert('오후입니다.');
}
