class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    // 문제이해: 
    // 주어진 배열에서 현재 요소를 제외한 나머지 요소들을 곱한 값을 구하여 새로운 배열로 반환하는 문제입니다.
    // 나눗셈을 사용하지 않고 시간복잡도 O(n)으로 구현해야합니다.

    // Brute Force:
    // 가장 직관적인 방식은 이중 for문으로 나머지 요소들의 곱을 구해주는 것입니다.
    // 이중 for문으로 배열을 순회하기 때문에 시간복잡도는 O(n^2)이 소요되어 문제 요구사항을 충족하지 못합니다.

    // Optimizaiton:
    // 구해야하는 값은 현재 요소를 제외한 나머지 요소들을 곱한 값입니다.
    // 그 값은 현재 요소를 기준으로 앞 요소들의 곱 * 뒤 요소들의 곱으로 구할 수 있습니다.
    // 먼저 앞 요소들의 곱을 나타내는 prefix[i] = nums[i-1]*prefix[i-1]로 구해주고,
    // i = 0인 경우는 앞 요소가 없기 때문에 out bound를 방지하여 i = 1인 경우부터 순회합니다.
    // 뒤 요소들의 곱을 나타내는 suffix[i] = nums[i+1]*suffix[i+1]로 구해주고,
    // i = nums.length -1 인 경우는 뒤 요소가 없기 때문에 out bound를 방지하여 i = nums.length -2인 경우부터 순회합니다.
    // 그리고 최종 결과 배열은 prefix[i]*suffix[i]로 구하여줍니다.
    // 주어진 배열을 한번만 순회하여 시간복잡도는 O(n)이 되고 prefix, suffix 배열을 사용하여 공간복잡도는 O(n)입니다.

// 추가로 별도의 prefix, suffix 배열 사용없이 res 결과배열에 각각의 결과를 저장하여 활용하면 공간복잡도를 O(1)으로 줄일 수 있습니다.
    productExceptSelf(nums) {
        const res = [];
        const prefix = Array.from({length: nums.length}, () => 1);
        const suffix = Array.from({length: nums.length}, () => 1);

        for(let i = 1; i < nums.length; i++) {
            prefix[i] = nums[i-1] * prefix[i-1];
        }

        for(let i = nums.length-2; i >= 0; i--) {
            suffix[i] = nums[i+1] * suffix[i+1];
        }

        for(let i = 0; i < nums.length; i++) {
            res[i] = prefix[i] * suffix[i];
        }

        return res;
    }
}
