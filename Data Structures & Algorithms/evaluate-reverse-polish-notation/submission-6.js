class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
      const nums = [];
      for(let token of tokens) {
        if(token === "+" || token === "-" || token === '*' || token === '/') {
          const b = nums.pop();
          const a = nums.pop();
          
          nums.push(operations(token, a, b));
        } else {
          nums.push(parseInt(token));
        }
      }
      
      function operations(o, a, b) {
        if(o === '+') {
          return a+b;
        } else if (o === '-') {
          return a-b;
        } else if (o === '*') {
          return a*b;
        } else {
          return Math.trunc(a/b);
        }
      }
      
      return nums.pop();
    }
}
