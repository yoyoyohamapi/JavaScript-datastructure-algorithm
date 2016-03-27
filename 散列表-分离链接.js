function LinkList() {
    var Node = function (element) {
        this.element = element;
        this.next = null;
    };

    var length = 0;
    var head = null;

    /**
     * 向列表中插入元素
     * @param element
     */
    this.append = function (element) {
        var node = new Node(element);
        if (this.isEmpty()) {
            head = node;
        } else {
            var current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }

        length++;
    };

    /**
     * 在对应位置插入元素
     * @param position
     * @param element
     */
    this.insert = function (position, element) {
        var node = new Node(element);
        // 需要时有效位置
        if (position > -1 && position < this.size()) {
            // 如果是在头部插入元素
            if (position === 0) {
                if (this.isEmpty()) {
                    head = node;
                } else {
                    node.next = head;
                }
            } else {
                var current = head, previous;
                var index = 0;
                while (index != position) {
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
        }
    };

    /**
     * 删除对应位置的元素
     * @param position
     * @returns {*}
     */
    this.removeAt = function (position) {
        // 需要是有效位置
        if (position > -1 && position < this.size()) {
            var current = head;
            if (position === 0) {
                head = current.next;
            } else {
                var index = 0;
                var previous;
                while (index != position) {
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = current.next;
            }
            length--;
            return current;
        } else {
            return null;
        }
    };

    /**
     * 根据元素进行删除
     * @param element
     */
    this.remove = function (element) {
        var position = this.indexOf(element);
        this.removeAt(position);
    };

    /**
     * 获得对应元素的位置
     * @param element
     * @returns {number}
     */
    this.indexOf = function (element) {
        var current = head;
        var index = 0;
        while (current.next) {
            if (current.element === element) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    };

    /**
     * 判断链表是否为空
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return length === 0;
    };

    /**
     * 获得链表大小
     * @returns {*}
     */
    this.size = function () {
        return length;
    };

    /**
     * 输出链表
     * @returns {string}
     */
    this.print = function () {
        var current = head;
        var baseString = '';
        while (current) {
            baseString += current.element.key + '|' + current.element.value + ',';
            current = current.next;
        }
        return baseString;
    };

    /**
     * 获得链表头
     * @returns {Node|*|HTMLHeadElement}
     */
    this.getHead = function () {
        return this.head;
    }
}


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
            hash = hash  + key.charCodeAt(i); // 33为选定的魔法数
        }
        return hash % 37;

    };

    this.put = function (key, value) {
        // 获得Hash表中的位置
        var position = loseloseHashCode(key);
        if (table[position] === undefined) {
            table[position] = new LinkList();
        }
        table[position].append(new ValuePair(key, value));
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
        if (table[position] === 'undefined')
            return undefined;
        else {
            var current = table[position].getHead();

            while (current.next) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next
            }

            // 如果链表仅含一个元素
            if (current.element.key === key) {
                return current.element.value;
            }
        }
    };

    this.print = function () {
        for (var i = 0; i < table.length; i++) {
            if (table[i] !== undefined) {
                console.log(i + ": " + table[i].print());
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