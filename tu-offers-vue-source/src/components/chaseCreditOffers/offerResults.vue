<template>
	<!-- Begin: Card results -->
	<section class="cardResultscontainer">
		<div class="container">
			<div class="row results-row">
				<div
					class="col-xs-12 col-sm-12 col-md-12"
					v-for="result in currentLoadedOffers"
					:key="result.id"
				>
					<div class="cardBox">
						<div class="cardTitle" v-html="result.ProductName"></div>
						<img :src="result.Creative[0].ImageUrl">
						<div class="cardInfo">
							<p>
								<strong>Rewards:</strong>
								<span v-html="result.AdditionalAdData.ColumnA2"></span>
							</p>
							<p>
								<strong>Welcome Bonus:</strong>
								<span v-html="result.AdditionalAdData.ColumnB2"></span>
							</p>
							<p>
								<strong>Annual Fee:</strong>
								<span v-html="result.AdditionalAdData.ColumnC2"></span>
							</p>
						</div>

						<div class="cardBottom">
							<div class="cardApply">
								<a
									href="javascript:void(0)"
									@click="getUrl(result.Creative[0].ClickUrl)"
									class="applyButtonResults"
								>APPLY NOW</a>
							</div>
							<div>
								<a
									href="javascript:void(0)"
									@click="getUrl(result.Creative[0].ClickUrl)"
									class="learnMoreResults"
								>Learn more</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<div class="cardBtnSection">
					<button
						type="button"
						class="compareOffers hidden-xs"
						v-if="sharedState.compareOffers.length > 1"
						@click="compareSelectedOffers"
					>Compare ({{sharedState.compareOffers.length}})</button>
				</div>
			</div>
		</div>
	</section>
	<!-- End: Card results -->
</template>
<script>
import { store } from "@/store";

export default {
	name: "offer-results",
	props: ["offerResults"],
	data() {
		return {
			sharedState: store.state,
			index: 1,
			noOfOffersTodisplay: 4,
			currentLoadedOffers: this.offerResults.slice(
				0,
				this.index * this.noOfOffersTodisplay
			),
			showCompare: false,
			showMore: true
		};
	},
	created: function() {
		this.currentLoadedOffers = this.offerResults.slice(
			0,
			this.noOfOffersTodisplay
		);
		this.$bus.$on("removeOfferFromCompare", $event => {
			this.removeOfferToCompare($event);
		});
	},
	beforeDestroy() {
		this.$bus.$off("removeOfferFromCompare");
	},
	watch: {
		offerResults: function() {
			if (this.offerResults.length > 0) {
				this.currentLoadedOffers = this.offerResults.slice(
					0,
					this.noOfOffersTodisplay
				);
				this.showMore = this.offerResults.length <= 4 ? false : true;
				this.index = 1;
			} else {
				this.currentLoadedOffers = [];
				this.showMore = false;
			}
			this.sharedState.compareOffers = [];
		},
		deep: true
	},
	methods: {
		getUrl: function(url) {
			console.log(url);
			var that = this;
			var sharedState = store.state;
			$.ajax({
				type: "GET",
				url: url,
				success: function(data) {
					// redirect
					window.location.href = data.RePostUrl;
				},
				error: function(error) {
					console.log("err:", error);
				},
				complete: function() {}
			});
		},
		showMoreDetails: function(data) {
			this.$emit("showMoreDetails", data);
		},
		selectToCompare: function(data) {
			if (data.selectToCompare) {
				this.currentLoadedOffers = this.currentLoadedOffers.map(
					item => {
						if (item.ProductKey === data.ProductKey) {
							return Object.assign({}, data, {
								selectToCompare: false
							});
						} else {
							return item;
						}
					}
				);
				this.sharedState.compareOffers = this.sharedState.compareOffers.filter(
					item => item.ProductKey !== data.ProductKey
				);
			} else {
				this.currentLoadedOffers = this.currentLoadedOffers.map(
					item => {
						if (item.ProductKey === data.ProductKey) {
							return Object.assign({}, data, {
								selectToCompare: true
							});
						} else {
							return item;
						}
					}
				);
				this.sharedState.compareOffers.push(data);
				console.log(
					"Shared state compare offers: ",
					this.sharedState.compareOffers
				);
			}
		},
		compareSelectedOffers: function() {
			this.$emit("compareOffers", this.sharedState.compareOffers);
		},
		removeOfferToCompare: function(data) {
			this.sharedState.compareOffers = this.sharedState.compareOffers.filter(
				item => item.ProductKey !== data.ProductKey
			);
			this.currentLoadedOffers = this.currentLoadedOffers.map(item => {
				if (item.ProductKey === data.ProductKey) {
					return Object.assign({}, data, { selectToCompare: false });
				} else {
					return item;
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped="">
</style>