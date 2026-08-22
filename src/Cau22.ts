export class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
      this.items.push(item);
    }

    pop(): T | undefined {
      return this.items.pop();
    }

    peek(): T | undefined {
      return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
      return this.items.length === 0;
    }
}

const myStack = new Stack<number>();
myStack.push(10);
myStack.push(20);
console.log("Top element (peek):", myStack.peek()); // 20
console.log("Popped element (pop):", myStack.pop()); // 20
console.log("Is stack empty?:", myStack.isEmpty()); // false