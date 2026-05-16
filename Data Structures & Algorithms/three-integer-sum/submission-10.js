class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    // 문제이해: 
    // 주어진 정렬에서 인덱스가 다른 세 요소의 합이 0이 되는 경우를 구하여 배열로 묶어 반환하는 문제입니다.
    // 답에는 세 요소의 조합이 중복없이 반환되어야 합니다.

    // Brute Force:
    // i = 0, j = i+1, k = j+1로 시작하는 3중 for문을 사용하여
    // nums[i] + nums[j] + nums[k] == 0이 되는 조건을 찾아줍니다.
    // output은 중복없는 세 요소의 조합만을 반환해야 하므로 중복을 제거해주기 위해 Set을 사용해줍니다.
    // 이 풀이방식은 3중 for문과 Set 추가 공간을 사용하므로 시간복잡도 O(n^3), 공간복잡도 O(n)을 가집니다.

    // Optimization:
    // 먼저 주어진 배열을 정렬합니다. 정렬을 하는 이유는 세 요소의 합이 0보다 큰 경우 오른쪽 포인터를 이동하면 합이 작아지고,
    // 0보다 작은 경우 왼쪽 포인터를 이동하면 반드시 합이 커지는 단조성을 보장하여 투포인터 사용이 가능하기 때문입니다.

    // 탐색은 i를 고정하고 [i+1, n-1] 범위에서 투포인터를 사용하여 탐색합니다.
    // 먼저 nums[i] > 0인 경우는 l포인터와 r포인터 값과의 합도 무조건 0보다 크게 되어 바로 for문을 종료하여 이후 탐색은 진행하지 않습니다.
    // 만약 i > 0인 상태에서 nums[i] = nums[i-1] 인 경우는 이미 앞에서 nums[i-1]일때 가능한 조합을 탐색하였으므로 중복을 피하기 위해 이후 로직은 continue로 건너뛰어줍니다.

    // 투포인터는 l < r일때 수행됩니다. 왜냐하면 다른 인덱스 값의 조합을 검색하기 때문입니다.
    // 세조합의 합 sum > 0일때, sum < 0인 경우 각각의 포인터를 이동하고
    // sum = 0일때는 두 포인터를 이동하고 추가로 현재 포인터도 이전 포인터 값과 동일한 경우는 중복된 조합을 또 검색하는 것을 피하기 위해 같은 경우는 계속해서 포인터를 이동해줍니다.

    // 이 풀이방식은 모든 조합을 검사하지 정렬 O(nlogn), for문+while문 O(n^2)이 소요되어 총 시간복잡도 O(n^2)를 가집니다. 
    threeSum(nums) {
        nums.sort((a, b) => a-b); //[-4, -1, -1, 0, 1, 2]
        const res = [];

        for(let i = 0; i < nums.length; i++) {
            let l = i+1, r = nums.length-1;

            if(i > 0 && nums[i] === nums[i-1]) continue;

            while(l < r) {
                const sum = nums[i] + nums[l] + nums[r];

                if(sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
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
