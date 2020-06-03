import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router/index'
//收到服务器端的成功响应信息，显示提示
axios.interceptors.response.use(success=>{
    /*数据库成功返回，但是数据状态为500*/
    if(success.status&&success.status===200&&success.data.status===500)
    {
        Message.error(success.data.msg)
        return
    }
    if(success.data.msg)
        Message.success(success.data.msg)
    return success.data;

},error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error("服务器被吃了！");
    } else if (error.response.status === 403) {
        Message.error("权限不足")
    } else if (error.response.status === 401) {
        Message.error("尚未登录，请先登录")
        router.replace('/')
    } else {
        if (error.response.data) {
            Message.error(error.response.data)
        }
        else {
            Message.error("发生未知的错误！")
        }
    }
    return

})

let base='';
export const postKeyValueRequst=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,/*注意格式*/
        data:params,//不可少
        transformRequest:[function (datas) {/*把json格式请求数据转换成键值对请求*/
            let ret='';
            for(let i in datas)
            {
                ret+=encodeURIComponent(i)+'='+encodeURIComponent(datas[i])+'&'
                // eslint-disable-next-line no-console
                console.log(ret);
            }
            return ret;
        }],
        /*headers:{
            'Content-Type':'application/x-www-form-urlencoded'
            //解决axios和Ajax的请求头冲突问题
        }
*/
    })
}
export const postRequst=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,
    })
}
export const putRequst=(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params,
    })
}
export const getRequst=(url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params,

    })
}
export const deleteRequst=(url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params,
    })
}





/*spring security的登录请求是不支持json传参(可以在后端更改代码)，只能以key:value方式传参*/