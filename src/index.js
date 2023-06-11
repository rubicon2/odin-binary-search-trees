import './style.css';
import Tree from './tree';

// let myAmazingTree = new Tree([2, 3, 6, 7, 9, 28, 67, 97]);
// works with 3 numbers but no more or less
let myAmazingTree = new Tree(
    [200, 2, 4, 6, 8, 14, 28, 82, 300].sort((a, b) => a > b)
);
Tree.prettyPrint(myAmazingTree.root);
