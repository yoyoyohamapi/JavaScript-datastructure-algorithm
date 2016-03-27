function Dictionary() {
    var items = {};

    this.set = function (key, value) {
        items[key] = value;
    };

    this.remove = function (key) {
        if(this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };

    this.has = function (key) {
        return items.hasOwnProperty(key);
    };

    this.get = function (key) {
        return items[key];
    };

    this.clear = function () {
        items = {};
    };

    this.size = function () {
        return this.keys().length;
    };

    this.keys = function () {
        return Object.keys(items);
    };

    this.values = function () {
        var values = [];
        for (var prop in items) {
            if (this.has(prop)) {
                values.push(items[prop]);
            }
        }
        return values;
    };

    this.getItems = function() {
        return items;
    }
}

// 测试
var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@gmail.com');
dictionary.set('John', 'john@gmail.com');
dictionary.set('Tyrion', 'tyrion@gmail.com');

console.log(dictionary.has('Gandalf'));

console.log(dictionary.size());

console.log(dictionary.keys());

console.log(dictionary.values());

console.log(dictionary.get('Tyrion'));

dictionary.remove('John');

console.log(dictionary.keys());

console.log(dictionary.values());