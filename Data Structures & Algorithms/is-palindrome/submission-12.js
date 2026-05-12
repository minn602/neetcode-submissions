class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    // 문제이해:
    // 주어진 문자열을 팰린드롬인지 판단하여 boolean 으로 반환하는 문제입니다.
    // 팰린드롬이란 앞에서 읽을때와 뒤에서 읽을때가 동일한 것을 말합니다.
    // 조건은 대소문자는 구분하지 않고 alphanumeric(알파벳과 숫자)가 아닌 문자는 무시합니다.

    // Brute Force:
    // 주어진 문자열을 i = 0일때와 j = s.length-1 인 경우로 이중 순회하여 각 문자가 alphanumeric인 경우
    // 비교하여 동일한지 판단할 수 있습니다.
    // 이중 for문을 사용하여 시간복잡도는 O(n^2) 소요됩니다.

    // Optimization:
    // two pointer를 사용하여 최적화 할 수 있습니다.
    // 문제에서 구하는 것은 앞에서 읽을때와 뒤에서 읽을때가 동일한지 비교하는 것이므로
    // 이중 for문 대신 l = 0, r = s.length-1 두개의 포인터를 사용하여 l < r인 조건에서
    // while문을 실행하여 각 문자가 동일한지 비교를 해줍니다.
    // 그리고 점차 l 포인터는 +1씩 움직이고 r 포인터는 -1씩 감소하여 비교를 합니다.
    isPalindrome(s) {
        let l = 0, r = s.length-1;

        function isAlphanumeric(c) {
            return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
        }

        while(l < r) {
            while(l < r && !isAlphanumeric(s[l])) l++;
            while(l < r && !isAlphanumeric(s[r])) r--;

            if(s[l].toLowerCase() !== s[r].toLowerCase()) return false;

            l++;
            r--;
        }

        return true;
    }
}
