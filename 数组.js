// 数组的存取
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(typeof numbers); // "object"
console.log(Object.prototype.toString.call(numbers)); // "[object Array]", 可用来判定数组

// 从尾部追加元素
numbers.push(10);
// 从尾部取出元素
numbers.pop();
// 插入元素到首位
numbers.unshift(-1);
// 从头部取出元素
numbers.shift();
// 对应位置删除元素
numbers.splice(5, 3, 5, 6, 7);
// 从numbers[5]开始删除,删除numbers[5],numbers[6],numbers[7], 并且从删除位置开始, 依次插入5,6,7
console.log(numbers.toString()); // "0,1,2,3,4,5,6,7,8,9"
console.log(numbers.valueOf()); // "[0,1,2,3,4,5,6,7,8,9]"

// concat是支持多个参数的, 但该方法不是原地的
numbers.concat([10, 11, 12, -1, -2, -3]);
console.log(numbers.toString()); // "0,1,2,3,4,5,6,7,8,9"
numbers = numbers.concat([10, 11, 12, -1, -2, -3]);
console.log(numbers.toString()); // "0,1,2,3,4,5,6,7,8,9,10,11,12,-1,-2,-3"

// every
var isEven = function (x) {
    return (x % 2 !== 0);
};

console.log(numbers.every(isEven)); // false
console.log(numbers.some(isEven)); // true

// forEach无法返回值(更新)
numbers.forEach(function (x) {
    x = x + 2;
    return x;
});

console.log(numbers.valueOf()); // "[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, -1, -2, -3 ]"

// map会返回值
var myMap = numbers.map(isEven);

console.log(myMap.toString()); // "false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true"

// reduce中,回调函数第一个值为上一次的计算结果
var reduced = numbers.reduce(function (previous, current, index) {
    return previous + current;
});

console.log(reduced); //72

// 倒置
numbers.reverse();

// 倒置是原地的
console.log(numbers);

// 排序是原地的,且其是以字母序(ASCII码)排序
numbers.sort();

console.log(numbers); // "[ -3, -2, -1, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]"

numbers.sort(function (a, b) {
    return a - b;
});

console.log(numbers); // "[ -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]"

// 利用localeComapre排序,支持不同的语系,重音等
var names = ['Maven', 'Laravel'];
console.log(names.sort(function (a, b) {
    a.localeCompare(b);
}));

