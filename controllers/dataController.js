const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

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
    function generateGUID(date) {
        const timestamp = Date.now();
        const combinedString = date + timestamp;
        const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
        return hash;
    }
    const date = req.params.date;
    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err){
            res.send(err);
        }
        const datas = JSON.parse(data);
        if(!Array.isArray(datas[date])){
            datas[date] = [];
        }
        const newData = {
            ...req.body,
            id : generateGUID(date),
        }

        datas[date].push(newData);
        const newDatas = JSON.stringify(datas, null, 2);
        fs.writeFile(filePath, newDatas, 'utf8', (err) => {
            if(err) {
                console.error("error:", err);
                return
            }
        })
    })
    
    res.send("update success");
};

exports.editData = async (req, res) => {
    const date = req.params.date;
    const id = req.body.id;
    const type = req.body.type;
    const cost = req.body.cost;
    const remark = req.body.remark;
    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err){
            res.send(err);
        }
        const datas = JSON.parse(data);
        const id = req.body.id;
        datas[date].forEach(data => {
            if(data.id == id){
                data.type = type;
                data.cost = cost;
                data.remark = remark;
                throw BreakException;
            }
        });
        const newDatas = JSON.stringify(datas, null, 2);
        fs.writeFile(filePath, newDatas, 'utf8', (err) => {
            if(err) {
                console.error("error:", err);
                return
            }
        })
    })
    res.send("edit success");
};
