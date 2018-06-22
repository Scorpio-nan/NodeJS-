<template>
	<div id="Index">
		<header class="header">
			<a href="javascript:;" class="logo" v-show="$route.path == '/Home'">
				<img src="static/img/logo/default-logo.png" />
			</a>
			<a href="javascript:;" class="backItem" v-show="$route.path != '/Home'" @click="$router.goBack();">
				<span class="back">返回</span>
			</a>
			<h2 class="title">&nbsp;</h2>
			<a href="javascript:;" class="tips" v-if="!islogin">
				<span @click="toPage('/Login')" v-if="$route.path != '/Login'">登录</span><span @click="toPage('/Register')" v-if="$route.path != '/Register'">注册</span>
			</a>
			<a href="javascript:;" class="tips loginOut" v-if="islogin">
				<span @click="loginOut">退出</span>
			</a>
			<p class="currentUser" v-if="islogin && $route.path == '/Home'">{{userInfo.name}}</p>
		</header>
		<div class="main" ref="view">
			<transition :name="transitionName">
				<router-view class="child-view"></router-view>
			</transition>
		</div>
		<footer class="footer vux-1px-t">
			<div class="item">
				<span class="iconfont icon-gerenzijin"></span>
				<p>资金管理</p>
			</div>
			<div class="item">
				<span class="iconfont icon-datijilu"></span>
				<p>投注记录</p>
			</div>
			<div class="item">
				<span class="iconfont icon-lianxikefu"></span>
				<p>客服</p>
			</div>
			<div class="item">
				<span class="iconfont icon-zhuanzhang"></span>
				<p>转账</p>
			</div>
			<div class="item">
				<span class="iconfont icon-youhuihuodong"></span>
				<p>优惠活动</p>
			</div>
		</footer>
		<toast v-model="Modle.show" :type="Modle.type" :time="Modle.time" is-show-mask :text="Modle.txt" :position="Modle.pos"></toast>
	</div>
</template>
<script>
	import { Toast } from 'vux'
	export default {
		name: 'Index',
		components: {
			Toast
		},
		data() {
			return {
				transitionName: 'slide-left',
				Modle:{
					show:false,
					type:'success',
					time:1000,
					txt:'Hello Word',
					pos:'middle'
				}
			}
		},
		beforeRouteUpdate(to, from, next) {
			let isBack = this.$router.isBack;
			if(isBack) {
				this.transitionName = 'slide-right'
			} else {
				this.transitionName = 'slide-left'
			}
			this.$router.isBack = false
			next();
		},
		created(){
			this.$store.dispatch('getUserInfo');
		},
		methods: {
			toPage(path) {
				this.$router.push({
					path,
				})
			},
			loginOut(){
				this.$Api.loginOut(res=>{
					if(res.state == 'success'){
						this.Modle.txt = '您已退出登录！';
						this.Modle.show = true;
						setTimeout(()=>{
							this.$store.dispatch('checkLogin');
						},500)
					}
				})
			}
		},
		computed:{
			islogin(){
				return this.$store.getters.checkLogin;
			},
			userInfo(){
				return this.$store.getters.getUserInfo.data;
			}
		},
		mounted() {
			const that = this;
		},
		watch: {

		},
	}
</script>

<style scoped="scoped" lang="scss">
	@import '~static/sass/public.scss';
	#Index {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		@include themeBg();
		.header {
			display: table;
			width: 100%;
			height: 48px;
			@include themeLinear();
			padding: 0 5px;
			position:relative;
			.logo,
			.tips,
			.title,
			.backItem {
				display: table-cell;
				vertical-align: middle;
				text-align: center;
			}
			.backItem {
				width: 80px;
				position: relative;
				&:after{
					display: block;
					content: '';
					width: 10px;
					height: 10px;
					border-left:1px solid $importFontColor;
					border-bottom:1px solid $importFontColor;
					position: absolute;
					left: 15px;
					top: 50%;
					transform: translate(-50%,-50%) rotate(45deg);
				}
			}
			.logo {
				width: 80px;
				img {
					display: inline-block;
					width: 50px;
					height: auto;
					margin-left: -20px;
				}
			}
			.tips {
				width: 80px;
				span {
					display: inline-block;
					width: 50%;
					text-decoration: underline;
					font-weight: 700;
					&:active {
						color: rgba(0, 0, 0, 0.5);
					}
				}
			}
			.loginOut{
				text-align: right;
				padding-right: 8px;
			}
			.currentUser{
				position: absolute;
			    right: 51px;
			    top: 51%;
			    transform: translate(0,-50%);
			    font-size: 16px;
			    font-weight: 600;
			    text-decoration: underline;
			}
		}
		.main {
			flex: 1;
			position: relative;
		}
		.footer {
			display: table;
			width: 100%;
			height: 50px;
			background: $gridColor;
			.item {
				display: table-cell;
				width: 20%;
				height: 100%;
				text-align: center;
				vertical-align: middle;
				color: $importFontColor;
			}
			span {
				font-size: 20px;
			}
			p {
				font-size: 13px;
				margin-top: -4px;
			}
		}
	}
	
	.child-view {
		position: absolute;
		width: 100%;
		height: 100%;
		transition: all .45s cubic-bezier(.55, 0, .1, 1);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		/*background: #fff;*/
		-webkit-backface-visibility: hidden;
		-webkit-transform-style: preserve-3d;
		z-index: 10;
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 1;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
		z-index: 1000;
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 1;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
</style>