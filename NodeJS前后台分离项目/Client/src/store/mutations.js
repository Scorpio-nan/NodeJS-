import {
	LOGINSTATE,
	USERINFO
} from './mutation_types';
export default{
	[LOGINSTATE](state,res){
		state.loginState = res;
	},
	[USERINFO](state,res){
		state.userInfo = res;
	}
}
