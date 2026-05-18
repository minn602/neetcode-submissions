class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let buy = 0, sell = 1;
        let res = 0;

        while(sell < prices.length) {
            if(prices[buy] > prices[sell]) {
                buy = sell;
            } else {
                const profit = prices[sell] - prices[buy];
                res = Math.max(res, profit);
            }
            sell++;
        }

        return res;
    }
}
