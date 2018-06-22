<template>
	<div class="copyright">
		<p>{{copyright}}</p>
	</div>
</template>

<script>
	export default{
		name:'copyright',
		data(){
			return {
				copyright:conf.copyRight
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.copyright{
		width: 100%;
		padding-top: 15px;
		p{
			text-align: center;
			font-size: 14px;
			padding: 5px 0;
		}
	}
</style>