class MinStack {
    constructor() {
      this.stack = [];
      this.minStack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
      //push: O(1)
      this.stack.push(val);
      const min = Math.min(val, this.minStack.length === 0 ? val : this.minStack[this.minStack.length-1]);
      this.minStack.push(min);
    }

    /**
     * @return {void}
     */
    pop() {
      //pop: O(1)
      this.stack.pop();
      this.minStack.pop();
    }

    /**
     * @return {number}
     */
    top() {
      //O(1)
      return this.stack[this.stack.length-1];
    }

    /**
     * @return {number}
     */
    getMin() {
      //Math min: O(n)
      return this.minStack[this.minStack.length-1];
    }
}
