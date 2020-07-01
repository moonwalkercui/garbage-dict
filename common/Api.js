import Tips from "@/common/Tips.js"
class Api {
	// static getFormToken() {
	// 	return this.req("sys/formtoken")
	// }
	static getToken() {
		return "abc123"
	}

	static req(url, params, method = "GET", header = {}) {
		var _self = this;
		return new Promise(function (resolve, reject) {
			Tips.hideLoading()
			Tips.loading()
			var headerObj = {
				"Auth-Token" : _self.getToken()
			};
			// if(method.toLowerCase() == "post") {
			// 	headerObj = Object.assign(headerObj, {"Content-Type":"application/x-www-form-urlencoded"});
			// }
			uni.request({
				url: Api.baseUrl + url,
				method: method || "GET",
				data: params,
				header: Object.assign(headerObj, header),
			}).then(data => {
				Tips.hideLoading()
				var [error, res]  = data;
				if(res.statusCode && res.statusCode != 200 ) {
					if (res.data.code == 0) {
						Tips.alert(res.data.msg)
					} else {
						Tips.alert("请求出错")
					}
				}
				if (error) Tips.alert(error)
				resolve(res.data)
			}).catch(err => {
				Tips.hideLoading()
				console.log("出错了" + err);
				reject(err);
			});
		});
	}
}
Api.baseUrl = "https://garbage.hzb-it.com/garbage/";
export default Api;