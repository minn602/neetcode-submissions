class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    // 문제이해:
// 차서니 1개인 도로를 여러 차가 목적지(target)를 향해 달립니다.
// 각 차의 현재 위치(position)와 속도(speed)가 주어집니다.
// 차는 다른 차를 추월할 수 없으며, 뒤차가 앞차를 따라잡게 되면 앞차의 속도로 함께 이동합니다.
// 이렇게 함께 이동하는 차들의 그룹을 fleet이라 할때, 최종적으로 몇개의 fleet이 만들어지는지 반환합니다.

// Brute Force:
// fleet의 핵심 조건은 뒤차가 앞차(또는 앞 fleet)을 따라잡을 수 있는가 입니다.
// 뒤차가 더 빨리 도착 가능한 것은 앞차를 수월한다는 것을 의미하기 때문에 각차의 도착시간이 비교대상이 됩니다.
// 각 차의 목적지 도착 시간은 아래 공식으로 계산할 수 있습니다.

// (target - 현재 위치) / 속도

// 만약 뒤차의 도착시간이 앞 fleet의 도착 시간보다 작거나 같다면,
// 결국 앞차를 따라잡게 되므로 같은 fleet에 합류합니다.
// 반대로 도착시간이 더 오래 걸린다면, 앞 fleet을 따라 잡을 수 없으므로 새로운 fleet을 형성합니다.

// 이를 쉽게 판단하기 위해 위치 기준 내림차순으로 정렬한 뒤, 앞차부터 순서대로 fleet을 구성합니다.

// 해당 풀이방식은 for문 + 정렬 사용으로 총 시간복잡도는 O(nlogn)이 됩니다.

// Stack:
// stack 자료 구조를 활용하여 앞서가는 차(또는 fleet 그룹)의 도착시간과 비교할 수 있습니다.
// 차의 위치를 기준으로 내림차순 정렬한 뒤, 순서대로 도착 시간을 계산합니다.

// 만약 스택이 비어있거나 현재 차의 도착시간이 스택 top보다 큰 경우,
// 이는 앞 fleet에 합류할 수 없다는 의미이므로 새로운 fleet으로 간주하고 스택에 추가합니다.

// 해당 풀이방식은 for문+정렬을 사용하여 총 시간복잡도는 O(nlogn)이 되고 스택의 사용으로 추가 공간복잡도는 O(n)이 됩니다.
    carFleet(target, position, speed) {
  // Brute Force
  // const cars = position.map((p, i) => [p, (target - p) / speed[i]]).sort((a, b) => b[0] - a[0]);
  // let res = 0, maxHour = 0;
  
  // for(let [pos, hour] of cars) {
  //   if(hour > maxHour) {
  //     res++;
  //     maxHour = hour;
  //   }
  // }
  
  // return res;
  
  //Stack
  const cars = position
    .map((p, i) => [p, (target - p) / speed[i]])
    .sort((a, b) => b[0] - a[0]);

  const stack = [];

  for (let [pos, time] of cars) {
    if (stack.length === 0 || time > stack[stack.length - 1]) {
      stack.push(time);
    }
  }

  return stack.length;
    }
}
