<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		created() {
			
		},
		computed:{
			islogin(){
				return this.$store.getters.checkLogin;
			}
		}
	}
</script>

<style lang="less">
	/*******   关闭图标    类名：vux-close   ********/
	
	@import '~vux/src/styles/close.less';
	/*******
	border1px 
	类名：vux-1px-l 左边框
	vux-1px-r 右边框
	vux-1px-t 上边框
	vux-1px-b 下边框
	vux-1px-tb 上下边框
	vux-1px 全边框
 *******/
	
	@import '~vux/src/styles/1px.less';
	/******* 重置   *******/
	
	@import '~vux/src/styles/reset.less';
	body {
		background-color: #fbf9fe;
	}
</style>