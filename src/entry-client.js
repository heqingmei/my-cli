import createApp from "./app.js";
let { router, vueApp} = createApp({});

router.onReady(()=>{
	vueApp.$mount("#app")
});