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
주어진 링크드 리스트의 순서를 교차하여 재배열하는 문제입니다.

Brute Force:
배열을 사용하여 node들을 배열에 담아 준후 배열의 인덱스 i = 0, j = nodes.length-1을 활용하여 
교차 재배열 할 수 있습니다.
이 풀이 방식은 모든 노드를 하나씩 탐색하여 시간복잡도 O(n), 추가 배열을 사용하여 공간복잡도 O(n) 입니다.
*/
class Solution {
    /**
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        if(!head) return;
  
        const nodes = [];
        let cur = head;
        while(cur) {
            nodes.push(cur);
            cur = cur.next;
        }
        
        let i = 0, j = nodes.length-1;
        while(i < j) {
            nodes[i].next = nodes[j];
            i++;
            if(i >= j) break;
            nodes[j].next = nodes[i];
            j--;
        }
        
        nodes[i].next = null;
    }
}
