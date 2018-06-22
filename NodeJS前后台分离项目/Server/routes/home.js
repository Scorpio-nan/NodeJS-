var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var base = require('../config/db');
var pool = mysql.createPool(base);

const fs = require('fs');

//获取首页banner图
router.get('/bannerList', (req, res, next) => {
    pool.query(`select * from img_table`, (err, result) => {
        if (err) {
            res.send({
                state: 'error',
                msg: '数据库发生错误 (query error)'
            })
        } else {
            res.send({
                state: 'success',
                rows: result
            })
        }
    })
})

//获取首页滚动公告
router.get('/getNotice', (req, res, next) => {
    pool.query(`select ID,data from notice_table where ID=${req.query.id}`, (err, result) => {
        if (err) {
            res.send({
                state: 'error',
                msg: '数据库发生错误 (query error)'
            })
        } else {
            res.send({
                state: 'success',
                data: result[0].data
            });
        }
    })
})

//获取首页的游戏列表
router.get('/getLotteryList', (req, res, next) => {
    var query = '';
    if(req.query.id != 0){
        query = `select * from lottery_table where clsaction='${req.query.id}'`;
    }else{
        query = `select * from lottery_table`;
    }
    pool.query(query,(error,result)=>{
        if(error){
            res.send({
                state:'error',
                msg:'数据库发生错误 (query error)'
            })
        }else{
            res.send({
                state:'success',
                rows:result
            })
        }
    })
})








//拿到数据源插入sql;
// fs.readFile('./tempFile/game.json',(err,res)=>{
//     if(err){
//         return console.error('读取文件发生错误了！');
//     }
//     var lotJson = res.toString();
//     lotJson = JSON.parse(lotJson);
//     lotJson.forEach(ele => {

        //  * 彩票游戏 clsaction 1
        //  * 真人视讯 clsaction 2
        //  * 电子游艺 clsaction 3
        //  * 体育竞技 clsaction 4

//         pool.query(`insert into lottery_table (lotteryName,nickName,runTime,mobileInd,code,periods,coll,clsaction) values ('${ele.PARA_NAME}','${ele.LOTTERY_TICKET_NAME}','${ele.REMARK}','${ele.MOBILE_IND}','${ele.CODE}','${ele.PERIODS_NO}','${ele.COLL}','3')`, err=>{
//             if(err){
//                 console.log(err);
//                 console.error('数据库发生错误 (insert err)');
//             }
//         })
//     });
// })

module.exports = router;
