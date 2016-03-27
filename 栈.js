function Stack() {
    var items = [];

    /**
     * 从栈顶取元素
     * @returns {T}
     */
    this.pop = function() {
        return items.pop();
    };

    /**
     * 存入元素
     * @param element
     */
    this.push = function(element) {
        items.push(element)
    };

    /**
     * 获得栈顶元素
     * @returns {*}
     */
    this.top  = function() {
        return items[items.length-1];
    };

    /**
     * 判断栈是否为空
     * @returns {boolean}
     */
    this.isEmpty = function() {
        return items.length === 0;
    };

    /**
     * 获得栈的长度
     * @returns {Number}
     */
    this.size = function() {
        return items.length;
    };

    /**
     * 清空
     */
    this.clear = function() {
        items = [];
    };

    /**
     * 输出栈
     */
    this.print = function() {
        console.log(items.valueOf());
    }
}

/**
 * 进制转换
 * @param decNumber 基数
 * @param base 进制
 */
var baseConverter = (function (){
    var digits = '0123456789ABCDEF';
    return function(decNumber, base) {
        var stack = new Stack();
        while (decNumber > 0) {
            var rem = Math.floor(decNumber%base);
            stack.push(rem);
            decNumber = Math.floor(decNumber/base);
        }

        var  baseString = '';
        while(!stack.isEmpty()) {
            baseString += digits[stack.pop()];
        }
        return baseString;
    }
})();

// 测试
console.log(baseConverter(100345, 16)); // 187F9