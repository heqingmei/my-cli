import Vue from "vue";
import createRouter from "./router";
import App from "./App.vue";

//
export default (context) =>  {
	//实例 每次请求都会创建新的实例
	const router = createRouter();
	const vueApp = new Vue({
	  router,
	  components: { App },
	  template: '<App/>'
	})

	return { router, vueApp};
}