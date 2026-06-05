/*
문제이해:
시간에 따라 값이 변할 수 있는 key-value 저장소를 구현하는 문제입니다.

set(key, value, timestamp)는 특정시간에 key의 값을 저장합니다. 같은 key에 대해 여러번 set이 호출될 수 있으며, 이전 값들을 삭제하지 않고 모두 저장합니다.

get(key, timestamp)는 해당 시간이하에서 가장 최근에 저장된 값을 반환해야 합니다.
만약 조건을 만족하는 값이 없다면 빈 문자열을 반환합니다.

Brute Force:
각 key마다 [timestamp, value] 목록을 저장한 뒤, get 호출 시 처음부터 끝까지 순회하여 timestamp 이하인 값 중 가장 최근 값을 찾습니다.
이 풀이 방식은 get마다 O(n)이 소요됩니다.

Optimization:
문제에서 timestamp는 항상 오름차순으로 들어온다는 조건이 있습니다.
예를들어,
set("foo", "bar", 1)
set("foo", "bar2", 4)
set("foo", "bar3", 7)

이라면 내부 저장구조는

[
  [1, "bar"],
  [4, "bar2"],
  [7, "bar3"]
]

처럼 timestamp 기준으로 이미 정렬되어 있습니다.

따라서 get시 정렬된 배열이므로 Binary Search를 사용할 수 있습니다.

l = 0, r = vals.length-1로 시작하여
- mid timestamp == 요청 timestamp 이면 해당 value를 바로 반환합니다.
- mid timestamp > 요청 timestamp이면 -> 더 작은 timestamp를 찾아야하므로 r = mid-1
- mid timestamp < 요청 timestamp이면 -> 더 큰 timestamp를 찾아야하므로 l = mid+1

탐색이 종료되면 r은 timestamp 이하인 마지막 위치, l은 timestamp 초과인 첫 위치를 가리키게 됩니다.

따라서
- r < 0 이면 조건을 만족하는 값이 없으므로 ''를 반환하고
- 그렇지 않으면 vals[r][1]를 반환합니다.


*/
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if(!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }

        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const vals = this.keyStore.get(key);
        if(!vals) return "";
        
        let l = 0, r = vals.length-1;
      
        while(l <= r) {
          const mid = Math.floor((l+r) / 2);
          const [time, value] = vals[mid];
          
          if(time === timestamp) {
            return value;
          } else if(time > timestamp) {
            r = mid-1;
          } else {
            l = mid+1;
          }
        }
        
       if (r < 0) return "";

        return vals[r][1];
    }
}
