const devServer = require("./build/dev-server.js");
const express = require("express");

const app = express();
const path = require("path");
// const vueServerRender = require("vue-server-renderer").createRenderer({
// 	template: require("fs").readFileSync(path.join(__dirname,'./index.html'),"utf-8")
// });
const vueServerRender = require("vue-server-renderer");




app.get("*",  async (req, res) => {
	res.status(200);
	res.setHeader("content-type", "charset=utf-8;text/html;");

	devServer(function(serverBundle, clientBundle, template){
		let render = vueServerRender.createBundleRenderer(serverBundle, {
			template,
			clientManifest: clientBundle.data,
			runInNewContext: false
		})

		render.renderToString({
			url: req.url
		}).then(function(html){
			// console.log(html)
			res.end(html)
		}).catch(err => console.log(err));
	});

})

app.listen(5000, ()=>{
	console.log("启动成功！")
})


