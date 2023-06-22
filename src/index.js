import './style.css';
import Tree from './tree';

let myAmazingTree = new Tree([200, 2, 4, 6, 8, 14, 28, 82, 300, 300, 14]);

myAmazingTree.insert(5);
myAmazingTree.prettyPrint();
console.log(myAmazingTree.findSmallestItemInTree(myAmazingTree.root.right));
console.log(myAmazingTree.findLargestItemInTree(myAmazingTree.root.left));

console.log(myAmazingTree.height(myAmazingTree.root));

myAmazingTree.delete(6);
myAmazingTree.delete(14);
myAmazingTree.prettyPrint();
