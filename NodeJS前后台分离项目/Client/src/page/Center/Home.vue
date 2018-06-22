<template>
	<div id="Home" ref="view">
		<scroller lock-x :height="viewHeight" ref="scrollerEvent" scrollbarY>
			<view-box ref="viewBox">
				<swiper :aspect-ratio="335/800" loop auto>
					<swiper-item class="swiper-img" v-for="(item, index) in bannerArr" :key="index">
						<img :src="confSrc + item.src" @click="handleClick(item.path)">
					</swiper-item>
				</swiper>
				<div class="Marquem vux-1px-b">
					<div class="span">
						<span class="iconfont icon-gonggao"></span>
					</div>
					<div class="marquee">
						<marquee class="NotContent" scrollamount="3" scrolldelay="0" direction="left" v-html="notice"></marquee>
					</div>
				</div>
				<scroller lock-y scrollbar-x class="vux-1px-b">
					<div class="box vux-1px-b">
						<div class="box-item" @click="tabClick(0)" :class="tabIndex == 0 ? 'active':''">热门游戏</div>
						<div class="box-item" @click="tabClick(1)" :class="tabIndex == 1 ? 'active':''">彩票游戏</div>
						<div class="box-item" @click="tabClick(2)" :class="tabIndex == 2 ? 'active':''">真人视讯</div>
						<div class="box-item" @click="tabClick(3)" :class="tabIndex == 3 ? 'active':''">电子游艺</div>
						<div class="box-item" @click="tabClick(4)" :class="tabIndex == 4 ? 'active':''">体育竞技</div>
					</div>
				</scroller>
				<div class="main">
					<div class="table-layout">
						<div class="table-cell" v-for="(item,i) in lotarr" :key="i">
							<div class="grid-bg">
								<img class="icon" :src="'static/img/garden/'+item.code+'.png'">
								<p class="text-center font-normal padding-p">{{item.lotteryName}}</p>
							</div>
						</div>
					</div>
				</div>
				<copyRight></copyRight>
			</view-box>
		</scroller>
	</div>
</template>

<script>
	import { Scroller } from 'vux'
	import { Swiper } from 'vux'
	import { SwiperItem } from 'vux'
	import { Grid } from 'vux'
	import { GridItem } from 'vux'
	import { ViewBox } from 'vux'
	import copyRight from '@/components/CopyRight'
	export default {
		name: 'Home',
		components: {
			Scroller,
			Swiper,
			SwiperItem,
			Grid,
			GridItem,
			ViewBox,
			copyRight
		},
		data() {
			return {
				viewHeight: "100px",
				bannerArr: [],
				confSrc: conf.Url,
				notice: '',
				tabIndex: 0,
				lotarr:[],
			}
		},
		beforeCreate() {
			this.$nextTick(() => {
				this.viewHeight = this.$refs.view.offsetHeight + 'px';
			})
		},
		methods: {
			init() {
				this.$Api.bannerList(res => {
					if(res.state == 'success') {
						this.bannerArr = res.rows;
					}
				})
			},
			initData(id = ''){
				this.$Api.getLotteryList(id,res=>{
					console.log(res);
					if(res.state == 'success'){
						this.lotarr = res.rows;
					}
				})
			},
			handleClick(path) {
				this.$router.push(path);
			},
			getNotice() {
				this.$Api.getNotice(res => {
					if(res.state == 'success') {
						this.notice = res.data;
					}
				})
			},
			tabClick(index) {
				this.tabIndex = index;
				this.initData(index);
			}
		},
		mounted() {
			
		},
		created() {
			this.$store.dispatch('checkLogin');
			this.init();
			this.getNotice();
			this.initData();
		},
		watch: {

		},
		computed: {

		}
	}
</script>
<style type="text/css">
	.swiper-img img {
		display: block;
		width: 100%;
		height: auto;
	}
	.weui-tab__panel{
		padding-bottom: 0 !important;
	}
</style>
<style scoped="scoped" lang="scss">
	@import '~static/sass/public.scss';
	.Marquem {
		height: 34px;
		display: table;
		width: 100%;
		background: $gridColor;
		.span {
			display: table-cell;
			width: 34px;
			vertical-align: middle;
			text-align: center;
			.iconfont {
				font-size: 20px;
			}
		}
		.marquee {
			display: table-cell;
			vertical-align: middle;
			marquee {
				font-size: 14px;
				vertical-align: middle;
			}
		}
	}
	.table-layout{
		width: 100%;
		@include clear();
		.table-cell{
			width: 33.33333%;
			padding: 10px 10px;
			float: left;
			box-sizing: border-box;
			.icon{
				display: block;
				width: 60px;
				height: 60px;
				margin: 0 auto;
			}
			.text-center{
				text-align: center;
				font-size: 14px;
				padding-top: 4px;
			}
			.grid-bg{
				padding: 6px 0;
				background: $gridColor;
				border-radius: 4px;
			}
		}
	}
	.box {
		width: 410px;
		height: 40px;
		padding: 0 10px;
		@include clear();
		padding-top: 10px;
		.box-item {
			vertical-align: middle;
			font-size: 14px;
			padding: 0 3px;
			float: left;
			margin-left: 8px;
		}
		.active {
			color: $warnColor;
		}
		.box-item:first-of-type {
			margin-left: 0;
		}
	}
	
	.vux-1px-b:after {
		border-bottom: 1px solid #fff;
		color: #fff;
		bottom: 1px;
	}
</style>