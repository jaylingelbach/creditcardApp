<template>
	<section>
		<!-- Begin: Filters Section -->
		<section class="filtersContainer" v-show="!showMore && !showCompare">
			<div class="container">
				<div class="row">
					<div class="filterSection col-xs-12 col-sm-12">
						<div class="hidden-xs">
							<span class="filter">FILTERS</span>
						</div>
						<div class="hidden-sm hidden-md hidden-lg mobFilterSection">
							<a
								class="filter mobFilterText"
								@click="openMobFilters"
								:class="{hasFilters: (selectedMobFilterCount > 0)}"
							>
								FILTERS
								<span class="fa fa-expand"></span>
							</a>
						</div>
					</div>
				</div>
				<!-- Begin: Desktop Filters -->
				<div class="row hidden-xs desktopFilters">
					<div class="col-sm-12 col-md-3">
						<dropdownFilter
							:filters="creditRating"
							:multiCol="false"
							@filtersChanged="onCreditRatingChange"
						></dropdownFilter>
					</div>
				</div>
				<!-- End: Filters Desktop filters -->
				<!-- Begin: Mobile Filters -->
				<transition name="fade">
					<ccmobileFilters
						v-if="showMobFilters"
						:creditRating="creditRating"
						:selectedMobFilters="selectedMobFilters"
						@closeFilters="closeMobFilters"
						@applyMobFilters="applyMobFilters"
					></ccmobileFilters>
				</transition>
				<!-- End: Mobile Filters -->
			</div>
		</section>
		<!-- End: Filters Section -->
		<!-- Begin: Offer Results -->
		<section class="cardResultscontainer" v-if="showNoResults && !showMore && !showCompare">
			<div class="container">
				<p class="noResults" v-html="noResultsMsg"></p>
			</div>
		</section>
		<offerResults
			:offerResults="offerResults"
			v-show="!showMore && !showCompare"
			@showMoreDetails="onSelectedOffer($event)"
			@compareOffers="onCompareOffers($event)"
		></offerResults>
		<!-- End: Offer Results -->
		<!-- show More Details Component -->
		<transition name="fade">
			<offerDetails
				v-if="showMore"
				:selectedOffer="selectedOffer"
				@backToOffers="backToOffers($event)"
			></offerDetails>
		</transition>
		<!-- Compare CC Offers Component -->
		<transition name="fade">
			<compareCcoffers
				v-if="showCompare"
				:compareOffersList="sharedState.compareOffers"
				@backFromCompare="backFromCompare($event)"
				@onlearnMore="onSelectedOffer($event)"
				@onRemoveToCompare="removeOfferToCompare($event)"
			></compareCcoffers>
		</transition>
	</section>
</template>

<script>
import dropdownFilter from "@/components/common/dropdownFilter";
import offerResults from "@/components/chaseCreditOffers/offerResults";
import ccmobileFilters from "@/components/chaseCreditOffers/ccmobileFilters";
import offerDetails from "@/components/chaseCreditOffers/offerDetails";
import compareCcoffers from "@/components/chaseCreditOffers/compareCcoffers";
import { store } from "@/store";

