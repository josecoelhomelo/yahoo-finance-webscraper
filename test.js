const yf = require('./app');

yf.getSingleStockInfo('AAPL').then(console.log);
//yf.getStocksInfo(['TSLA', 'AAPL']).then(console.log);