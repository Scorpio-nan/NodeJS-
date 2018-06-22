class API{
	constructor(){
		this.Url = conf.Url;
	}
	//检测用户登录状态
	CheckLogin(callback){
		$.ajax({
			type:"get",
			url:this.Url + '/checkLogin?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//获取图片验证码
	getCheckCode(callback){
		$.ajax({
			type:"get",
			url:this.Url + '/getCheckCode?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//用户注册
	register(param,callback){
		$.ajax({
			type:"post",
			url:this.Url + '/register?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			data:param,
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//用户登录
	login(param,callback){
		$.ajax({
			type:"post",
			url:this.Url + '/login?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			data:param,
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//退出登录
	loginOut(callback){
		$.ajax({
			type:"get",
			url:this.Url + '/loginOut?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//获取用户信息
	getUserInfo(callback){
		$.ajax({
			type:"get",
			url:this.Url + '/getUserInfo?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//获取首页的banner图
	bannerList(callback){
		$.ajax({
			type:"get",
			url:this.Url + '/home/bannerList?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//获取滚动公告
	getNotice(callback){
		$.ajax({
			type:"get",
			url:this.Url + '/home/getNotice?' + Math.random(),
			dataType:'json',
			data:{
				id:1
			},
			xhrFields: {
		        withCredentials: true
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	//获取首页的游戏列表
	getLotteryList(id,callback){
		$.ajax({
			type:"get",
			url:this.Url + '/home/getLotteryList?' + Math.random(),
			dataType:'json',
			xhrFields: {
		        withCredentials: true
		    },
		    data:{
		    	id:id
		    },
			success(data){
				callback(data);
			},
			error(err){
				alert(err);
			}
		});
	}
	
}
export default new API();
