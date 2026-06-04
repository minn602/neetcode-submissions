class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    /*
    문제이해:
    주어진 배열은 중복없이 원래 오름차순으로 정렬되었지만 1-n회 회전되어 있습니다. n회 회전되어 있다는 것은 n개의 요소가 배열의 맨 앞으로 이동한 것을 의미합니다. 이 배열안에 target이 있을 경우 해당 인덱스를, 없을 경우 -1를 반환합니다. 풀이의 시간 복잡도는 O(logn) 내에 수행되어야합니다.

    Brute Force:
    가장 직관적인 방식은 모든 요소를 확인하며 target과 일치하는지 확인하는 방식입니다. 이 풀이는 O(n)의 시간 복잡도가 소요되어 문제의 요구사항을 만족하지 못합니다.

    Optimization:
    주어진 배열은 회전된 정렬 배열이지만 mid를 기준으로 왼쪽 또는 오른쪽 구간 중 하나는 항상 정렬되어 있습니다. 이점을 활용하여 Binary Search로 최적화할 수 있습니다.

    l = 0, r = nums.length-1 두 포인터를 기준으로 중간 인덱스인 mid를 계산하여
    - mid 값 = target 이면 바로 mid 를 반환합니다.
    - 만약 mid 기준 왼쪽 구간이 정렬되어 있다면,
    왼쪽 구간에 target이 있는 경우 왼쪽 구간 탐색을 위하여 r = mid-1로 갱신합니다.
    왼쪽 구간에 target이 없는 경우 오른쪽 구간 탐색을 위하여 l = mid+1로 갱신합니다.
    - 만약 mid 기준 오른쪽 구간이 정렬되어 있다면,
    오른쪽 구간에 target이 있는 경우 오른쪽 구간 탐색을 위하여 l = mid+1로 갱신합니다.
    오른쪽 구간에 target이 없는 경우 왼쪽 구간 탐색을 위하여 r = mid-1로 갱신합니다.

    while 문 후에도 target을 찾지 못한경우 -1을 반환합니다.

    이 풀이는 target이 있을 구간만 선택하여 탐색하므로 O(logn) 시간복잡도가 소요됩니다.
    */
    search(nums, target) {
        let l = 0, r = nums.length-1;

        while(l <= r) {
            const mid = Math.floor((l+r)/2);

            if(nums[mid] === target) return mid;

            if(nums[l] <= nums[mid]) {
                if(nums[l] <= target && target < nums[mid]) {
                    r = mid-1;
                } else {
                    l = mid+1;
                }
            } else {    
                if(nums[mid] < target && target <= nums[r]) {
                    l = mid+1;
                } else {
                    r = mid-1;
                }
            }
        }

        return -1;
    }
}
