class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    // 문제이해: 
    // 이 문제는 주어진 두 문자열이 애너그램인지 확인합니다. 애너그램은 동일한 문자를 동일한 횟수로 구성했는지 확인하는 것입니다. 반환값은 boolean입니다.

    // Edge Case:
    // 가장 먼저 두 문자열의 길이를 비교합니다. 길이가 다르면 동일한 구성을 할 수 없기 때문에 이후 로직 전체를 건너뛸 수 있습니다. 

    // Brute Force:
    // 가장 단순한 방법은 두 문자열을 정렬한 뒤 비교하는 것입니다. 정렬 자체가 O(n log n)이고, JavaScript의 내장 sort는 추가 공간도 O(n)을 사용합니다. 결과적으로 불필요한 전체 재배열이 발생하기 때문에 더 나은 방법을 찾아야 합니다.

    // Optimization 1:
    // 애너그램 여부는 각 문자의 빈도수로 결정됩니다. map을 빈도수 카운터로 활용할 수 있습니다.

    // 먼저 문자열 s를 순회하여 map의 key에 현재 문자, value에 갯수를 추가해줍니다.
    // 예시) s = "racecar" 순회 후 map = {r: 2, a: 2, c: 2, e: 1}이 됩니다.
    // 그 이후 문자열 t를 순회하여 현재 문자가 존재하면 value 갯수를 차감해줍니다.
    // 만약, 갯수가 0이거나 현재 문자가 존재하지 않으면 동일한 구성의 문자가 아니기 때문에 false가 반환됩니다.
    // 이미 두 문자열의 길이를 확인했때문에 순회가 완료되면 두 문자는 애너그램인 것이 확인되어 true를 반환합니다. 

    // 이 풀이의 시간복잡도는 O(n) 입니다. 공간복잡도의 문자의 갯수 k인 경우 O(k)를 갖습니다.

    isAnagram(s, t) {
        if(s.length !== t.length) return false;

        const map = new Map();

        for(let c of s) {
            map.set(c, (map.get(c) || 0) + 1);
        }

        for(let c of t) {
            if(map.has(c) && map.get(c) != 0) {
                map.set(c, map.get(c) - 1);
            } else {
                return false;
            }
        }

        return true;
    }
}
