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
정렬된 두개의 링크드 리스트르르 하나의 정렬된 링크드 리스트로 병합하는 문제입니다.

Brute Force:
두 리스트의 값을 모두 배열에 담은 뒤 정렬하고, 다시 링크드 리스트를 생성할 수 있습니다.
하지만 정렬과정과 추가 배열이 필요하여 비효율적입니다.

Optimization:
재귀를 사용하면 기존 노드를 그대로 재사용하면서 병합할 수 있습니다.
핵심 아이디어는 두 리스트의 현재 노드 중 더 작은 값을 결과 리스트의 다음 노드로 선택하는 것입니다.

예를들어,
list1 = 1 -> 2 -> 4
list2 = 1 -> 3 -> 4
일때,

첫번째 비교에서 1과1을 비교합니다.
list1의 1을 선택했다면 결과의 첫 노드의 1이 되고 그 다음 노드는 mergeTwoLists(2 -> 4, 1 -> 3 -> 4)의 결과가 됩니다.

즉, 현재 선택한 노드의 next를 나머지 병합 결과에 연결하는 방식입니다.

재귀가 진행되다 한쪽 리스트가 모두 소진되면, 남아있는 리스트들은 그대로 반환하면 됩니다. (이미 정렬되어 추가 작업은 필요하지 않습니다.)

각 노드는 최대 한번만 방문하므로 시간 복잡도는 O(n+m)입니다.
*/

class Solution {
    /**
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeTwoLists(list1, list2) {
        if(!list1) return list2;
        if(!list2) return list1;
        
        if(list1.val <= list2.val) {
            list1.next = this.mergeTwoLists(list1.next, list2);
            return list1;
        } else {
            list2.next = this.mergeTwoLists(list1, list2.next);
            return list2;
        }
    }
}