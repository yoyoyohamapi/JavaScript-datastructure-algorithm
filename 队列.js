function Queue() {
    var items = [];

    /**
     * 出队
     * @returns {T}
     */
    this.dequeue = function () {
        return items.shift();
    };

    /**
     * 入队
     * @param elem
     */
    this.enqueue = function (elem) {
        items.push(elem);
    };

    /**
     * 判断队列是否为空
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return items.length === 0;
    };

    /**
     * 获得队列大小
     * @returns {Number}
     */
    this.size = function () {
        return items.length;
    };

    /**
     * 获得队头元素
     * @returns {*}
     */
    this.front = function () {
        return items[0];
    }


}


function PriorityQueue() {
    var items = [];

    // 现在队列元素除了需要保存值以外还需要保存优先级
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    /**
     * 入队
     * @param elem
     */
    this.enqueue = function (elem) {
        // 如果当前队列为空, 直接入队
        if (this.isEmpty()) {
            items.push(elem);
        } else {
            var added = false;
            // 遍历当前队列
            for (var i = 0, length = this.size(); i < length; i++) {
                // 如果当前优先级较低
                if (items[i].priority > elem.priority) {
                    items.splice(i, 0, elem);
                    added = true;
                    break;
                }
            }
            // 如果遍历完仍然没有插入
            if (!added)
                items.push(elem);
        }
    };

    /**
     * 出队
     */
    this.dequeue = function () {
        this.shift();
    };

    /**
     * 判断队列是否为空
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return items.length === 0;
    };

    /**
     * 获得队列大小
     * @returns {Number}
     */
    this.size = function () {
        return items.length;
    };

    /**
     * 获得队头元素
     * @returns {*}
     */
    this.front = function () {
        return items[0];
    }

}

// 测试,击鼓传花
function hotPotato(nameList, num) {
    var queue = new Queue();

    // 先初始化队列
    for (var i = 0, length = nameList.length; i < length; i++) {
        queue.enqueue(nameList[i]);
    }

    while (queue.size() > 1) {
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        console.log(queue.dequeue()+"被淘汰了");
    }

    console.log("胜利者: " + queue.dequeue());
}

var nameList = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];

hotPotato(nameList, 7);