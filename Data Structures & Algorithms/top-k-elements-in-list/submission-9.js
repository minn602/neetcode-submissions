class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    // 문제이해: 
    // 주어진 배열에서 빈도 기준 상위 k개의 요소를 반환하는 문제입니다.
    // 문제 조건상 유일한 답이 보장되어 있고, k는 항상 유효한 범위입니다.

    // Brute Force:
    // 주어진 배열을 순회하여 map에 key: 요소값 - value: 빈도수를 구하여 저장합니다.
    // 그후 빈도수를 기준으로 내림차순 정렬하여 k개 만큼의 요소만을 구하여 반환합니다.
//     Map 구성 O(n) + 정렬 O(nlogn)으로 시간복잡도는 O(nlogn)입니다. 공간복잡도는 hashMap 때문에 O(n)입니다.

//     Optimization:
// k개의 자주 나온 요소만 필요하기 때문에 전체를 정렬하면 비효율적입니다.
// 어떤 원소의 빈도도 배열의 길이를 초과할 수 없습니다. 이를 활용하여 Bucket Sort를 사용할 수 있습니다.
// 크기가 k 최대값+1인 배열을 생성하고 그 배열의 인덱스를 빈도로 활용할 수 있습니다.
// 그 후 그 배열을 뒤에서 부터 순회하면 정렬없이 k개 만큼의 요소를 구할 수 있습니다.

// 예) nums = [1,1,1,2,2,3], k = 2
// map = {3: 1, 2: 2, 1: 3}

// bucket  = [[], [3], [2], [1], [], [], []] => 버킷에 요소가 담긴다.
// index:      0   1    2    3   => 인덱스가 빈도 역할

// bucket을 뒤에서 부터 순회하여 2개의 자주 등장한 요소 [1, 2]를 구하여 반환.

// 이 풀이 방식은 한번만 순회하기 때문에 시간복잡도 O(n)을 갖고 hashMap과 버킷배열을 사용하여 공간복잡도 O(n)
// 이 됩니다.
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

// **********map 활용 메서드 정리
// 1. Map의 key-value를 iterable 형태로 반환
// map.entries()

// {1: 3, 2: 2, 3: 1} => [[1,3], [2,2], [3,1]]

// 2. entries()는 iterable이라 바로 sort 못함
// 그래서 spread로 배열화
// const arr = [...map.entries()]; //진짜 배열이 됨

// 3. const bucket = new Array(nums.length).fill([])

// 이 코드는 [[], [], [], []]처럼 보이지만 실세론 모든 칸이 '같은 배열'을 참조한다. 
// 이후 여기에 arr[0].push(1)을 하게 되면 결과는 [[1], [1], [1]]이 된다.
// 왜냐하면 fill은 '복사'가 아니라 '같은 참조'를 넣기 때문이다.

// 그래서 각 칸마다 새로운 배열을 생성하기 위해선 Array.from({length: nums.length}, () => [])을 사용

// 4. Array.from(map.values())
// Map의 value들만 배열로 반환

// map.values()는 3,2,1의 iterable 객체를 반환하여 배열형태는 아니다.
// Array.from 처리하면 [3,2,1] 배열이 된다.

// [...map.values()] = Array.from(map.values()) 둘다 배열이다.
// [...map] = [...map.entries()] = [[1,3], [2,2], [3,1]]

// 5. for ... of
// for(const item of map) {
//   여기서 item은
//   [1, 3]
//   [2, 2]
//   [3, 1]
// }

// for(const [num, count] of map) {
//   num과 count는
  
//   1 3
//   2 2
//   3 1
// }