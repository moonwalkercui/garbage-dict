<template>
	<view>
		<view class="search-box">
			<view class="search">
				<view class="input-box">
					<input type="text" focus confirm-type="search" @confirm="handleSearch" placeholder="搜索多个用空格分开" v-model.trim="keyword" />
				</view>
				<image class="search-icon" src="../../static/btn-s2.png" mode="aspectFit" @click="handleSearch"></image>
			</view>
		</view>
		<view class="s-block" v-if="list.length > 0">
			<view class="header">
				<text>查询结果（纠错请点击条目）</text>
				<image src="../../static/delete.svg" mode="aspectFit" @click="delhistory"></image>
			</view>
			<view class="list">
				<view v-for="(item,index) in list" :key="index" @click="correction(item.id, item.name)" class="list-item">
					<view class="label">
						<text>{{item.name}}</text>
						<text class="info">{{item.remark}}</text>
					</view>
					<view class="icon color1" v-if="item.type==1"><text class="iconfont iconganlaji"></text></view>
					<view class="icon color2" v-else-if="item.type==2"><text class="iconfont iconshilaji"></text></view>
					<view class="icon color3" v-else-if="item.type==3"><text class="iconfont iconkehuishouwu"></text></view>
					<view class="icon color4" v-else-if="item.type==4"><text class="iconfont iconyouhailaji1"></text></view>
					<view class="icon color1 icon-bushi" v-else><text class="iconfont iconbushi"></text></view>
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<text class="iconfont iconemptydata"></text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				keyword: "",
				list: []
			}
		},
		onLoad() {
			uni.showShareMenu();
		},
		methods:{
			async handleSearch() {
				let res = await this.$api.req("index/search", {kw: this.keyword})
				console.log(res)
				this.list = res.data;
			},
			correction(id, name) {
				this.$tips.confirm('分类不正确吗?',"确认提交后我们会及时完善", () => {
					this.$api.req("index/correction", {id, name});
				});
			},
			delhistory() {
				this.keyword = "";
				this.list = [];
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		background: #6bdbab;
		padding: 30px;
	}
	.empty {
		padding: 60upx;
		text-align: center;
		.iconfont {
			font-size: 300upx;
			color: #dcdcdc;
		}
	}
	.search {
		display:flex;
		background-color: #F7F7F7;
		padding: 10upx 20upx 10upx  40upx;
		font-size: 32upx;
		border-radius: 70upx;
		box-shadow:2px 2px 6px #1b8a3e;
		align-items: center;
		.input-box {
			flex: 1;
			input {
				font-size: 32upx;
			}
		}
		.search-icon {
			width: 100upx;
			height: 100upx;
		}
		.voice-icon {
			width: 36upx;
			height: 36upx;
			padding: 16upx 20upx 16upx 0;
			// position: absolute;
			// left: 16upx;
			// top: 4upx;
			// z-index: 10;
		}

		
	}

	.s-block {
		margin-top: 20upx;
		.header {
			display: flex;
			padding: 10upx 30upx;
			align-items: center;
			text{
				font-size: 28upx;
				flex: 1;
				padding-left: 30upx;
				color: #999;
			}
			image {
				width: 36upx;
				height: 36upx;
				padding: 10upx;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			padding: 20upx 30upx;

			.list-item {
				display: flex;
				align-items: center;
				margin-bottom: 10upx;
				padding: 10upx 20upx;
				border-radius: 90upx;
				border-top: 2upx solid #FFF;
				border-left: 2upx solid #FFF;
				background-color: #F7F7F7;
				box-shadow:2px 2px 6px #ddd;
				.label {
					flex: 1;
					text {
						display: block;
						max-width: 400upx;
						// overflow: hidden;
						// white-space: nowrap;
						// text-overflow: ellipsis;
						// box-sizing: border-box;
						font-size: 32upx;
						padding-left: 30upx;
						&.info{
							font-size: 24upx;
							color: #999;
						}
					}
				}
				.icon {
					flex: 0;
					width: 200upx;
					border-radius:50%;
					padding: 10upx;
					.iconfont {
						font-size: 95upx;
						line-height: 100%;
					}
				}
			}
		}
	}
	.icon-bushi{
		padding: 20upx !important;
		.iconbushi{
			font-size: 75upx!important;
		}
	}

</style>
