function AVLTree() {
    // 树的节点
    var Node = function (key) {
        this.key = key;
        this.left = null; // 左节点(左子树的根节点)
        this.right = null;
    };

    var root = null; // 树根

    /**
     * 获得树的高度
     */
    this.height = function () {
        return heightNode(root);
    };

    /**
     * 获得子树高度
     * @param node {Node} 子树根
     * @returns {number} 子树高度
     */
    var heightNode = function (node) {
        if (node === null) {
            return -1;
        } else {
            return Math.max(heightNode(node.left), heightNode(node.right)) + 1; // 高度取决于左右子树较大者,且从0开始
        }
    };

    /**
     * 插入值
     * @param key 待插入值
     */
    this.insert = function (key) {
        var node = new Node(key);
        if (root === null) {
            root = node;
        } else {
            root = insertNode(node, root)
        }
    };

    /**
     * 从根为node的子树插入节点node
     * @param node 待插入节点
     * @param root {Node} 子树根
     * @returns {Node} 新的子树根
     */
    var insertNode = function (node, root) {
        if (node.key < root.key) {
            root.left = root.left === null ? node : insertNode(node, root.left);
            // 左侧插入后,左子树变高, 失衡需要调整
            if (calcBalance(root) > 1) {
                if (node.key > root.left.key) {
                    root = LRRotate(root);
                }
                else if (node.key < root.left.key) {
                    root = LLRotate(root);
                }
            }
        }
        else if (node.key > root.key) {
            root.right = root.right === null ? node : insertNode(node, root.right);
            // 右侧插入后,右子树变高,失衡需要调整
            if (calcBalance(root) < -1) {
                if (node.key > root.right.key) {
                    root = RRRotate(root);
                }
                else if (node.key < root.right.key) {
                    root = RLRotate(root);
                }
            }
        }
        return root; // 新的子树根
    };

    /**
     * 计算节点的平衡因子
     * @param node {Node}
     * @return int
     */
    var calcBalance = function (node) {
        return heightNode(node.left) - heightNode(node.right);
    };

    /**
     * LL失衡
     * @param node {Node} 失去平衡的引子
     * @return {Node} 新的子树根
     */
    var LLRotate = function (node) {
        // 右旋
        var tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    };

    /**
     * RR失衡
     * @param node {Node} 失去平衡的引子
     * @return {Node} 新的子树根
     */
    var RRRotate = function (node) {
        // 左旋
        var tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    };

    /**
     * LR失衡
     * @param node {Node} 失去平衡的引子
     * @return {Node} 新的子树根
     */
    var LRRotate = function (node) {
        // 左旋
        node.left = RRRotate(node.left);
        // 此时呈LL, 再右旋
        return LLRotate(node);
    };

    /**
     * RL失衡
     * @param node {Node} 失去平衡的引子
     * @return {Node} 新的子树根
     */
    var RLRotate = function (node) {
        // 右旋
        node.right = LLRotate(node.right);
        // 此时呈RR,再左旋
        return RRRotate(node);
    };

    /**
     * 删除值为key的节点
     * @param key {number} 值
     */
    this.remove = function (key) {
        if (root === null)
            return false;
        else
            root = removeNode(key, root);
    };

    /**
     * 删除值为key的节点
     * @param key
     * @param node {Node} 子树根节点
     */
    var removeNode = function (key, node) {
        // 遍历查找待删除节点
        if (key < node.key) {
            // 在左子树中递归删除, 当前节点的左子树替换为删除后返回的替换节点
            node.left = removeNode(key, node.left);
        }
        else if (key > node.key) {
            node.right = removeNode(key, node.right);
        } else {
            // 找到删除节点
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                // 如果有两个子节点, 替换节点为当前节点的右子树的最小节点,
                var aux = minNode(node.right);
                node.key = aux.key;
                // 替换完成,删去最小节点
                node.right = removeNode(aux.key, node.right);
            }

        }
        if(node === null) {
            return null;
        }


        // 是否需要平衡化
        if (calcBalance(node) === 2) {
            // LL
            if (calcBalance(node.left) >=0) {
                node = LLRotate(node);
            } else {
                // LR
                node = RRRotate(node);
            }
        }
        if (calcBalance(node) === -2) {
            // RR
            if (calcBalance(node.right) <= 0) {
                node = RRRotate(node);
            } else {
                // RL
                node = RLRotate(node);
            }
        }

        // 替换删除节点
        return node;
    };

    var minNode = function (node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    };

    this.getRoot = function () {
        return root;
    }
}


// --------测试
var avlTree = new AVLTree();

avlTree.insert(1);
avlTree.insert(2);
avlTree.insert(3);
avlTree.insert(4);
avlTree.insert(5);
avlTree.insert(6);
avlTree.insert(7);
avlTree.insert(14);
avlTree.insert(15);
avlTree.insert(13);
avlTree.insert(12);
avlTree.insert(11);

//RR rotation
/*avlTree.insert(50);
 avlTree.insert(30);
 avlTree.insert(70);
 avlTree.insert(60);
 avlTree.insert(80);
 avlTree.insert(90);*/

//LL rotation
/*avlTree.insert(50);
 avlTree.insert(30);
 avlTree.insert(70);
 avlTree.insert(10);
 avlTree.insert(40);
 avlTree.insert(5);*/

//LR rotation
/*avlTree.insert(50);
 avlTree.insert(30);
 avlTree.insert(70);
 avlTree.insert(40);
 avlTree.insert(10);
 avlTree.insert(35);*/

//RL rotation
/*avlTree.insert(70);
 avlTree.insert(50);
 avlTree.insert(80);
 avlTree.insert(72);
 avlTree.insert(90);
 avlTree.insert(75);*/

console.log('********* raw data structure ***********');
//console.log(avlTree.getRoot());

//avlTree.remove(12);
avlTree.remove(15);
//avlTree.remove(11);
//avlTree.remove(14);
avlTree.remove(13);
//avlTree.remove(7);
//avlTree.remove(6);
//avlTree.remove(2);
//avlTree.remove(4);
console.log(avlTree.getRoot());