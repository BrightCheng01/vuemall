import axios from 'axios'

export function request(config,success,failure){


    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/z8',
        timeout:5000
    })

    //为什么要用拦截
    //1.config中有一些信息不符合服务器的请求
    //2..需要在某些网络请求时给用户显示一个表示请求请求(加载)的图标
    //3.某些网络请求(比如登录)，需要携带一些特殊的信息
    instance.interceptors.request.use(aaa=>{
        // console.log(aaa);
        return aaa  //或aaa.data拦截完必须返回些什么
    },err=>{
        // console.log(err);
    })

    instance.interceptors.response.use(res=>{
        return res.data  //或aaa.data拦截完必须返回些什么
    },err=>{
        // console.log(err);
    })

        return instance(config)



}