const path = require('path');
const fs = require('fs');

const filePath = path.join('data', 'datas.json');

exports.getDateData = async (req, res) => {
    // res.send(req.params);
    const date = req.params.date;


    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ error: 'Error reading data file' });
        }

        try {
            const datas = JSON.parse(data);
            const result = datas[date] || []; // 如果 datas[date] 為 undefined，則返回空陣列

            res.json({ date: date, datas: result });
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing data file' });
        }
    });
};

exports.getMonthData = async (req, res) => {
    
};

exports.addData = async (req, res) => {
    const date = req.params.date;
    // const {type, income_or_expenditure, cost, remark} = req.body;
    // 讀取../data/datas.json
    // 如果沒有datas[date]則初始化一個
    // 寫入req.body

    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err){
            res.send(err);
        }
        const datas = JSON.parse(data);
        if(!Array.isArray(datas[date])){
            datas[date] = [];
        }
        datas[date].push(req.body);
        const newData = JSON.stringify(datas, null, 2);
        fs.writeFile(filePath, newData, 'utf8', (err) => {
            if(err) {
                console.error("error:", err);
                return
            }
        })
    })
    
    res.send("update success");
};