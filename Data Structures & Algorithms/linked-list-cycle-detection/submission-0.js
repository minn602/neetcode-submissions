/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    hasCycle(head) {
        let seen = new Set();
        let cur = head;

        while(cur) {
            if(seen.has(cur)) {
                return true;
            }

            seen.add(cur);
            cur = cur.next;
        }

        return false;
    }
}
