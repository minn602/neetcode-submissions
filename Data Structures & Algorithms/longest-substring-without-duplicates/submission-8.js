class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        const char = new Set();
        let res = 0;

        let l = 0;
        for(let r = 0; r < s.length; r++) {
            while(char.has(s[r])) {
                char.delete(s[l]);
                l++;
            }
            char.add(s[r]);
            res = Math.max(res, r-l+1);
        }

        return res;
    }
}
