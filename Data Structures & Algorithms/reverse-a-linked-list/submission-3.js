/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
/*
문제이해:
링크드 리스트를 뒤집는 문제입니다.

예를들어, 1 -> 2 -> 3 -> null이 주어지면 3 -> 2 -> 1 -> null을 반환해야합니다.

Brute Force:
배열을 이용하여 노드들을 저장한 후 배열의 인덱스를 활용하여 다시 연결할 수 있습니다.
예를들어, 1 -> 2 -> 3을 순회하며 [1, 2, 3]에 저장한 후 i = nodes.length-1 부터 순회하여 3 -> 2 -> 1 순으로 다시 연결합니다. 마지막 인덱스 i = 0일때는 nodes[0].next = null로 할당하여 줍니다.

이 풀이방식은 모든 노드를 순회하여 시간복잡도 O(n)과 추가 공간 배열을 사용하여 공간복잡도 O(n)이 소요됩니다.

Optimization1 - recursion:
재귀를 사용하면 추가 자료구조없이 포인터만 변경하여 뒤집을 수 있습니다.

재귀함수 reverseList(head)는 head로 시작하는 연결 리스트를 뒤집고, 뒤집힌 리스트의 새로운 head를 반환하는 함수로 정의합니다.
예를들어, 1 -> 2 -> 3 -> null을 뒤집을때 현재 노드 1은 바로 처리하지 않고 2 -> 3 -> null을 먼저 뒤집습니다. 
재귀호출이 가장 마지막 노드인 3에 도달하면 3을 새로운 head로 반환하고 이후 재귀가 반환될때 마다 head.next부터 시작하는 리스트는 이미 뒤집혀 있다고 가정하고 현재 노드를 그 뒤에 붙입니다.
이를 위해 head.next.next = head를 수행하여 1 ->2를 1 <- 2로 방향을 뒤집습니다. 이후 기존 연결인 head.next = null 을 수행하여 원래 방향의 연결을 끊고 순환참조를 방지합니다.

각 노드를 한번씩만 방문하므로 시간복잡도는 O(n)이며, 재귀 호출 스택에 최대 n개의 함수가 쌓이므로 공간복잡도는 O(n)입니다.

Optimization2 - iteration:
반복문을 사용하면 재귀 호출없이 포인터만 변경하여 연결 리스트를 뒤집을 수 있습니다.
prev는 이미 뒤집어진 리스트의 head를 가리키고, cur는 현재 처리중인 노드를 가리킵니다.
현재 노드의 다음 노드 정보는 방향을 변경하기전에 잃어버리지 않도록 임시 변수 tmp에 저장합니다.
이후, cur.next = prev를 수행하여 현재 노드의 연결 방향을 반대로 변경하고
prev = cur, cur = tmp를 통해 뒤집어진 리스트와 아직 처리하지 않은 리스트를 한칸씩 앞으로 이동합니다.

각 노드를 한번씩만 방문하므로 시간복잡도는 O(n)이고, 추가 포인터 변수만 사용하므로 공간복잡도는 O(1)입니다.
*/
class Solution {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    reverseList(head) {
         //brute force -> array
  // if(!head) return;
  
  // const nodes = [];
  // let cur = head;
  // while(cur) {
  //   nodes.push(cur);
  //   cur = cur.next;
  // }
  
  // for(let i = nodes.length-1; i > 0; i--) {
  //   nodes[i].next = nodes[i-1];
  // }
  
  // nodes[0].next = null;
  
  // return nodes[nodes.length-1];
  
  //optimization1 - recursion
  // if(!head) return null;
  
  // let newHead = head;
  // if(head.next) {
  //   newHead = this.reverseList(head.next);
  //   head.next.next = head;
  // }
  // head.next = null;
  
  // return newHead;
  
  //optimization2 - iteration 1->2->3
  let prev = null;
  let cur = head;
  
  while(cur) {
    let tmp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = tmp;
  }
  
  return prev;
    }
}
