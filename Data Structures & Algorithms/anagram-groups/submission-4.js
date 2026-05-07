class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    // 문제이해:
    // 주어진 배열 strs에서 애너그램이 되는 문자열끼리 묶어 서브배열로 반환합니다.
    // 애너그램은 순서는 다르지만 같은 문자를 같은 갯수로 구성한 문자입니다.

    // Edge Case:
    // strs의 길이가 1인 경우 바로 현재 strs를 배열로 포함하여 반환합니다.

    // Brute Forca:
    // 이중 for문을 사용하여 각 문자열을 정렬한 후 비교하여 줍니다.
    // 이 방식은 시간복잡도 O(n^2 * klongk)를 가집니다.

    // Optimization1 - sorting:
    // 애너그램이 되는 문자열들은 정렬을 해주면 모두 같은 값이 됩니다.
    // 이 점을 활용하여 map에 key: 정렬된 문자열 - value: 원본 문자열들의 배열을 저장할 수 있습니다.
    // 이 풀이방식은 O(n*klogk) 시간복잡도와 O(n*k)의 공간복잡도를 가집니다.

    //Optimization2 - hash map
    // 맵에 사용되는 키를 정렬한 문자열을 사용하는 대신 문자열들이 소문자로 이루어진 것을 활용할 수 있습니다.
    // 먼저 알파벳의 전체 갯수인 길이가 26이고 0으로 채워진 배열을 생성하여 카운터 역할로 사용합니다. count = [0, 0, 0 ...]
    // 각 문자열의 문자들을 순회하여 배열의 인덱스에 접근하여 카운터를 추가해줍니다. eat 문자열 순회 후 count = [1, ...1, 0, ... 1]

    // 그 카운터를 key로 활용하여 key: 카운터를 조합한 문자 - value: 원본 문자열을 맵에 저장합니다.
    // 여기서 중요한건! 카운터 배열을 사용하여 key를 만들때 구분자를 사용해줘야 하는 것입니다.
    // 구분자를 사용하지 않고 바로 join하면 1000001.. 형태가 되어 정확히 사용된 문자의 갯수가 확인되지 않습니다.

    // 이 방식은 시간복잡도, 공간복잡도 O(n*k)를 가집니다. 

    groupAnagrams(strs) {
        //Optimization1 - sorting
        // const map = new Map();

        // for(let str of strs) {
        //     const key = str.split("").sort().join("");

        //     if(!map.get(key)) {
        //         map.set(key, [])
        //     }
        //     map.get(key).push(str)
        // }

        // return Array.from(map.values())

        //Optimization - alphabet counter
        const map = new Map();

        for(let str of strs) {
            const count = new Array(26).fill(0);

            for(let c of str) {
                count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
            }

            const key = count.join(',');

            if(!map.get(key)) {
                map.set(key, []);
            }

            map.get(key).push(str);
        }

        return Array.from(map.values());
    }
}
