module.exports = function(io) {

	//在线用户
	var onlineUsers = {};
	//当前在线人数
	var onlineCount = 0;

	io.on('connection', socket => {
		socket.on('users', obj => {
			//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
			socket.name = obj.user;
			//检查在线列表，如果不在里面就加入
			if(!onlineUsers.hasOwnProperty(obj.user)) {
				onlineUsers[obj.user] = obj.user;
				//在线人数+1
				onlineCount++;
			}
			//向所有客户端广播用户加入
			io.emit('login', {
				onlineUsers: onlineUsers,
				onlineCount: onlineCount,
				user: obj
			});
			
			console.log(obj.user + '玩家加入~~~');
			
			//斗地主  3 个人都到齐啦，可以提示开始啦~~~；
			if(onlineCount == 3){
				io.emit('begin',{
					isTrue:true,
					msg:'3个人都到齐了~~可以开始愉快的玩耍了~~',
					onlineUsers: onlineUsers
				})
			}else{
				io.emit('begin',{
					isTrue:false,
					msg:obj.user + '进入了房间~~~还需要等待'+(3- onlineCount)+'名玩家加入~~~',
					onlineUsers: onlineUsers
				})
			}
			
		})

		//监听用户退出
		socket.on('disconnect', function() {
			//将退出的用户从在线列表中删除
			if(onlineUsers.hasOwnProperty(socket.name)) {
				//退出用户的信息
				var obj = {
					userid: socket.name,
					user: onlineUsers[socket.name]
				};
				//删除
				delete onlineUsers[socket.name];
				//在线人数-1
				onlineCount--;
				//向所有客户端广播用户退出
				io.emit('logout', {
					onlineUsers: onlineUsers,
					onlineCount: onlineCount,
					user: obj
				});
				console.log(obj.user + '退出了房间~');
			}
		});

		//监听用户发布聊天内容
		socket.on('message', function(obj) {
			//向所有客户端广播发布的消息
			io.emit('message', obj);
			console.log(obj.user + '说：' + obj.content);
		});

	})
}