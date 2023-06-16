import Node from './node';

export default class Tree {
    constructor(items) {
        // Sort array
        items.sort((a, b) => a > b);
        // Remove duplicates
        items = [...new Set(items)];
        this.root = Tree.build(items);
    }

    insert(item) {
        let currentNode = this.root;
        let searchingForInsertPoint = true;
        while (searchingForInsertPoint) {
            if (currentNode.data === item) {
                // Do nothing, no duplicates allowed in Tree
                break;
            } else if (item < currentNode.data) {
                if (currentNode.left) currentNode = currentNode.left;
                else {
                    currentNode.left = new Node(item);
                    break;
                }
            } else if (item > currentNode.data) {
                if (currentNode.right) currentNode = currentNode.right;
                else {
                    currentNode.right = new Node(item);
                    break;
                }
            }
        }
    }

    static delete(node, item) {
        let { target, parent, whichChild } = Tree.findItemAndParent(node, item);
        // If target is a leaf node
        if (!target.left && !target.right) parent[whichChild] = null;
        // If target has one child, grab its values, delete child, then replace target's values with those of child
        else if (!target.right) {
            let replacementNode = target.left;
            this.delete(target, replacementNode.data);
            Object.assign(target, replacementNode);
        } else if (!target.left) {
            let replacementNode = target.right;
            this.delete(target, replacementNode.data);
            Object.assign(target, replacementNode);
        } else {
            // If there are left and right children...
            // Find next largest node, i.e. right child then all the way to the left - this will be a leaf node so no worries about any child nodes
            let nextLargestNode = this.findSmallestItemInTree(target.right);
            // Grab nextLargestNode.data before deleting that node and then assigning value to target.data
            // Otherwise, we will have a duplicate value in our tree - very bad!
            let newData = nextLargestNode.data;
            this.delete(target, nextLargestNode.data);
            target.data = newData;
        }
    }

    static findItemAndParent(node, item) {
        if (node.data === item)
            return { parent: null, target: node, whichChild: null };

        let currentNode = node;
        while (currentNode != null) {
            if (currentNode.left?.data === item)
                return {
                    parent: currentNode,
                    target: currentNode.left,
                    whichChild: 'left',
                };
            else if (currentNode.right?.data === item)
                return {
                    parent: currentNode,
                    target: currentNode.right,
                    whichChild: 'right',
                };
            else {
                currentNode =
                    item < currentNode.data
                        ? currentNode.left
                        : currentNode.right;
            }
        }
        // No node found!
        console.warn(`Looked for ${item} in Tree - not found.`);
        return null;
    }

    static find(node, item) {
        let currentNode = node;
        while (currentNode != null) {
            if (currentNode.data === item) return currentNode;
            else {
                currentNode =
                    item < currentNode.data
                        ? currentNode.left
                        : currentNode.right;
            }
        }
        // No node found!
        console.warn(`Looked for ${item} in Tree - not found.`);
        return null;
    }

    static findSmallestItemInTree(node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    static findLargestItemInTree(node) {
        while (node.right != null) {
            node = node.right;
        }
        return node;
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
