class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a-b); //[-4, -1, -1, 0, 1, 2]
        const res = [];

        for(let i = 0; i < nums.length; i++) {
            let l = i+1, r = nums.length-1;

            if(i > 0 && nums[i] === nums[i-1]) continue;

            while(l < r) {
                const sum = nums[i] + nums[l] + nums[r];

                if(sum > 0) r--;
                if(sum < 0) l++;

                if(sum === 0) {
                    res.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;

                while(l < r && nums[l] === nums[l-1]) {
                    l++;
                }

                while(l < r && nums[r] === nums[r+1]) {
                    r--;
                }
                }


            }
        }

        return res;
    }
}
