//服务端入口，需要把访问的路径给到vue-router

import createApp from "./app.js";

//这个暴露的函数给外面的express服务使用
export default (context) => {
	//可能使用异步操作，所以用new Promise()
	return new Promise((resolve, reject) =>{

		let { router, vueApp} = createApp(context);
		//后端访问的路径交给前端的vue-router处理，不然前端访问不到
		router.push(context.url);

		//由于router有可能会有异步请求，所以加上onReady
		router.onReady(()=>{
			//当你访问路径的时候，肯定会匹配到组件，如果匹配不到就reject
			let matchedComponents = router.getMatchedComponents();
			// console.log(matchedComponents);
			if(!matchedComponents.length){
				return reject({code: 404})
			}
			resolve(vueApp);
		}, reject); 
	})
}