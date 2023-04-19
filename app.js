const axios = require('axios');

const getSingleStockInfo = stock => new Promise((resolve, reject) => {
    if (!stock) { return reject(Error('Stock symbol required')); }
    if (typeof stock !== 'string') { return reject(Error(`Invalid argument type. Required: string. Found: ${typeof stock}`)); }

    return axios.get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?formatted=false&modules=price%2CfinancialData%2CsummaryDetail`)          
        .then(res => {
            const { data } = res;
            if (!data || !data.quoteSummary.result || !data.quoteSummary.result.length) {
                return reject(new Error(`Error retrieving info for symbol ${stock}`));
            }
            return resolve(data.quoteSummary.result[0]);
        })
        .catch(err => reject(err));
});

const getStocksInfo = stockList => new Promise((resolve, reject) => {
    if (!stockList) { return reject(Error('Stock symbol list required')); }
    if (!Array.isArray(stockList)) { return reject(Error('Invalid argument type. Array required.')); }
    
    const list = [...stockList];
    if (!list.length) { return Promise.resolve([]); }
    
    const promises = list.map(getSingleStockInfo);
    return resolve(Promise.all(promises));
});

module.exports = {
    getSingleStockInfo,
    getStocksInfo
};