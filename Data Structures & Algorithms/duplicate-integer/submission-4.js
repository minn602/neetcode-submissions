class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    // 문제이해:
    // 이 문제는 주어진 숫자 배열 nums에서 중복된 요소가 있는지 확인하여 있으면 true, 아니면 false를 반환하는 문제입니다.

    // Brute Force:
    // 이중 for문을 사용하여 두 요소를 비교하여 동일한지 확인할 수 있습니다.
    // 시간복잡도는 O(n^2) 소요됩니다.

    // Optimization:
    // 요소의 중복을 확인하기 위해 Set 자료구조를 활용하여 최적화할 수 있습니다.

    // 한번의 for문으로 현재 요소가 이미 set에 있으면 중복되기 때문에 true 반환,
    // 없는 경우엔 set에 추가하여 줍니다.

    hasDuplicate(nums) {
        const set = new Set();

        for(let num of nums) {
            if(set.has(num)) return true;

            set.add(num);
        }

        return false;
    }
}
