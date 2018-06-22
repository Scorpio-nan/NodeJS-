import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

Router.prototype.goBack = function() {
	this.isBack = true
	window.history.go(-1)
}

export default new Router({
	routes: [{
		path: '/',
		name: 'Index',
		component: resolve => require(['@/page/Index'], resolve),
		redirect: 'Home',
		children: [{
			path: 'Home',
			name: 'Home',
			component: resolve => require(['@/page/Center/Home'], resolve)
		},{
			path: 'Register',
			name: 'Register',
			component: resolve => require(['@/components/Register'], resolve)
		},{
			path: 'Login',
			name: 'Login',
			component: resolve => require(['@/components/Login'], resolve)
		}]
	}]
})