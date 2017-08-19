(function() {
    'use strict';

    var app = new Vue({
	el: '#app',
	data: {
	    name: 'Vue.js',
	    message: '',
	    reqResult:'',
	    showreqresult: true,
	    waiting: false
	},
	methods: {
	    query: function () {
		try{
		    JSON.parse(this.message);
		}catch(err){
		    this.reqResult = err+'';
		    return;
		}
		this.callapi(this,'/execChaincode',JSON.parse(this.message));
	    },
	    invoke: function () {
		try{
		    JSON.parse(this.message);
		}catch(err){
		    this.reqResult = err+'';
		    return;
		}
		this.callapi(this,'/invokeChaincode',JSON.parse(this.message));
	    },
	    callapi:(n, url, msg)=>{
		n.exchange(n);
		n.$nextTick(()=>{
		    n.$http.post(url,msg).then((resp)=>{
			console.log('resp data:', resp.data);
			n.reqResult = resp.data;
		    }, (err)=>{n.reqResult = err.data;}).finally(()=>{n.exchange(n);});
		});
		return;
	    },
	    exchange: (n) => { n.showreqresult = !n.showreqresult; n.waiting = !n.waiting; return ;}
	}
    });
    if (typeof module !== 'undefined' && module.exports) {
    } else {
	this.app = app;
    }
}).call(this);
