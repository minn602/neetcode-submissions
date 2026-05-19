class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    // 문제이해: 
    // 대문자로 이루어진 문자열 중 k개의 문자를 다른 대문자로 대체하였을때 한 문자로 된 가장 긴 부분문자열의 길이를 구하여 반환합니다.

    // Edge Case:
    // s.length = 1일때, 대체하여도 가장 긴 부분문자열의 길이는 1이기 때문에 바로 1을 반환합니다.

    // Brute Force:
    // 먼저 map을 활용하여 각 문자의 사용 횟수를 저장합니다.
    // 그 후 map을 내림차순 정렬하여 가장 많은 횟수가 무엇인지 확인합니다.
    // 문자열 길이 - 가장 많은 횟수 = 남은 문자의 갯수가 됩니다.
    // 남은 문자의 갯수 >= k인 경우 최대 부분 문자열의 길이 = 가장많은 횟수 + k
    // 남은 문자의 갯수 < k인 경우 최대 부분 문자열의 길이 = 가장많은 횟수 + 남은 문자의 갯수 = s.length

    //이 풀이방식은 문자열 순회 + 정렬로 총 시간복잡도가 O(nlogn)이고 공간복잡도는 map을 사용하여 O(n)입니다. 

    // Optimization:

    characterReplacement(s, k) {
        // //1. Brute Force
        // if (s.length === 1) return 1;

        // const count = new Map();

        // for(let c of s) {
        //     count.set(c, (count.get(c) || 0) + 1);
        // }

        // const maxCount = [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 1).map((c) => c[1])[0];

        // if(maxCount >= k) {
        //     return maxCount + k;
        // } else {
        //     return s.length;
        // }

        //2. Optimization
        let count = new Map();
        let l = 0;
        let maxFreq = 0;
        let res = 0;

        for (let r = 0; r < s.length; r++) {
            count.set(s[r], (count.get(s[r]) || 0) + 1);

            maxFreq = Math.max(maxFreq, count.get(s[r]));

            while ((r - l + 1) - maxFreq > k) {
                count.set(s[l], count.get(s[l]) - 1);
                l++;
            }

            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
