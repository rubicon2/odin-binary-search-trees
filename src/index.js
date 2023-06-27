import './style.css';
import Tree from './tree';

function getRangedRandom(min, max) {
    return min + (max - min) * Math.random();
}

function getRangedRandomInt(min, max) {
    return Math.round(getRangedRandom(min, max));
}

function getRangedRandomArray(min, max, arrayLength) {
    let numbers = [];
    while (numbers.length <= arrayLength) {
        numbers.push(getRangedRandom(min, max));
    }
    return numbers;
}

function getRangedRandomIntArray(min, max, arrayLength) {
    let ints = [];
    while (ints.length <= arrayLength) {
        ints.push(getRangedRandomInt(min, max));
    }
    return ints;
}

// Odin - Tie it all together...

// 1
let myAmazingTree = new Tree(getRangedRandomIntArray(0, 99, 10));
myAmazingTree.prettyPrint();

// 2
console.log('Is Balanced: ' + myAmazingTree.isBalanced());

// 3
console.log('LEVEL ORDER:');
console.log(myAmazingTree.levelorder());
console.log('PRE ORDER:');
console.log(myAmazingTree.preorder());
console.log('POST ORDER:');
console.log(myAmazingTree.postorder());
console.log('IN ORDER:');
console.log(myAmazingTree.inorder());

// 4
console.log(
    'Adding the DEBASERS! (because they debase my beautiful balanced tree)'
);
let theDebasers = getRangedRandomIntArray(100, 200, 10);
theDebasers.forEach((e) => {
    myAmazingTree.insert(e);
});

// 5
console.log('Is Balanced: ' + myAmazingTree.isBalanced());

// 6
myAmazingTree.rebalance();
console.log('Tree was rebalanced. Purity has been regained.');

// 7
console.log('Is Balanced: ' + myAmazingTree.isBalanced());

// 8
console.log('LEVEL ORDER:');
console.log(myAmazingTree.levelorder());
console.log('PRE ORDER:');
console.log(myAmazingTree.preorder());
console.log('POST ORDER:');
console.log(myAmazingTree.postorder());
console.log('IN ORDER:');
console.log(myAmazingTree.inorder());
