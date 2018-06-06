const webpackServerConf = require("./webpack-server.conf.js")
const webpack = require("webpack")
const fs = require("fs")
const path = require("path")
const Mfs = require("memory-fs"); //webpack打包后会将文件保存在内存中，我们要读取就从内存中取
const axios = require("axios")

const webpackCompiler = webpack(webpackServerConf);

var mfs = new Mfs();
webpackCompiler.outputFileSystem = mfs; //从内存中取

webpackCompiler.watch({}, async (error, stats) => {
  if(error) return console.log(error);

  stats = stats.toJson(); //字符串变JSON

  stats.errors.forEach(err => {
    console.log(err)
  });

  stats.warnings.forEach(err => {
    console.log(err)
  });



  //这一步会生成三个内存文件

  //server Bundle json 文件
  let serverBundlePath = path.join(
    webpackServerConf.output.path, 'vue-ssr-server-bundle.json'
  )

  let serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath, "utf-8"));

  // console.log(serverBundle)


  //client Bundle json 文件
  let clientBundle = await axios.get("http://localhost:8081/vue-ssr-client-manifest.json");
  // console.log(clientBundle)


  // 模板
  let template = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf-8");
  // console.log(template)

})

module.exports = (cb) => {
  webpackCompiler.watch({}, async (error, stats) => {
    if(error) return console.log(error);

    stats = stats.toJson(); //字符串变JSON

    stats.errors.forEach(err => {
      console.log(err)
    });

    stats.warnings.forEach(err => {
      console.log(err)
    });



    //这一步会生成三个内存文件

    //server Bundle json 文件
    let serverBundlePath = path.join(
      webpackServerConf.output.path, 'vue-ssr-server-bundle.json'
    )

    let serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath, "utf-8"));

    // console.log(serverBundle)


    //client Bundle json 文件
    let clientBundle = await axios.get("http://localhost:8081/vue-ssr-client-manifest.json");
    // console.log(clientBundle)


    // 模板
    let template = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf-8");
    // console.log(template)


    cb && cb(serverBundle, clientBundle, template);

  })
}