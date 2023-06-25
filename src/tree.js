import Node from './node';

export default class Tree {
    constructor(items) {
        // Sort array
        items.sort((a, b) => a > b);
        // Remove duplicates
        items = [...new Set(items)];
        this.root = this.build(items);
    }

    levelorder(fn, node = this.root) {
        let nodesToTraverse = [node];
        let values = [];
        while (nodesToTraverse.length > 0) {
            let currentNode = nodesToTraverse.shift();
            if (fn != null) fn(currentNode);
            else values.push(currentNode.data);
            // Enqueue any child nodes
            if (currentNode.left != null)
                nodesToTraverse.push(currentNode.left);
            if (currentNode.right != null)
                nodesToTraverse.push(currentNode.right);
        }
        if (!fn) return values;
    }

    rec_preorder(fn, node = this.root) {
        // Doesn't seem to be any faster than the non-recursive version. Possibly due to spread operator? Is there a faster way to concat arrays?
        if (!fn) {
            let values = [node.data];
            if (node.left != null)
                values.push(...this.rec_preorder(fn, node.left));
            if (node.right != null)
                values.push(...this.rec_preorder(fn, node.right));
            return values;
        } else {
            fn(node);
            if (node.left != null) this.rec_preorder(fn, node.left);
            if (node.right != null) this.rec_preorder(fn, node.right);
        }
    }

    preorder(fn, node = this.root) {
        // preorder - root, left, right
        let nodesToTraverse = [node];
        let values = [];
        while (nodesToTraverse.length > 0) {
            // This needs to be treated like a stack, not a queue! Push and pop!
            let currentNode = nodesToTraverse.pop();
            if (fn != null) fn(currentNode);
            else values.push(currentNode.data);
            // Add any child nodes to the stack. We want to look at the left node and pop it off the stack first, so push right child THEN left child
            if (currentNode.right != null)
                nodesToTraverse.push(currentNode.right);
            if (currentNode.left != null)
                nodesToTraverse.push(currentNode.left);
        }
        if (!fn) return values;
    }

    // recursive method
    inorder(fn, node = this.root) {
        // inorder - left, root, right
        if (!node.left && !node.right) {
            if (!fn) return [node.data];
            else {
                fn(node);
                return;
            }
        } else {
            if (!fn) {
                let values = [];
                if (node.left != null)
                    values = values.concat(this.inorder(fn, node.left));
                // root
                values = values.concat(node.data);
                if (node.right != null)
                    values = values.concat(this.inorder(fn, node.right));
                return values;
            } else {
                if (node.left != null) this.inorder(fn, node.left);
                // root
                fn(node);
                if (node.right != null) this.inorder(fn, node.right);
            }
        }
    }

    // recursive method
    postorder(fn, node = this.root) {
        // postorder - left, right, root
        if (!node.left && !node.right) {
            if (!fn) return [node.data];
            else {
                fn(node);
                return;
            }
        } else {
            if (!fn) {
                let values = [];
                if (node.left != null)
                    values = values.concat(this.postorder(fn, node.left));
                if (node.right != null)
                    values = values.concat(this.postorder(fn, node.right));
                values = values.concat(node.data);
                return values;
            } else {
                if (node.left != null) this.postorder(fn, node.left);
                if (node.right != null) this.postorder(fn, node.right);
                // root
                fn(node);
            }
        }
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

    height(node) {
        // Return zero if we want to count each connection between nodes as a unit of height, or return 1 if we want to count each layer of nodes as a unit of height
        if (!node?.left && !node?.right) return 0;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node) {
        let currentNode = this.root;
        let depth = 0;
        while (currentNode != null) {
            if (currentNode.data === node.data) return depth;
            else {
                depth++;
                currentNode =
                    node.data < currentNode.data
                        ? currentNode.left
                        : currentNode.right;
            }
        }
        // Node not found!
        return null;
    }

    delete(item, node = this.root) {
        let { target, parent, whichChild } = this.findItemAndParent(item, node);
        // If target is a leaf node
        if (!target.left && !target.right) parent[whichChild] = null;
        // If target has one child, grab its values, delete child, then replace target's values with those of child
        else if (!target.right) {
            let replacementNode = target.left;
            this.delete(replacementNode.data, target);
            Object.assign(target, replacementNode);
        } else if (!target.left) {
            let replacementNode = target.right;
            this.delete(replacementNode.data, target);
            Object.assign(target, replacementNode);
        } else {
            // If there are left and right children...
            // Find next largest node, i.e. right child then all the way to the left - this will be a leaf node so no worries about any child nodes
            let nextLargestNode = this.findSmallestItemInTree(target.right);
            // Grab nextLargestNode.data before deleting that node and then assigning value to target.data
            // Otherwise, we will have a duplicate value in our tree - very bad!
            let newData = nextLargestNode.data;
            this.delete(nextLargestNode.data, target);
            target.data = newData;
        }
    }

    findItemAndParent(item, node = this.root) {
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

    find(item, node = this.root) {
        while (node != null) {
            if (node.data === item) return node;
            else node = item < node.data ? node.left : node.right;
        }
        // No node found!
        console.warn(`Looked for ${item} in Tree - not found.`);
        return null;
    }

    findSmallestItemInTree(node = this.root) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    findLargestItemInTree(node = this.root) {
        while (node.right != null) {
            node = node.right;
        }
        return node;
    }

    build(items) {
        // Sort the array before giving to this recursive function, or else it will get sorted in EVERY iteration. Only needs to be sorted once
        // If provided an empty array of items, then return null (i.e. the Node that called the iteration will have null for left or right child)
        if (items.length <= 0) return null;
        // If there is only 1 item left, return a leaf node (i.e. one with no children)
        if (items.length === 1) return new Node(items[0]);
        // Otherwise, find halfway point of sorted array and build a tree out of that
        let midpoint = Math.floor(items.length / 2);
        return new Node(
            items[midpoint],
            this.build(items.slice(0, midpoint)),
            this.build(items.slice(midpoint + 1))
        );
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    }
}
