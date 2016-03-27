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
        while(current.next){
            if(current.element === element) {
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
        while(current.next) {
            baseString += current.element + ',';
            current = current.next;
        }
        console.log(baseString);
    };

    /**
     * 获得链表头
     * @returns {Node|*|HTMLHeadElement}
     */
    this.getHead = function() {
        return this.head;
    }
}

// ---------测试-------------
var link = new LinkList();
var numbers = [0,1,2,3,4,5];
for(var i= 0,length=numbers.length;i<length;i++) {
    link.append(numbers[i]);
}

link.print();

link.removeAt(1);
link.print();
link.remove(2);
link.print();

