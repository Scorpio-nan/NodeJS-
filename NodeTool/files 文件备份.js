var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname, '..', 'src');

var copy = function(src, dst) {
	//同步读取当前目录
	let paths = fs.readdirSync(src);
	paths.forEach(function(path) {
		var _src = src + '/' + path;
		var _dst = dst + '/' + path;
		//stats  该对象 包含文件属性
		fs.stat(_src, function(err, stats) { 
			if (err) throw err;
			//如果是个文件则拷贝
			if (stats.isFile()) { 
				//创建读取流
				let readable = fs.createReadStream(_src); 
				//创建写入流
				let writable = fs.createWriteStream(_dst); 
				readable.pipe(writable);
			} else if (stats.isDirectory()) { 
				//是目录则 递归
				checkDirectory(_src, _dst, copy);
			}
		});
	});
}
var checkDirectory = function(src, dst, callback) {
	fs.access(dst, fs.constants.F_OK, (err) => {
		if (err) {
			fs.mkdirSync(dst);
			callback(src, dst);
		} else {
			callback(src, dst);
		}
	});
};

//源目录
const SOURCES_DIRECTORY = path.resolve(__dirname, '..','backup');

checkDirectory(root, SOURCES_DIRECTORY, copy);

