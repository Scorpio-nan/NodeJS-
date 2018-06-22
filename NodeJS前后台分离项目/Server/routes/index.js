var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var c = svgCaptcha.create();
var mysql = require('mysql');
var checkCode = null;
var base = require('../config/db');
var pool = mysql.createPool(base);
var reg = require('../lib/reg');

//获取注册验证码
router.get('/getCheckCode', function (req, res, next) {
    // 验证码，对了有两个属性，text是字符，data是svg代码
    var code = svgCaptcha.create({
        // 翻转颜色
        inverse: false,
        // 字体大小
        fontSize: 36,
        // 噪声线条数
        noise: 3,
        // 宽度
        width: 107,
        // 高度
        height: 44,
        //颜色
        color: false,
        //背景色
        background: 'rgba(255,255,255,0.5)'
    });
    // 保存到session,忽略大小写
    req.session.randomcode = code.text.toLowerCase();
    //console.log(req.cookies);
    // 返回数据直接放入页面元素展示即可
    res.send(JSON.stringify(code.data));
});

//用户注册接口
router.post('/register', (req, res, next) => {
    var obj = req.body;
    //console.log(obj);
    //数据格式校验
    if (obj.code != req.session.randomcode) {
        res.send({
            state: 'error',
            msg: '您的验证码有误，请核实！'
        })
    } else if (!reg.regUser.test(obj.name)) {
        res.send({
            state: 'error',
            msg: '您的用户名格式有误，请核实！'
        })
    } else if (!reg.regEmail.test(obj.email)) {
        res.send({
            state: 'error',
            msg: '您的邮箱格式有误，请核实！'
        })
        //密码是被md5加密后的字符串，长度固定32位
    } else if (obj.pass.length != 32) {
        res.send({
            state: 'error',
            msg: '您的密码格式有误，请核实！'
        })
    } else {
        //查询数据库里面是否已经有提交过来的用户名
        pool.query(`select ID,username from user_table where username='${obj.name}'`, (err, rej) => {
            if (err) {
                res.status(500);
                res.send({
                    state: 'error',
                    msg: '数据库发生错误！(query error)'
                })
            } else if (rej.length > 0) {
                res.send({
                    state: 'error',
                    msg: '用户名已存在，请重新输入！'
                })
            } else {
                //如果用户名没有被注册过，就往数据库里面插入一条数据
                pool.query(`insert into user_table (username,password,email,online) values('${obj.name}','${obj.pass}','${obj.email}',0)`, error => {
                    if (error) {
                        res.send({
                            state: 'error',
                            msg: '数据库发生错误！(insert error)'
                        })
                    } else {
                        res.send({
                            state: 'success',
                            msg: '注册成功！'
                        })
                    }
                })
            }
        })
    }
})

//用户登录接口
router.post('/login', (req, res, next) => {
    var obj = req.body;
    if (!reg.regUser.test(obj.name)) {
        res.send({
            state: 'error',
            msg: '您的用户名格式有误，请核实！'
        })
    } else if (obj.pass.length != 32) {
        res.send({
            state: 'error',
            msg: '您的密码格式有误，请核实！'
        })
    } else {
        pool.query(`select ID,username,password from user_table where username='${obj.name}'`, (err, data) => {
            if (err) {
                res.send({
                    state: 'error',
                    msg: '数据库发生错误！(query error)'
                })
            } else if (obj.name != data[0].username || obj.pass != data[0].password) {
                res.send({
                    state: 'error',
                    msg: '用户名或密码错误！'
                })
            } else {
                //如果登录成功的话把用户的在线状态修改为在线
                pool.query(`update user_table set online=1 where username='${obj.name}'`, uperr => {
                    if (uperr) {
                        console.log(`数据库发生错误 (update error)`);
                    } else {
                        console.log(`用户${obj.name}已上线`);
                    }
                })
                req.session.loginState = true;
                req.session.userID = data[0].ID;
                req.session.userinfo = {
                    name:obj.name,
                    online:data[0].online
                };
                res.send({
                    state: 'success',
                    msg: '登录成功！'
                })
            }
        })
    }
})

//检查用户是否为在线状态
router.get('/CheckLogin', (req, res, next) => {
    if (req.session.loginState) {
        res.send({
            state: 'success',
        })
    } else {
        res.send({
            state: 'error',
        })
    }
})

//退出登录接口
router.get('/loginOut', (req, res, next) => {
    console.log(req.session);
    if (!req.session.loginState) {
        res.send({
            state: 'error',
            msg: '会话丢失，请重新登录！'
        })
    } else {
        req.session.loginState = false;
        res.send({
            state: 'success',
            msg: '您已退出登录！'
        })
        pool.query(`update user_table set online = 0 where ID=${req.session.userID}`, (err, reslult) => {
            if (err) {
                console.log('error 数据库发生错误！');
            }
        })
    }
})

//获取用户信息
router.get('/getUserInfo', (req, res, next) => {
    if(!req.session.userinfo){
        res.send({
            state:'error',
            msg:'会话丢失，请重新登录！'
        })
    }else{
        res.send({
            state:'success',
            data:req.session.userinfo
        })
    }
})


module.exports = router;
