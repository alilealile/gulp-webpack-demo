# 项目文件夹
 
* 开发环境
	- app文件夹
		- js       写的 JavaScript 模块
		- json     用来存放原始数据
		- stylus   stylus 文件
		- view     html 文件

	- public文件夹
	    - js       使用webpack打包生成的js文件
	    - css      stylus编译后的常熟市文件

	- view 文件夹  (webpack 打包后的html 文件(用来存放之后供浏览器读取的文件))
			

* 部署环境
	- dist

- .babelrc             babel的配置	
- gulpfile.js          gulp入口文件，引入了所有的gulp子任务
- webpack.config.js    webpack入口文件  js模块 打包   

# 项目运行
* 下载
  - `https://github.com/alilealile/gulp-webpack-demo.git`

* 安装依赖
  - `npm install`

* 开发环境
  - 启动
    - `gulp`
  - 编辑
    - `gulp watch`


* 部署环境
  - 更改 app.js
  
  - 构建
    - `gulp build`

  - 启动
    - `gulp`

* 访问
    - `http://127.0.0.1:8090/chat.html`