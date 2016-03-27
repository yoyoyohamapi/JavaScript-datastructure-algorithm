function DoublyLinkedList() {
    var Node = function (element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    };

    var length = 0;
    var head = null;
    var tail = null;

    this.insert = function (position, element) {
        if (position > -1 && position <= length) {
            var node = new Node(element);

            if (!head) {
                head = node;
                tail = node;
            } else {
                var index = 0;
                var current = head, prev;
                while (index != position) {
                    prev = current;
                    current = current.next;
                    index++;
                }
                prev.next = node;
                node.prev = prev;
                node.next = current;
                current.prev = node;
            }
            length++;
        }
    };

    this.append = function (element) {
        var node = new Node(element);

        if (this.isEmpty()) {
            head = node;
            tail = node;
        } else {
            tail.next = node;
            node.prev = tail;
            tail = node;
        }
        length++;
    };

    this.indexOf = function (element) {
        var current = head;
        var index = 0;
        while (current.next) {
            if (current.element === element) {
                return index;
            }
            ++index;
            current = current.next;
        }
        return -1;
    };

    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            var current;
            if(position === 0) {
                current = head;
                if(head === tail) {
                    head = tail = null;
                } else {
                    head = head.next;
                    head.prev = null;
                }
            } else {
                // 照顾性能
                var index;
                if( position>= length/2) {
                    // 从尾部开始查找
                    current = tail;
                    var next;
                    index = length-1;
                    while(index!=position) {
                        next = current;
                        current = current.prev;
                        --index;
                    }
                    next.prev = current.prev;
                    current.prev.next = next;
                } else {
                    // 从头部开始查找
                    current = head;
                    var prev;
                    index = 0;
                    while(index!=position) {
                        prev = current;
                        current = current.next;
                        ++index;
                    }
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
            }
            length--;
            return current;
        }
        return null;
    };

    this.remove = function (element) {
        var position = this.indexOf(element);
        this.removeAt(position);
    };

    this.isEmpty = function () {
        return length === 0;
    };

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
        while(current.next) {
            baseString += current.element + ',';
            current = current.next;
        }
        console.log(baseString);
    };
}

// ---------测试-------------
var link = new DoublyLinkedList();
var numbers = [0,1,2,3,4,5];
for(var i= 0,length=numbers.length;i<length;i++) {
    link.append(numbers[i]);
}

link.print();

link.removeAt(1);
link.print();
link.remove(2);
link.print();

link.insert(1,5);
link.print();
