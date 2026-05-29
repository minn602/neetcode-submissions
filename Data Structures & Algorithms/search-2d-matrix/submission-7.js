class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    // 문제이해:
// 주어진 이중배열에 target이 존재하면 true, 아니면 false를 반환하는 문제입니다.
// 각 행은 오름차순으로 정렬되어 있고 각 행의 첫번째 요소값은 이전 행의 마지막 요소 값보다 큽니다.
// 문제의 풀이는 O(log(m*n))의 시간복잡도로 수행되어야합니다.

// Brute Force:
// 가장 직관적인 풀이방법은 이중 for문으로 모든 요소를 순회하는 방식입니다.
// 이 방식은 시간복잡도 O(n^2)이 소요되어 문제의 요구사항을 충족하지 못합니다.

// Optimization:
// 주어진 배열이 오름차순으로 정렬되어 있다는 점을 활용해서 Binary Search 방식으로 최적화할 수 있습니다. 전체 구간을 탐색하는 것 대신 구간의 중간 인덱스로 target이 있을 구간만 선택하여 탐색하는 방식입니다.

// 먼저 행을 기준으로 이진탐색을 수행합니다.
// 현재행의 첫번째값 > target -> target은 더 값이 작은 구간에 존재해야하므로 rowR = mid-1로 갱신합니다.
// 현재행의 마지막값 < target -> target은 더 값이 큰 구간에 존재하므로 rowL = mid+1로 갱신합니다.
// 그외의 경우는 target이 현재행에 존재할 가능성이 있으므로 해당 행 내부에서 이진탐색을 진행합니다.

// 행 탐색은 O(log m), 열 탐색은 O(log n)이므로 전체 시간복잡도는 O(log m+log n) = O(log(m*n))입니다.
    searchMatrix(matrix, target) {
        let rowL = 0, rowR = matrix.length-1;
  
        while(rowL <= rowR) {
            const mid = Math.floor((rowL + rowR) / 2);
            const currentRow = matrix[mid];
            
            let colL = 0, colR = currentRow.length-1;
            
            if(target < currentRow[colL]) {
            rowR = mid-1;
            } else if(target > currentRow[colR]) {
            rowL = mid+1;
            } else {
            
            while(colL <= colR) {
                const mid = Math.floor((colL + colR) / 2);
                
                if(target < currentRow[mid]) {
                colR = mid-1;
                } else if(target > currentRow[mid]) {
                colL = mid+1;
                } else {
                return true;
                }
            }

            return false;
            }
        }
            
            return false;
    }
}
