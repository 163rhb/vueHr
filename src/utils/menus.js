import {getRequst} from "@/utils/api";

export const initMenu=(router,store)=>{

    if(store.state.routes.length>0){
        return ;
    }
    /*let routes=[
        {
            path:'*',
            component(resolve) {
                require(['../views/' + 'notFound.vue'], resolve)
            }
        }
    ]*/


    getRequst("/system/config/menu").then(data=>{
        if(data)
        {
            let fmtRoutes=formatRoutes(data);
            // eslint-disable-next-line no-console
            console.log(fmtRoutes)
            router.addRoutes(fmtRoutes)
            /*router.addRoutes(routes)*/
            store.commit('initRoutes',fmtRoutes)
            store.dispatch('connect');
        }
    })

}
export const formatRoutes=(routes)=> {
    let fmRoutes = [];
    routes.forEach(router => {
            let {
                path,
                component,
                name,
                meta,
                iconCls,
                children,
            } = router;
            if (children && children instanceof Array) {
                children = formatRoutes(children)
            }
            let fmRouter={
                path:path,
                name:name,
                meta:meta,
                iconCls:iconCls,
                children:children,
                //路由懒加载
                component(resolve){
                    if (component.startsWith("Homel")) {
                        require(['../views/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Emp")) {
                        require(['../views/emp/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Per")) {
                        require(['../views/per/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sal")) {
                        require(['../views/sal/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sta")) {
                        require(['../views/sta/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sys")) {
                        require(['../views/sys/' + component + '.vue'], resolve);
                    }
                }
            }
                fmRoutes.push(fmRouter);

        }
    )
    return fmRoutes
}