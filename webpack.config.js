// “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
module.exports = {
	
	//用webpack-stream不需要配置entry
	//entry:__dirname + '/app/js/main.js',//已多次提及的唯一入口文件
	output:{
		//path:__dirname +'/public/js',//打包后文件存放的地方
		filename:'[name].js'//打包后输出文件的文件名
	},
	devtool:'eval-soure-map',
	profile: true,//优化
    cache: true, //缓存 临时的文件
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
				},
				exclude:/node_modules/
			}
		]
	}
	
}