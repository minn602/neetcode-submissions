class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    // 문제이해: 
    // 대문자로 이루어진 문자열 중 k개의 문자를 다른 대문자로 대체하였을때 한 문자로 된 가장 긴 부분문자열의 길이를 구하여 반환합니다.

    // Brute Force:
    // 모든 부분문자열이 유효한지 검증합니다.
    // i = 0, j = i 이중 for문으로 현재 부분문자열의 각 문자 횟수를 map에 저장합니다.
    // 횟수를 기준으로 가장 많이 등장한 횟수를 구해줍니다.
    // 현재 부분문자열의 길이 - 가장 많이 등장한 횟수 <= k 이면, 현재 부분문자열은 유효합니다.

    // 이중 for문으로 시간복잡도는 O(n^2)

    //Optimization:
    // 가능한 모든 부분문자열이 유효한지 검증하지 않고 two pointer를 이용하여 최적화합니다.
    // l = 0, r = 0 r을 이동하며 윈도우를 계속 확장합니다.
    // 부분문자열의 각 문자 등장횟수를 map에 저장합니다.
    // 최대 많이 등장한 횟수를 갱신해줍니다.
    // current window - maxFreq > k 이는 유효하지 않는 윈도우기 때문에
    // l 포인터를 오른쪽으로 이동하여 현재 윈도우를 줄여줍니다.
    // 포인터를 이동하기 전에 등장횟수 map에서 s[l]의 횟수를 -1해줍니다.

    // for문 내 while문으로 시간복잡도는 O(2n) -> O(n)

    characterReplacement(s, k) {
       //1. Brute Force
        // let res = 0;
        
        // for(let i = 0; i < s.length; i++) {
        //     const count = new Map();

        //     for(let j = i; j < s.length; j++) {
        //         count.set(s[j], (count.get(s[j]) || 0) + 1);

        //         let maxFreq = 0;

        //         for(let [c, frq] of count) {
        //             maxFreq = Math.max(maxFreq, frq);
        //         }

        //         if((j-i+1) - maxFreq <= k) {
        //             res = Math.max(res, j-i+1);
        //         }
        //     }
        // }

        // return res;

        //2. Optimization
        let res = 0;

        let l = 0;

        const count = new Map();
        let maxFreq = 0;

        for(let r = 0; r < s.length; r++) {
            const char = s[r];

            count.set(char, (count.get(char) || 0) + 1);
            maxFreq = Math.max(maxFreq, count.get(char));

            while((r-l+1) - maxFreq > k) {
                count.set(s[l], count.get(s[l]) - 1);
                l++;
            }

            res = Math.max(res, r-l+1);
        }

        return res;
    }
}
