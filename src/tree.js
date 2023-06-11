import Node from './node';

export default class Tree {
    constructor(items) {
        // sort array

        // remove duplicates

        this.root = Tree.build(items);
    }

    static build(items) {
        // Sort the array before giving to this recursive function, or else it will get sorted in EVERY iteration. Only needs to be sorted once
        // If provided an empty array of items, then return null (i.e. the Node that called the iteration will have null for left or right child)
        if (items.length <= 0) return null;
        // If there is only 1 item left, return a leaf node (i.e. one with no children)
        if (items.length === 1) return new Node(items[0]);
        // Otherwise, find halfway point of sorted array and build a tree out of that
        let midpoint = Math.floor(items.length / 2);
        return new Node(
            items[midpoint],
            Tree.build(items.slice(0, midpoint)),
            Tree.build(items.slice(midpoint + 1))
        );
    }

    static prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            Tree.prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            Tree.prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    }
}
