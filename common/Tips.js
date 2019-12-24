export default class Tips {
	static alert(msg, cb) {
		var duration = 2000
		uni.showToast({
			title: msg,
			icon: "none",
			duration: duration
		})
		if(cb) {
			setTimeout(function () {
				cb()
			}, duration);
		}
	}
	static success(msg) {
		uni.showToast({
			title: msg,
			icon: "success",
			duration: 2000
		})
	}
	static loading(msg) {
		uni.showLoading({
			title: 'Loading...',
		})
		setTimeout(function () {
			uni.hideLoading();
		}, 10000);
	}
	static hideLoading() {
		uni.hideLoading()
	}
	
	static confirm(title, content, cb1, cb2) {
		uni.showModal({
			title: title,
			content: content,
			success: function (res) {
				if (res.confirm) {
					cb1 && cb1();
					console.log('用户点击确定');
				} else if (res.cancel) {
					cb2 && cb2();
					console.log('用户点击取消');
				}
			}
		});
	}
}
