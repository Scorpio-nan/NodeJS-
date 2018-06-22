var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser('Wilson'));
app.use(express.static(path.join(__dirname, 'public')));

//session中间件
app.use(session({
    secret: 'Wilson',
    name: '', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        maxAge: 60 * 1000 * 30
    }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


//解决前端跨域请求
app.all('*', (req, res, next)=>{
    //如果下面的Access-Control-Allow-Credentials 设置为true的话，这里的url就不能指定为 * 号;
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials",true);
    //res.header("Access-Control-Max-Age", "100");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
})


//路由一定要放在session中间件后面，不然session不会挂载到express上去
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home',homeRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
