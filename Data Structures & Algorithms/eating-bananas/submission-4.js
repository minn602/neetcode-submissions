class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    /*
문제이해: 
각 pile에 바나나 갯수를 나타내는 배열이 주어졌을때, 한시간에 최소 몇개의 바나나를 먹었을때 h 시간 안에 다 먹게되는지 구하여 반환하는 문제입니다. 한시간 내에는 한 pile만 먹을 수 있습니다.

Brute Force:
직관적인 풀이방식은 가능한 모든 k 값을 확인하는 것 입니다.
k의 최소값=1, 최대값은 max(...piles)가 됩니다. 문제에서는 h 시간내에 만족하는 최소 k값을 구해야하므로 작은 값부터 확인하여 줍니다.
각 파일을 먹는데 소요되는시간은 Math.ceil(pile / k) 입니다.

먼저 k 범위내 순회하며 그 안에서 piles 배열을 순회합니다.
각 pile을 다 먹는데 소요되는 시간을 구하여 total 변수에 누적합니다.
그 후 total <= h 조건이 되면 현재의 k값은 모든 바나나를 시간내에 먹을 수 있으므로 해당 k값을 반환합니다.

k값의 범위가 m이라고 할때 k 범위 순회 O(m) + piles 배열 순회 O(n) 총 시간복잡도는 O(m*n)이 됩니다.

Optimization:
가능한 k 값의 범위는 1 ~ max(piles) 입니다.
예를 들어 piles = [1,4,3,2] 일때, k 값에 따라 총 소요시간을 계산하면 아래와 같습니다.
k = 1, total = 10 -> total > h 이므로 false
k = 2, total = 6 -> total <= h 이므로 true
k = 3, total = 6 -> true
k = 4, total = 4 -> true

k가 증가할 수록 더 많은 바나나를 먹을 수 있으므로 total은 감소합니다.
따라서 total <= h 조건의 결과는 false true ture true와 같이 단조성을 가지게 됩니다.
이러한 특성을 이용하여 조건을 만족하는 최소 k를 Binary Search 찾을 수 있습니다.

l = k값 범위의 시작, r = k값 범위의 끝을 가리키는 두 포인터가 l <= r 인 조건에서
해당 범위의 중간 값인 mid를 현재 k로 가정하고 모든 pile을 먹는데 필요한 총 시간 total을 계산합니다.

total <= h 이면 주어진 시간내 모든 바나나를 먹을 수 있으므로 정답 후보입니다. 하지만 더 작은 k가 존재할 수 있으므로 r = mid-1로 왼쪽 범위를 탐색합니다.
total > h 이면 주어진 시간 내 모든 바나나를 먹을 수 없으므로 더 큰 k값으로 탐색하기 위해 l = mid+1로 갱신하여 오른쪽 범위를 탐색합니다.

탐색이 종료되면 l은 조건을 만족하는 범위의 첫번째 위치를 가리키므로 최소 k값인 l을 반환합니다.

해당 풀이는 조건을 만족하는 k 범위만 탐색하므로 총 시간복잡도는 O(logm * n) 입니다.
*/
    minEatingSpeed(piles, h) {
    //1. Brute Force
    // const maxK = Math.max(...piles);

    // for(let k = 1; k <= maxK; k++) {
    //   let total = 0;
    //   for(let pile of piles) {
    //     total += Math.ceil(pile / k)
    //   }
        
    //   if(total <= h) {
    //     return k;
    //   }
    // }
  
    let l = 1, r = Math.max(...piles);
    
    while(l <= r) {
        const mid = Math.floor((l+r) / 2);
        let total = 0;
        
        for(let pile of piles) {
        total += Math.ceil(pile / mid);
        }
        
        if(total <= h) {
        r = mid-1;
        } else {
        l = mid+1;
        }
    }
    
    return l;
    }
}
