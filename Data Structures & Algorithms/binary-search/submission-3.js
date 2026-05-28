class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    //문제이해: 
// 주어진 문제는 중복없이 오름차순으로 정렬된 숫자 배열에서 target과 일치하는 값이 있으면 해당 요소의 인덱스를, 없으면 -1을 반환하는 문제입니다. 풀이는 시간복잡도 O(logn)으로 수행되어야합니다.

// Brute Force:
// 직관적인 풀이방식은 주어진 배열을 모두 순회하여 각 요소가 target과 일치하는지 확인하는 방식입니다.
// 해당 풀이방식은 모든 요소를 확인하여 시간복잡도 O(n)이 소요되어 문제 요구사항을 충족하지 못합니다.

// Optimization:
// 주어진 배열이 중복없이 오름차순으로 정렬된 점을 활용하여 Binary Search 방식으로 최적화할 수 있습니다.
// 현재 탐색 구간의 중앙 인덱스 값 nums[mid]와 target을 비교하여, target이 존재할 수 없는 절반 구간을 제외하면서 탐색 범위를 줄여나갑니다.

// 검색은 구간의 시작 인덱스 l과 마지막 인덱스 r이 l <= r 조건 내에서 수행됩니다. 두 인덱스가 일치할때의 값까지 비교를 하기 위함입니다.

// 중앙 인덱스 mid는 현재 탐색 범위의 가운데 위치로 계산합니다.
// - nums[mid] > target인 경우: target은 더 작은 값 구간에만 존재할 수 있으므로 r = mid-1로 갱신합니다.
// - nums[mid] < target인 경우: target은 더 큰 값 구간에만 존재할 수 있으므로 l = mid+1로 갱신합니다.
// mid 위치의 값은 이미 비교가 완료되었기 때문에 다음 탐색 범위에서 제외합니다.

// 이 방식은 매 탐색마다 탐색 범위를 절반씩 줄이므로 시간복잡도는 O(logn)입니다.
    search(nums, target) {
        let l = 0, r = nums.length-1;

        while(l <= r) {
            const mid = Math.floor((l+r) / 2);

            if(nums[mid] > target) {
                r = mid-1;
            } else if(nums[mid] < target) {
                l = mid+1;
            } else {
                return mid;
            }
        }

        return -1;
    }
}
