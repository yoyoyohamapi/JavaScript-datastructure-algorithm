function BST() {
    function Node(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    var root = null;

    /**
     * 插入值
     * @param key
     */
    this.insert = function (key) {
        if (root == null) {
            root = new Node(key)
        } else {
            insertNode(root, key);
        }
    };

    /**
     * 插入节点
     * @param node {Node}
     * @param key
     */
    var insertNode = function (node, key) {
        if (key < node.key) {
            if (node.left === null) {
                node.left = new Node(key);
            } else {
                // 递归在左子树插入
                insertNode(node.left, key);
            }
        }
        if (key > node.key) {
            if (node.right === null) {
                node.right = new Node(key);
            } else {
                // 递归在右子树进行插入
                insertNode(node.right, key);
            }
        }
    };

    this.search = function (key) {
        return searchNode(root, key);
    };

    /**
     * 搜索节点
     * @param node
     * @param key
     */
    var searchNode = function (node, key) {
        if (node === null) {
            return false;
        } else if (key < node.key) {
            return searchNode(node.left, key);
        } else if (key > node.key) {
            return searchNode(node.right, key);
        } else {
            return true;
        }
    };

    /**
     * 中序遍历, 用于排序
     * @param node {Node} 当前子树根节点
     * @param callback {Function} 对节点的操作
     */
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback);
    };

    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            // 递归遍历左子树
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            // 递归遍历右子树
            inOrderTraverseNode(node.right, callback);
        }
    };

    /**
     * 先序遍历, 可用来打印一个结构化的文档html-->body--->div
     * @param node {Node} 当前子树根节点
     * @param callback {Function} 回调函数
     */
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback);
    };

    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    };

    /**
     * 后序遍历, 由深入浅, 可用来获得子目录到当前目录的大小
     * @param node {Node} 当前子树根节点
     * @param callback {Function} 回调函数
     */
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root,callback);
    };

    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    };

    /**
     * 获得最小值
     */
    this.min = function () {
        var node = minNode(root);
        return node === null ? null : node.key;
    };

    var minNode = function (node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    };

    /**
     * 获得最大值
     * @returns {*}
     */
    this.max = function () {
        var node = maxNode(root);
        return node === null ? null : node.key;
    };

    var maxNode = function (node) {
        while (node.right) {
            node = node.right;
        }
        return node;
    };

    /**
     * 删除一个值为key的节点
     * @param key
     */
    this.remove = function (key) {
        root = removeNode(root, key);
    };

    var removeNode = function (node, key) {
        if (node === null) {
            return null;
        } else {
            // 遍历找到待删除的节点
            if (key < node.key) {
                // 在左子树进行删除,当前节点左子树替换为替换节点
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = removeNode(node.right, key);
                return node;
            } else {
                // 如果待删除节点是一个叶子节点
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }

                // 如果待删除节点只有一个子节点
                if (node.left === null) {
                    // 用右节点进行替换
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                }

                // 如果有两个子节点(此时待删除节点的值是一个中间值),需要找到下一个中间值替换, 显然就是最右子树中的最小节点
                var aux = minNode(node.right);
                node.key = aux.key;
                // 替换完成,删除最右子树的最小节点
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        }
    };
}

// -------测试---------
var tree = new BST();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

function print(key) {
    console.log(key + " ");
}
tree.inOrderTraverse(print);
console.log("-----------");
tree.preOrderTraverse(print);
console.log("-----------");
tree.postOrderTraverse(print);
console.log("-----------");

tree.remove(6);
tree.preOrderTraverse(print);
console.log("-----------");
tree.remove(5);
tree.preOrderTraverse(print);
console.log("-----------");
tree.remove(15);
tree.preOrderTraverse(print);
