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

console.log('POST ORDER');
console.log(myAmazingTree.postorder());

console.log('IN ORDER');
console.log(myAmazingTree.inorder());

console.log('LEVEL ORDER');
console.log(myAmazingTree.levelorder());

console.time('old pre');
console.log('PRE ORDER');
console.log(myAmazingTree.preorder());
console.timeEnd('old pre');

console.time('rec pre');
console.log('REC PRE ORDER');
console.log(myAmazingTree.rec_preorder());
console.timeEnd('rec pre');
