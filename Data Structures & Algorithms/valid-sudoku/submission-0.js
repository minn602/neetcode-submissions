class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
// 문제이해:
// 주어진 9*9 스도쿠 보드가 현재 상태에서 유효한지 검증하여 boolean으로 반환하는 문제입니다.
// 유효한 보드란 각 행에서 1-9 중복 없이, 각 열에서 1-9 중복 없이, 각 박스에서 1-9 중복 없는 상태입니다.
// 비어 있는 칸은 '.'으로 표현되어 검증에서 제외합니다.

// Brute Force:
// 각 행 순회하여 검증, 각 열 순회하여 검증, 각 박스를 순회하여 검증 할 수 있습니다.
// 시간복잡도는 O(9^2)*3으로 O(1) 상수시간만큼 소요되지만 순회를 3번함으로써 비효율적입니다.

// Optimization:
//최적화 아이디어는 하나의 순회에서 세가지를 동시에 검증하는 것입니다.
// 먼저 검증하는 board[i][j]는 각각 i행, j열, 특정 box에 속하여 각각에서 1-9 중복이 없는지 검증해야합니다.

// 핵심은 board[r][c]가 속하는 박스 인덱스를 실시간으로 계산하는 것입니다.
// 3x3 박스는 r을 3으로 나눈 몫(0,1,2)이 박스의 행 위치,
// c를 3으로 나눈 몫(0,1,2)이 박스의 열 위치입니다.
// 이걸 0-8의 단일 인덱스로 flatten하면:
//   boxIndex = Math.floor(r/3) * 3 + Math.floor(c/3)
// 예를 들어 r=4, c=7이면 박스 행=1, 박스 열=2 → 인덱스 5입니다.
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8]

// 그 후 각 행/열/박스 배열을 생성하여 각 인덱스에 Set을 사용합니다.
// Set을 사용하는 이유는 중복검사가 O(1)이고, 값 자체를 키로 사용하여 Map보다 단순합니다.
// 이 풀이도 O(9^2) = O(1) 시간이 소요되며 한번의 순회를 통해 검증할 수 있습니다.

    isValidSudoku(board) {
        const rows = Array.from({length: 9}, () => new Set);
        const cols = Array.from({length: 9}, () => new Set);
        const boxes = Array.from({length: 9}, () => new Set);

        for(let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const val = board[r][c]

                if(val === '.') continue;

                const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c/3);

                if(rows[r].has(val) || cols[c].has(val) || boxes[boxIndex].has(val)) return false;

                rows[r].add(val);
                cols[c].add(val);
                boxes[boxIndex].add(val);
            }
        }

        return true;
    }

}
