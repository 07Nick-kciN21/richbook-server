const express = require('express');
const dataRouter = require('./routers/dataRouter');
const cors = require('cors'); // 引入 cors

const app = express();
app.use(cors()); // 使用 cors 中间件

app.use(express.json());
app.use('/api/data', dataRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Image Editing App');
});

module.exports = app;
