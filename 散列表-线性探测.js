function HashTable() {
    var table = [];

    function ValuePair(key, value) {
        this.key = key;
        this.value = value;

        this.toString = function () {
            return '[' + this.key + '-' + this.value + ']';
        }
    }

    // hash加密
    var loseloseHashCode = function (key) {
        // 初始化一个hash变量,并赋值为一个质数
        //var hash = 5381;
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash = hash + key.charCodeAt(i); // 33为选定的魔法数
        }
        return hash % 37;

    };

    this.put = function (key, value) {
        // 获得Hash表中的位置
        var position = loseloseHashCode(key);
        if (table[position] === undefined) {
            table[position] = new ValuePair(key, value);
        } else {
            var index = ++position; // 从下一个位置开始
            // 直到找到空位
            while (table[index] != undefined) {
                index++;
            }
            table[index] = new ValuePair(key, value);
        }
    };

    this.remove = function (key) {
        var position = loseloseHashCode(key);
        if (table[position] === 'undefined') {
            return false;
        } else {
            var current = table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    table[position].remove(current.element);
                    // 如果删除完之后链表为空, 清空hash位置
                    if (table[position].isEmpty()) {
                        table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            // 如果链表仅含一个元素
            if (current.element.key === key) {
                table[position].remove(current.element);
                // 如果删除完之后链表为空, 清空hash位置
                if (table[position].isEmpty()) {
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    };

    this.get = function (key) {
        // 获得hash位置
        var position = loseloseHashCode(key);

        if(table[position] !== undefined ){
            if(table[position].key === key ){
                return table[position].value;
            } else {
                var index = ++position;
                while(table[index] === undefined || table[index].key !== key) {
                    index++;
                }
                if(table[index].key === key) {
                    return table[index].value;
                }
            }
        }
        return undefined;
    };

    this.print = function () {
        for (var i = 0; i < table.length; i++) {
            if (table[i] !== undefined) {
                console.log(i + ": " + table[i].value);
            }
        }
    }

}

// --------测试---------
var hash = new HashTable();
hash.put('Gandalf', 'gnadalf@gamil.com');
hash.put('John', 'johnsnow@gamil.com');
hash.put('Tyrion', 'tyrion@gamil.com');
hash.put('Aaron', 'aaron@gamil.com');
hash.put('Donnie', 'donnie@gamil.com');
hash.put('Ana', 'ana@gamil.com');
hash.put('Jonathan', 'jonathan@gamil.com');
hash.put('Jamie', 'jamie@gamil.com');
hash.put('Sue', 'sue@gamil.com');
hash.put('Mindy', 'mindy@gamil.com');
hash.put('Paul', 'paul@gamil.com');
hash.put('Nathan', 'nathan@gamil.com');

hash.print();