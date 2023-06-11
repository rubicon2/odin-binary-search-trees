export default class Node {
    constructor(data = null, leftChild = null, rightChild = null) {
        this.data = data;
        this.left = leftChild;
        this.right = rightChild;
    }
}