var moment = require("moment");
export default {
	name: "chase-offers",
	props: ["pageTitle", "pageDesc"],
	data() {
		return {
			sharedState: store.state,
			creditResults: [],
			creditRating: {
				queryType: "creditScore",
				defaultFilterText: "Credit Score Rank",
				filterList: [
					{
						name: "Excellent Credit",
						active: false,
						query: "900",
						Key: "Score",
						Value: "900"
					},
					{
						name: "Good Credit",
						active: true,
						query: "800",
						Key: "Score",
						Value: "800"
					},
					{
						name: "Fair Credit",
						active: false,
						query: "750",
						Key: "Score",
						Value: "750"
					}
				]
			},
			creditRewards: {
				queryType: "rewards",
				defaultFilterText: "Rewards Type",
				filterList: [
					{
						name: "Cash Back",
						active: false,
						query: "4"
					},
					{
						name: "Welcome Bonus",
						active: false,
						query: "7"
					}
				]
			},
			offerTitle: "Special Offers",
			offerDesc: this.pageDesc,
			noResultsMsg:
				"Sorry, no results found for this filter criteria. Please change filters to see more results.",
			showNoResults: false,
			rewardsQuery: [],
			advancedQuery: [],
			showMobFilters: false,
			selectedMobFilters: [],
			hideOfferBanner: false,
			showMore: false,
			selectedOffer: {},
			showCompare: false
		};
	},
	created: function() {
		this.getOffers();
		var activeCreditRateFilter = this.creditRating.filterList.filter(
			item => item.active === true
		);
		this.selectedFilters = activeCreditRateFilter[0];
		this.selectedMobFilters = activeCreditRateFilter[0];
	},
	watch: {
		creditResults: this.creditResults,
		deep: true
	},
	methods: {
		onCreditRatingChange: function(selectedFilters) {
			this.sharedState.queryParams.score = selectedFilters;
			if (this.sharedState.queryParams.score !== "750") {
				this.getOffers();
			} else {
				this.showNoResults = true;
				this.showCompare = false;
				this.noResultsMsg =
					"We are sorry no special offers are available at this time, please check back later";
			}
		},
		onCreditRewardsChange: function(selectedFilters) {
			this.rewardsQuery = [].concat(selectedFilters);
			this.sharedState.queryParams = Object.assign(
				{},
				this.sharedState.queryParams,
				{
					rewards: this.rewardsQuery
						.concat(this.advancedQuery)
						.toString()
				}
			);
		},
		onAdvancedFilterChange: function(selectedFilters) {
			this.advancedQuery = [].concat(selectedFilters);
			this.sharedState.queryParams = Object.assign(
				{},
				this.sharedState.queryParams,
				{
					rewards: this.rewardsQuery
						.concat(this.advancedQuery)
						.toString()
				}
			);
			this.getOffers();
		},
		getOffers: function() {
			this.getToken();
		},
		getToken: function() {
            /**
             * @param url: path/to/GetTokenKey
             * @param data: Info that GetTokenKey needs to retrieve Token
             */	
			var that = this;
			var sharedState = store.state;
			var score = that.sharedState.queryParams.score;
			var date = moment().format();
			var ajaxData = {
				RequestKey: "06892412-d604-4e46-bfb3-6e9bed00446d",
				RequestDate: date,
				AccountName: "TUCOM",
				AccountCode: "123456789",
				BundleCode: "TUCom",
				AdditionalData: [
					{
						Key: "Score",
						Value: score
					}
				]
			};
			$.ajax({
				url: "https://aerest.tui.transunion.com/api/GetTokenKey/",
				contentType: "application/json",
				type: "POST",
				data: JSON.stringify(ajaxData),
				success: function(data) {
					if (data != null && data != "") {
						that.sharedState.queryParams.RequestKey = data.RequestKey.toString();
						that.sharedState.counter = 0;
						that.getAds(data.TokenKey.toString());
					}
				},
				function(error) {
					that.noResultsMsg =
						"Sorry, system is unavailable now. Please try again later.";
					that.showNoResults = true;
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR, textStatus, errorThrown);
			});
		},
		getAds: function(token) {
			var that = this;
			var sharedState = store.state;
			var key = that.sharedState.queryParams.TokenKey;
			var data = { TokenKey: token };
			$.ajax({
				url: "https://aerest.tui.transunion.com/api/GetAds",
				contentType: "application/json",
				type: "POST",
				data: JSON.stringify(data),
				success: function(data) {
					if (
						data &&
						data.Status &&
						data.Status[0].Code &&
						data.Status[0].Code !== "1000" &&
						that.sharedState.counter < 11
					) {
						that.sharedState.counter++;
						console.log(that.sharedState.counter);
						setTimeout(() => {
							that.getAds(token);
						}, 500);
					} else if (data.AdData) {
						that.sharedState.creditResults =
							Number(data.AdData.length) > 0
								? data.AdData.map(item =>
									  Object.assign({}, item, {
										  selectToCompare: false
									  })
								  )
								: [];
						that.showNoResults =
							Number(data.AdData.length) > 0 ? false : true;
					}
				},
				error: function(jqXHR, error) {
					if (
						jqXHR.responseJSON &&
						jqXHR.responseJSON.Status &&
						jqXHR.responseJSON.Status[0].Code &&
						jqXHR.responseJSON.Status[0].Code !== "1000" &&
						that.sharedState.counter < 11
					) {
						that.sharedState.counter++;
						console.log(that.sharedState.counter);
						setTimeout(() => {
							that.getAds(token);
						}, 500);
					} else {
						that.noResultsMsg =
							"Sorry, system is unavailable now. Please try again later.";
						that.showNoResults = true;
					}
				}
			});
		},
		openMobFilters: function() {
			this.showMobFilters = true;
			document
				.getElementsByTagName("body")[0]
				.classList.add("filterOpened");
		},
		closeMobFilters: function() {
			this.showMobFilters = false;
			document
				.getElementsByTagName("body")[0]
				.classList.remove("filterOpened");
		},
		applyMobFilters: function(selectedFilters) {
			this.sharedState.queryParams.score = selectedFilters;
			this.selectedMobFilters = selectedFilters;
			this.closeMobFilters();
			if (this.sharedState.queryParams.score != "750") {
				this.getOffers();
			} else {
				this.showNoResults = true;
				this.showCompare = false;
				this.noResultsMsg =
					"We are sorry no special offers are available at this time, please check back later";
			}
		},
		onSelectedOffer: function(data) {
			this.showCompare = false;
			this.selectedOffer = Object.assign({}, data);
			console.log("SELECTED OFFER", this.selectedOffer);
			this.showMore = true;
			this.offerTitle = "";
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 100);
		},
		backToOffers: function(data) {
			this.showMore = false;
			this.offerTitle = this.pageTitle;
		},
		onCompareOffers: function(data) {
			this.showCompare = true;
			this.sharedState.compareOffers = [].concat(data);
			this.sharedState.selectedOffer = this.sharedState.compareOffers;
			this.offerTitle = "Credit Card Compare";
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 100);
		},
		backFromCompare: function(data) {
			this.showCompare = false;
			this.offerTitle = this.pageTitle;
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 100);
		},
		removeOfferToCompare: function(data) {
			this.sharedStatecompareOffers = this.sharedStatecompareOffers.filter(
				item => item.ID !== data.ID
			);
		}
	},
	computed: {
		offerResults() {
			var sharedState = store.state;
			if (sharedState.queryParams.score === "750") {
				this.sharedState.creditResults = 0;
				return this.sharedState.creditResults;
			} else {
				return this.sharedState.creditResults;
			}
		},
		selectedMobFilterCount() {
			var totalCount = 0;
			for (var filter in this.selectedMobFilters) {
				totalCount += this.selectedMobFilters[filter].length;
			}
			return Number(totalCount);
		}
	},
	components: {
		dropdownFilter,
		offerResults,
		ccmobileFilters,
		offerDetails,
		compareCcoffers
	}
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease-in;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
@media only screen and (max-width: 767px) {
	.hideOfferBanner {
		display: none;
	}
}
</style>
