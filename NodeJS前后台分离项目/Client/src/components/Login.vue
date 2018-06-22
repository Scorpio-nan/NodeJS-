<template>
	<div id="Login" ref="view">
		<scroller lock-x :height="viewHeight" ref="scrollerEvent">
			<div class="container">
				<x-input title="用户名" name="username" placeholder="请输入用户名(字母加数字组合)" type="text" v-model="Userobj.name"></x-input>
				<!--<p class="tips">*请输入以字母开头的6-15位字母、数字、下划线</p>-->
				<x-input title="密码" name="username" placeholder="请输入密码(字母加数字组合)" type="password" v-model="Userobj.pass"></x-input>
				<!--<p class="tips">*请使用6-20位英文、数字及下划线组合</p>-->
				
				<div class="btn">
					<x-button type="primary" @click.native="handleSubmit">登录</x-button>
				</div>
			</div>
		</scroller>
		<toast v-model="Modle.show" :type="Modle.type" :time="Modle.time" is-show-mask :text="Modle.txt" :position="Modle.pos"></toast>
	</div>
</template>

<script>
	import { XInput } from 'vux'
	import { Scroller } from 'vux'
	import { XButton } from 'vux'
	import { Toast } from 'vux'
	export default {
		name:'Login',
		components:{
			XInput,
			Scroller,
			XButton,
			Toast
		},
		data(){
			return {
				viewHeight: "100px",
				Userobj:{
					name:'test668',
					pass:'abc123'
				},
				Modle:{
					show:false,
					type:'success',
					time:1000,
					txt:'Hello Word',
					pos:'middle'
				}
			}
		},
		beforeCreate() {
			this.$nextTick(() => {
				this.viewHeight = this.$refs.view.offsetHeight + 'px';
			})
		},
		mounted(){
			
		},
		methods:{
			handleSubmit(){
				if(this.formCheck){
					this.Userobj.pass = $.md5(this.Userobj.pass)
					this.$Api.login(this.Userobj,res =>{
						if(res.state == 'success'){
							this.Modle.type = 'success';
							this.Modle.txt = '登录成功，马上为您跳转到首页...！';
							this.$store.dispatch('getUserInfo');
							setTimeout(()=>{
								this.$store.dispatch('checkLogin');
								this.$router.push({path:'/'});
							},1000)
						}else{
							this.Modle.type = 'warn';
							this.Modle.txt = res.msg;
						}
						this.Modle.show = true;
					})
				}else{
					this.Modle.show = true;
					this.Modle.type = 'warn';
				}
			},
			formCheck(){
				//用户名正则，4到16位（字母，数字，下划线）
				let userReg = /^[a-zA-Z0-9_]{4,8}$/;
				//密码强度正则，最少6位，包括至少1个小写字母，1个数字
				let passReg = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
				//Email正则
				let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!userReg.test(this.Userobj.name)){
					this.Modle.txt = '请输入正确的用户名';
					return false;
				}
				if(!passReg.test(this.Userobj.pass)){
					this.Modle.txt = '请输入正确的密码';
					return false;
				}
				return true;
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container{
		padding: 10px 12px;
		padding-top: 40px;
		.btn {
			padding-top: 40px;
		}
	}
</style>