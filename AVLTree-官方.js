function AVLTree() {

    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    this.getRoot = function(){
        return root;
    };

    var heightNode = function(node) {
        if (node === null) {
            return -1;
        } else {
            return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
        }
    };

    var rotationLL = function(node) {
        var tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;

        return tmp;
    };

    var rotationRR = function(node) {
        var tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;

        return tmp;
    };

    var rotationLR = function(node) {
        node.left = rotationRR(node.left);
        return rotationLL(node);
    };

    var rotationRL = function(node) {
        node.right = rotationLL(node.right);
        return rotationRR(node);
    };

    var insertNode = function(node, element) {

        if (node === null) {
            node = new Node(element);

        } else if (element < node.key) {

            node.left = insertNode(node.left, element);

            if (node.left !== null) {

                if ((heightNode(node.left) - heightNode(node.right)) > 1){
                    if (element < node.left.key){
                        node = rotationLL(node);
                    } else {
                        node = rotationLR(node);
                    }
                }
            }
        } else if (element > node.key) {

            node.right = insertNode(node.right, element);

            if (node.right !== null) {

                if ((heightNode(node.right) - heightNode(node.left)) > 1){

                    if (element > node.right.key){
                        node = rotationRR(node);
                    } else {
                        node = rotationRL(node);
                    }
                }
            }
        }

        return node;
    };

    this.insert = function(element) {
        root = insertNode(root, element);
    };

    var parentNode;
    var nodeToBeDeleted;

    var removeNode = function(node, element) {
        if (node === null) {
            return null;
        }
        parentNode = node;

        if (element < node.key) {
            node.left = removeNode(node.left, element);
        } else {
            nodeToBeDeleted = node;
            node.right = removeNode(node.right, element);
        }

        if (node === parentNode) { //remove node
            if (nodeToBeDeleted !== null && element === nodeToBeDeleted.key) {
                if (nodeToBeDeleted === parentNode) {
                    node = node.left;
                } else {
                    var tmp = nodeToBeDeleted.key;
                    nodeToBeDeleted.key = parentNode.key;
                    parentNode.key = tmp;
                    node = node.right;
                }
            }
        } else { //do balancing

            if (node.left === undefined) node.left = null;
            if (node.right === undefined) node.right = null;

            if ((heightNode(node.left) - heightNode(node.right)) === 2) {
                if (element < node.left.key) {
                    node = rotationLR(node);
                } else {
                    node = rotationLL(node);
                }
            }

            if ((heightNode(node.right) - heightNode(node.left)) === 2) {
                if (element > node.right.key) {
                    node = rotationRL(node);
                } else {
                    node = rotationRR(node);
                }
            }
        }

        return node;
    };

    this.remove = function(element) {
        parentNode = null;
        nodeToBeDeleted = null;
        root = removeNode(root, element);
    };
}

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