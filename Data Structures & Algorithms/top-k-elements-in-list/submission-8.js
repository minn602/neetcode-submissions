class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    // 문제이해: 
    // 주어진 배열에서 k개의 자주 등장한 요소를 배열로 반환합니다.

    // Brute Force:
    // 주어진 배열을 순회하여 map에 key: 요소값 - value: 빈도수를 구하여 저장합니다.
    // 그후 빈도수를 기준으로 내림차순 정렬하여 k개 만큼의 요소만을 구하여 반환합니다.
//     이 풀이방식은 O(nlogn)의 시간복잡도를 가집니다.

//     Optimization:
// k개의 자주 나온 요소만 필요하기 때문에 전체를 정렬하면 비효율적입니다.
// k의 최대값=배열의 길이를 활용하여 최적화할 수 있습니다.
// 길이가 k의 최대값인 배열을 생성하고 그 배열의 인덱스를 빈도로 활용할 수 있습니다.
// 그 후 그 배열을 뒤에서 부터 순회하면 정렬없이 k개 만큼의 요소를 구할 수 있습니다.

// 예) nums = [1,1,1,2,2,3], k = 2
// map = {3: 1, 2: 2, 1: 3}

// bucket  = [[], [3], [2], [1]] => 버킷에 요소가 담긴다.
// index:      0   1    2    3   => 인덱스가 빈도 역할

// bucket을 뒤에서 부터 순회하여 2개의 자주 등장한 요소 [1, 2]를 구하여 반환.

// 이 풀이 방식은 O(n)의 시간복잡도를 가집니다.

    topKFrequent(nums, k) {
        //brute force
        // const map = new Map();

        // for(let num of nums) {
        //     map.set(num, (map.get(num) || 0) + 1);
        // }

        // return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([num]) => num);

        //optimization
        const map = new Map();

        for(let num of nums) {
            map.set(num, (map.get(num) || 0) + 1);
        }

        const bucket = Array.from({ length: nums.length + 1 }, () => []);

        for(const [num, count] of map.entries()) {
            bucket[count].push(num);
        }

        const result = [];

        for(let i = bucket.length-1; i >= 0; i--) {
            for(const n of bucket[i]) {
                result.push(n);

                if(result.length === k) return result;
            }
        }
    }
}
