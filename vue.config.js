//基于Node的请求转发代理


let proxyObj={};
proxyObj['/ws'] = {
    ws: true,
    target: "ws://localhost:8088"
};
/*changOrign是改变请求头的意思，把它改成target*/
proxyObj['/']={
    ws:false,
    target:'http://localhost:8088',
    changeOrigin: true,
    pathRewrite:{
        '^/':'',
    }

}
module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj,

    }
}



