export class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class BST {
  constructor() { this.root = null; }

  add(data) {
    const newNode = new Node(data);
    if (this.root === null) { this.root = newNode; return; }
    let current = this.root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) { current.left = newNode; return; }
        current = current.left;
      } else if (data > current.data) {
        if (current.right === null) { current.right = newNode; return; }
        current = current.right;
      } else return;
    }
  }

  inOrder(callback) {
    if (typeof callback !== 'function') throw new Error('Callback required.');
    const traverse = node => {
      if (!node) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    };
    traverse(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== 'function') throw new Error('Callback required.');
    const traverse = node => {
      if (!node) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== 'function') throw new Error('Callback required.');
    const traverse = node => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    };
    traverse(this.root);
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') throw new Error('Callback required.');
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  find(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  isPresent(data) { return this.find(data) !== null; }

  findMin() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.data;
  }

  findMax() {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) current = current.right;
    return current.data;
  }

  remove(data) {
    const removeNode = (data, node) => {
      if (!node) return null;
      if (data === node.data) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let temp = node.right;
        while (temp.left) temp = temp.left;
        node.data = temp.data;
        node.right = removeNode(temp.data, node.right);
        return node;
      }
      if (data < node.data) {
        node.left = removeNode(data, node.left);
        return node;
      } else {
        node.right = removeNode(data, node.right);
        return node;
      }
    };
    this.root = removeNode(data, this.root);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;
    const getHeight = n => n ? 1 + Math.max(getHeight(n.left), getHeight(n.right)) : -1;
    return getHeight(node);
  }

  depth(value) {
    let current = this.root, depth = 0;
    while (current) {
      if (value === current.data) return depth;
      current = value < current.data ? current.left : current.right;
      depth++;
    }
    return null;
  }

  isBalanced() {
    const check = node => {
      if (!node) return { height: -1, balanced: true };
      const left = check(node.left), right = check(node.right);
      const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
      return { height: 1 + Math.max(left.height, right.height), balanced };
    };
    return check(this.root).balanced;
  }

  toArrayInOrder() {
    const result = [];
    this.inOrder(node => result.push(node.data));
    return result;
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  rebalance() {
    this.root = this.buildTree(this.toArrayInOrder());
  }
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (!node) return;
  if (node.right) prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left) prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

export function generateRandomArray(size = 15, max = 100) {
  const set = new Set();
  while (set.size < size) set.add(Math.floor(Math.random() * max));
  return [...set];
}



