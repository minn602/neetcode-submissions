// 문제이해:
// 주어진 배열을 문자열로 인코딩하고 다시 원본 배열로 돌려놓은 디코딩 함수를 만드는 문제입니다.
// 문자열에는 어떠한 문자(특수기호 등 포함)이 포함될 수 있습니다.

// Edge Case:
// 주어진 배열의 길이가 0인 경우는 이후 코드 실행할 필요없이 encode에선 빈 문자열, decode에선 빈배열을 반환합니다.

// Brute Force: 
// 가장 직관적인 방식은 구분자 문자를 활용하여 join()과 split() 메서드를 통해 인코딩 및 디코딩 하는 것입니다.
// 그러나 문자열에 알파벳 외 어떠한 기호도 포함될 수 있기 때문에 구분자 역할로 어떠한 기호를 넣어도
// 애매한 부분이 발생하여 정확히 예외처리 할 수 없어 근본적인 문제 해결이 되지 않습니다.
// 예) "hello", "wor#ld" 를 구분자 #을 사용할 경우 -> "hello#wor#ld" -> 원본으로 split하기 어려움

// Optimization:
// 가능한 풀이방식은 인코딩시 문자열 앞에 문자열길이+# prefix를 붙여 이를 구분자로 사용하는 것입니다.
// 디코딩시 인덱스 i 부터 #까지를 읽어 원본 문자열의 길이를 구하고 그 길이만큼 슬라이싱하기 때문에 원본 내용이 독립적으로 구분됩니다.
// 만약, 원본 문자열에도 동일한 기호인 #이 포함될 경우에도 디코딩시에는 항상 첫번째 # 위치를 찾고
// 그 이후에는 원본 문자열의 길이를 기반으로 슬라이싱하기 때문에 영향을 주지 않습니다.

// 두 함수의 시간복잡도와 공간복잡도는 O(n) 입니다. 여기서 n은 전체 문자열의 총 길이입니다.
// * encode 함수에서도 str 하나하나를 순회하여 결과 문자열에 붙이는 작업을 수행하기 때문입니다.
// * decode 함수 내에서 중첩 while 문의 i와 j 포인터는 앞으로만 이동하여 전체 문자열을 한번씩만 통과하기 때문에 시간복잡도 O(n)입니다.

class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        if(strs.length === 0) return '';

        let res = '';

        for(let str of strs) {
            res += `${str.length}#${str}`;
        }
        
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        if(str === '') return [];

        const res = [];
        let i = 0;

        while(i < str.length) {
            let j = i;

            while(str[j] !== '#') j++;

            const length = parseInt(str.slice(i, j));
            const origin = str.slice(j+1, length+j+1);

            res.push(origin);

            i = length+j+1;
        }

        return res;
    }
}
