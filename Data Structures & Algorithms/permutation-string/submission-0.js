class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        const target = new Map();

        for(let c of s1) {
            target.set(c, (target.get(c) || 0) + 1);
        }

        let l = 0;
        const curr = new Map();

        for(let r = 0; r < s2.length; r++) {
            const c = s2[r];

            curr.set(c, (curr.get(c) || 0) + 1);

            while(r-l+1 > s1.length) {
                curr.set(s2[l], curr.get(s2[l]) - 1);

                if(curr.get(s2[l]) === 0) {
                    curr.delete(s2[l]);
                }

                l++;
            }

            let valid = true;

            for(const [key, value] of target) {
                if(curr.get(key) !== value) {
                    valid = false;
                }
            }

            if(valid) return true;
        }

        return false;
    }
}
