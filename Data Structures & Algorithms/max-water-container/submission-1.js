class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    // 문제이해: 
    // 주어진 높이 배열에서 두 개의 바를 선택했을때 담을 수 있는 최대 물의 양을 구하여 반환하는 문제입니다.

    // Brute Force:
    // i = 0, j = i+1 두 인덱스로 이중 for문을 사용하여 담을 수 있는 최대 물의 양을 구하여 줍니다.
    // 이중 for문 사용으로 시간복잡도는 O(n^2) 소요됩니다.

    // Optimization:
    // 물의 양 = 선택한 두 바의 간격 * 두 바 중 낮은 높이로 계산하게 됩니다.
    // 따라서 물의 양이 많아 지기 위해선 두 바의 간격이 넓고 두 바의 높이가 높을 수록 최대값을 가지게 됩니다.
    // 투포인터를 사용하여 배열의 양끝에서 탐색하며 바 간격은 좁아지지만 더 높은 바를 찾으면서 전체 조합을 탐색하지 않고
    // 조건에 맞는 조합만 검색할 수 있습니다.

    // 두 바의 인덱스는 동일할 수 없기 때문에 while문은 l < r 조건내에서 수행됩니다.
    // 만약 heights[l] < heights[r]의 경우에 현재 높이 제한은 heights[l]이 됩니다.
    // 이 상태에서 l을 고정한채 r포인터를 왼쪽으로 이동하면 두 바의 너비는 줄어들고 적용되는 높이는 heights[l]이 되거나 더 낮아질 수 있습니다.
    // 따라서 현재 포인터 l의 경우엔 더 큰 물의 양을 구할 수 없습니다.
    // 그래서 l이 포함된 모든 조합을 건너뛰고 l 포인터를 오른쪽으로 이동하여 줍니다.
    // 반대의 경우도 동일하게 r 포인터를 이동합니다.

    // 이 방식은 시간복잡도 O(n)을 가집니다.
    maxArea(heights) {
        let res = 0;

        let l = 0, r = heights.length-1;

        while(l < r) {
            const amount = (r-l) * Math.min(heights[l], heights[r]);

            res = Math.max(res, amount);

            if(heights[l] < heights[r]) {
                l++;
            } else {
                r--;
            }
        }

        return res;
    }
}
