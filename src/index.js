import './style.css';
import Tree from './tree';

let myAmazingTree = new Tree([200, 2, 4, 6, 8, 14, 28, 82, 300]);
Tree.prettyPrint(myAmazingTree.root);
