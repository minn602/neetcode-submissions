class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    // 문제이해:
    // 주어진 배열 nums에서 인덱스가 다른 두 요소의 조합의 합이 target이 되는 것을 찾아 두 인덱스를 배열 형태로 반환합니다.

    // Brute Force:
    // 이중 for문을 활용하여 i, j = i+1 인덱스의 요소들의 합이 target과 비교하여 답을 찾습니다.
    // 이때의 시간복잡도는 O(n^2) 입니다.

    // Optimization:
    // 문제에서 구하는 것은 두 요소의 합이 target이 될때 입니다. current + ? = target
    // 현재 요소인 current 값을 알때 구해야하는 ? = target - current가 됩니다.
    // 이를 이용하여 map 자료구조를 통해 최적화할 수 있습니다.
    // 주어진 배열을 순회하여 ? 값을 계산한 후 이 값이 map에 있는지 조회합니다.
    // map에 없으면 key: current - value: index를 저장하고 
    // 있으면 현재의 인덱스, map에서 ?로 조회한 인덱스 값을 배열로 반환합니다.

    // 이 풀이는 한번만 순회하여 시간복잡도 O(n) 입니다.
    twoSum(nums, target) {
        const map = new Map();

        for(let i = 0; i < nums.length; i++) {
            const diff = target - nums[i];

            if(map.has(diff)) {
                return [i, map.get(diff)]
            }
            map.set(nums[i], i);
        }
    }
}
