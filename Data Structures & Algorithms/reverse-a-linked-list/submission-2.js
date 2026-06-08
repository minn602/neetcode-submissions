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
문재이해:
링크드 리스트를 뒤집는 문제입니다.

예를들어, 1 -> 2 -> 3 -> null이 주어지면 3 -> 2 -> 1 -> null을 반환해야합니다.

Brute Force:
새로운 배열에 노드들을 저장한 뒤 역순으로 다시 연결할 수 있습니다.

예를들어, 1 -> 2 -> 3을 순회하며 [1, 2, 3]에 저장한 후 3 -> 2 -> 1 순으로 다시 연결합니다.
하지만 추가 공간 O(n)이 필요합니다.

Optimization:
재귀를 사용하면 추가 자료구조 없이 포인터만 변경하여 뒤집을 수 있습니다.

핵심아이디어는 1 -> 2 -> 3 이 있을때 head(1)을 제외한 나머지 부분 2 -> 3을 먼저 뒤집는 것입니다.
즉, reverseList(1)은 내부적으로 reverseList(2)를 호출하고, reverseList(2)는 내부적으로 reverseList(3)을 호출하여 재귀가 가장 끝 노드에 도달하면 3을 새로운 head로 반환합니다.
이후 재귀가 돌아오면서 연결 방향을 뒤집습니다.

새 head = 3, 현재 head = 2일때, head.next.next = head를 수행하면 3 -> 2가 되어 방향이 반대로 연결됩니다.
또한 새로운 방향 연결 후 기존 방향은 null로 명시적으로 끊어줌으로써 순환참조를 방지합니다.

각 노드를 한번씩 방문하여 시간복잡도는 O(n)이 됩니다.
*/
class Solution {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    reverseList(head) {
        if(!head) return null;

        let newHead = head;
        if(head.next) {
            newHead = this.reverseList(head.next);
            head.next.next = head;
        }

        head.next = null;

        return newHead
    }
}
