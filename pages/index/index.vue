<template>
	<view class="content">
		<view class="header-box">
			<image src="../../static/logo.png" mode="aspectFit" class="logo"></image>
			<image src="../../static/btn-s.png" mode="aspectFit" @click="showSearch"></image>
		</view>
		<view class="card-item">
			<view class="card-item-header">已收集种类：</view>
			<view class="card-item-content">
				<view v-for="( item, index ) in pocketList" :key="index" class="item-box" style="text-align: center;">
					<view class="text-bold">{{ item.count }}</view>
					<view v-if="item.label=='干垃圾'" class="color1 icon-box"><text class="iconfont iconganlaji"></text></view>
					<view v-else-if="item.label=='湿垃圾'" class="color2 icon-box"><text class="iconfont iconshilaji"></text></view>
					<view v-else-if="item.label=='可回收物'" class="color3 icon-box"><text class="iconfont iconkehuishouwu"></text></view>
					<view v-else class="color4 icon-box"><text class="iconfont iconyouhailaji1"></text></view>
					<view class="label-box">
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center; font-size: 24upx; color: #555555;">作者QQ：541720500</view>
		<!-- <view class="card-item">
			<view class="card-item-header">工具与服务</view>
			<view class="card-item-content" style="flex-direction: column;">
				<view class="info-box" v-for="( item, index ) in otherList" :key="index">
					<view>
						<view class="info-box-title">{{ item.title }}</view>
						<view class="info-box-disc">{{ item.disc }}</view>
					</view>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {

				pocketList: [{
						count: 0,
						label: '干垃圾'
					},
					{
						count: 0,
						label: '湿垃圾'
					},
					{
						count: 0,
						label: '可回收物'
					},
					{
						count: 0,
						label: '有害垃圾'
					}
				],

				// otherList: [{
				// 	name: '小金库',
				// 	title: '你有一笔奖金，快来看看！你有一笔奖金，快来看看！',
				// 	disc: '参加早起打卡，瓜分5亿红包参加早起打卡，瓜分5亿红包',
				// }, {
				// 	name: '基金',
				// 	title: '信托投资基金、公积金、保险基金',
				// 	disc: '为了某种目的而设立的具有一定数量的资金',
				// }],
			}
		},
		onLoad() {
			uni.showShareMenu();
			setTimeout(async ()=>{
				let res = await this.$api.req('index/index');
				res.data.num.forEach(n => {
					this.pocketList[n.type - 1].count = n.num;
				});
			},100);
		},
		methods: {
			showSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$item-margin-bottom: 30upx;
	$item-margin-side: 20upx;
	$line-color: #f9f9f9;
	$border-color: #aa833e;

	page {
		background-color: #f6f6f6;
	}
	.info-box {
		flex-direction: row;
		.info-box-title{
			font-weight: bold;
		}
		.info-box-disc{
			color: #999;
		}
	}

	.header-box {
		background: #6bdbab;
		padding: 30upx;
		margin-bottom: 20upx;
		text-align:center;
		image{
			width: 100%;
			height: 150upx;
		}
		.logo{
			width: 55%;
			height: 200upx;
		}
	}
	.card-item {
		background-color: #fff;
		border-radius: 20upx;
		margin: 0 $item-margin-side $item-margin-bottom $item-margin-side;
		margin-bottom: 20upx;
		box-shadow:2px 2px 6px #ddd;
		.card-item-header {
			padding: 30upx;
			padding-top: 20upx;
			padding-bottom: 10upx;
			text-align: left;
		}

		.card-item-content {
			padding: 30upx;
			display: flex;
		}
	}

	.text-bold {
		font-weight: 900;
		font-size: 35upx;
		margin-bottom: 20upx;
	}

	.iconfont {
		font-size: 90upx;
	}
	.item-box {
		flex: 1;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;

		.icon-box {
			width: 120upx;
			height: 120upx;
			border-radius: 60upx;
			line-height: 120upx;
		}

		.label-box {
			font-size: 26upx;
			margin-top: 20upx;
		}
	}
</style>
