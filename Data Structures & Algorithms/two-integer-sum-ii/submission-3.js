class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    // 문제이해:
    // 주어진 배열은 오름차순으로 정렬된 배열입니다. 두 요소의 합이 target이 되는 조합의 인덱스를 구하여
    // 1-indexed 배열 형태로 반환합니다.
    // 정답이 되는 두 요소의 인덱스는 다르며, O(1)의 공간 복잡도를 만족해야합니다.

    // Brute Force:
    // 직관적인 풀이방식은 이중 for문으로 순회하여 i = 0/j = i+1부터 시작하면 중복없이 조합을 확인하며,
    // 두 요소의 합이 target과 일치하는지 확인하여 두 인덱스에 +1한 결과를 반환합니다.
    // 이 방식은 추가 공간은 사용하지 않지만 이중 for문으로 O(n^2) 시간복잡도를 가집니다.

    //만약 문제조건에서 공간복잡도 O(1)이 존재하지 않다면 Hash Map을 사용하여 풀이할 수 있습니다.

    // Optimization:
    // 주어진 배열이 오름차순으로 정렬되어 있다는 점을 활용하여 모든 요소의 조합을 거치지 않고 최적화 할 수 있습니다.
    // 배열의 왼쪽과 오른쪽에서 시작하는 두 포인터 l, r을 사용하여 두 요소의 합이 target보다 큰 경우는
    // 큰 값을 줄여야하기 때문에 r 포인터를 왼쪽으로 이동해주고, 합이 target보다 작은 경우는 작은 값을 높여야 하므로
    // l 포인터를 오른쪽으로 이동하며 합이 target과 일치하는 경우를 찾아줍니다.

    // numbers[l] + numbers[r] < target인 경우, l 포인터를 오른쪽으로 이동합니다.
    // 배열이 정렬되어 있으므로 r 포인터를 줄이면 합은 더 작아집니다.
    // 즉, 현재 l과 r을 포함한 왼쪽 값들의 조합은 target보다 작은 값이므로
    // l 포인터를 안전하게 배제할 수 있습니다.

    //while문의 조합은 l < r인데 같은 요소는 두 번 사용할 수 없기 때문입니다. 
    //문제 조건에서 정답은 반드시 존재하기 때문에 while문은 return에 도달하여 루프는 종료됩니다.

    // 이 풀이는 요소를 한번씩만 방문하기 때문에 시간복잡도 O(n)이 소요됩니다.
    twoSum(numbers, target) {
        let l = 0, r = numbers.length-1;

        while(l < r) {
            if(numbers[l] + numbers[r] > target) {
                r--;
            } else if (numbers[l] + numbers[r] < target) {
                l++;
            } else {
                return [l+1, r+1];
            }
        }
    }
}
