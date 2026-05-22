class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        //Brute Force
        // while(s.includes('()') || s.includes('{}') || s.includes('[]')) {
        //   s = s.replace('()', '');
        //   s = s.replace('{}', '');
        //   s = s.replace('[]', '');
        // }
        
        // return s === ''
        
        //Optimization
        const stack = [];
        const parentheses = {
            ')': '(',
            '}': '{',
            ']': '['
        }
        
        for(let p of s) {
            if(p === '(' || p === '{' || p === '[') {
            stack.push(p);
            } else {
            if(stack.pop() !== parentheses[p]) return false;
            }
        }
        
        return stack.length === 0;
    }
}
