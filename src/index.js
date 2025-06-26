import { BST, prettyPrint, generateRandomArray } from './bst';

const bst = new BST();
const numbers = generateRandomArray();
numbers.forEach(n => bst.add(n));

console.log('Random Inputs:', numbers);
console.log('\n🔹 Initial Balanced Tree:');
prettyPrint(bst.root);
console.log('Balanced?', bst.isBalanced());

console.log('\nIn-order:');
bst.inOrder(n => console.log(n.data));
console.log('\nPre-order:');
bst.preOrder(n => console.log(n.data));
console.log('\nPost-order:');
bst.postOrder(n => console.log(n.data));
console.log('\nLevel-order:');
bst.levelOrder(n => console.log(n.data));

[150, 160, 170, 180, 190, 200].forEach(n => bst.add(n));
console.log('\n🔻 After Adding Large Values:');
prettyPrint(bst.root);
console.log('Balanced?', bst.isBalanced());

bst.rebalance();
console.log('\n🔄 After Rebalancing:');
prettyPrint(bst.root);
console.log('Balanced?', bst.isBalanced());

console.log('\nFinal In-order:');
bst.inOrder(n => console.log(n.data));


const input = document.getElementById('valueInput');
const printTree = () => {
  treeDisplay.textContent = '';
  const lines = [];
  const captureLog = msg => lines.push(msg);
  const originalLog = console.log;
  console.log = captureLog;
  prettyPrint(bst.root);
  console.log = originalLog;
  treeDisplay.textContent = lines.join('\n');
};

 


document.getElementById('addBtn').addEventListener('click', () => {
  const value = parseInt(input.value);
  if (!isNaN(value)) {
    bst.add(value);
    printTree();
    input.value = '';
  }
});

document.getElementById('removeBtn').addEventListener('click', () => {
  const value = parseInt(input.value);
  if (!isNaN(value)) {
    bst.remove(value);
    printTree();
    input.value = '';
  }
});

document.getElementById('rebalanceBtn').addEventListener('click', () => {
  bst.rebalance();
  printTree();
});
