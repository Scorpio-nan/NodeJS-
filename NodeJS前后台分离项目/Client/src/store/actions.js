import{
	LOGINSTATE,
	USERINFO
} from './mutation_types';
import api from '@/api/User';
export default{
	checkLogin({commit}){
		api.CheckLogin(res=>{
			if(res.state == 'success'){
				commit(LOGINSTATE, true);
			}else{
				commit(LOGINSTATE, false);
			}
		})
	},
	getUserInfo({commit}){
		api.getUserInfo(res=>{
			commit(USERINFO,res);
		})
	}
}
