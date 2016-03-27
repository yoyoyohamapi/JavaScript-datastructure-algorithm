function Set() {
    this.items = {};


}

Set.prototype.add = function (value) {
    // 集合需要是非重复的
    if (!this.has(value)) {
        this.items[value] = value;
        return true;
    }
    return false;
};

Set.prototype.remove = function (value) {
    if (!this.has(value)) {
        delete this.items[value];
        return true;
    }
    return false;
};

Set.prototype.has = function (value) {
    return this.items.hasOwnProperty(value);
};

Set.prototype.clear = function () {
    this.items = {};
};

Set.prototype.size = function () {
    return Object.keys(this.items);
};

Set.prototype.values = function () {
    return Object.keys(this.items);
};

/**
 * 交集
 * @param otherSet {Set}
 * @returns {Set}
 */
Set.prototype.intersectioon = function (otherSet) {
    var newSet = new Set();
    for (var prop in this.items) {
        if (otherSet.has(prop)) {
            newSet.add(prop);
        }
    }
    return newSet;
};

/**
 * 并集
 * @param otherSet {Set}
 * @returns {Set}
 */
Set.prototype.union = function (otherSet) {
    var newSet = new Set(),
        prop;
    for (prop in this.items) {
        if (this.has(prop)) {
            newSet.add(prop);
        }
    }
    for (prop in otherSet.items) {
        if (!newSet.has(prop)) {
            newSet.add(prop);
        }
    }
    return newSet;
};

/**
 * 差集
 * @param otherSet {Set}
 * @returns {Set}
 */
Set.prototype.difference = function (otherSet) {
    var newSet = new Set(),
        prop;
    for (prop in this.items) {
        if (this.has(prop) && !otherSet.has(prop)) {
            newSet.add(prop);
        }
    }
    return newSet;
};

/**
 * 子集
 * @param otherSet {Set}
 * @returns {boolean}
 */
Set.prototype.subset = function (otherSet) {
    for (var prop in otherSet.items) {
        if (otherSet.has(prop) && !this.has(prop)) {
            return false;
        }
    }
    return true;
};

// 测试
var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
console.log(setA.values());
var setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

var unionAB = setA.union(setB);
console.log(unionAB.values());

var intersectionAB = setA.intersectioon(setB);
console.log(intersectionAB.values());

var difference = setA.difference(setB);
console.log(difference.values());

var isSubset = setA.subset(setB);
console.log(isSubset);

var setC = new Set();
setC.add(3);

console.log(setA.subset(setC));
