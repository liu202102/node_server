import express from 'express'
import * as bodyParser from 'body-parser'
import HomeRouter from './route/home'
import LoginRouter from './route/login'
import UserRouter from './route/user'
import { res_nos } from './method'

const app = express()

app.listen( 8080, () => {
	console.log( 'http://127.0.0.1:8080' )
	console.log( 'http://127.0.0.1:8080/home' )
} )

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )

// 没有挂载路径的中间件,应用的每个请求都会执行该中间件
app.use( ( req, res, next ) => {
	res.header( "Access-Control-Allow-Origin", "*" );
	res.header( 'Access-Control-Allow-Methods', 'GET, POST' )
	res.header( "Access-Control-Allow-Headers", "X-Requested-With" )
	res.header( 'Access-Control-Allow-Headers', 'Content-Type' )
	next()
} )

// 错误处理中间件
app.use( ( err: any, req: any, res: any, next: any ) => {
	console.log( '777' )
	res.status( 500 ).json( res_nos( '404' ) )
} )

app.use( HomeRouter )

app.use( LoginRouter )

app.use( UserRouter )
