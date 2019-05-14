<template>
	<section class="hidden-sm hidden-md hidden-lg mobileFilters">
		<div class="header">
			<span class="fa fa-compress resizeMobFilter" @click="closeFilters"></span>
		</div>
		<div class="mobFilterContent">
			<div class="mobfilterSubHeader">{{creditRating.defaultFilterText}}</div>
			<ul>
				<li v-for="rating in creditRating.filterList" :key="rating.query">
					<div class="radio">
						<label>
							<input
								type="radio"
								name="radioFilterMobile"
								:value="rating.Value"
								:id="rating.query"
								v-model="selectedFilters"
								@change="onCreditRatingChange($event)"
							>
							<span>{{rating.name}}</span>
						</label>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer">
			<a href="#" class="cancel" @click="closeFilters">Cancel</a>
			<button type="button" class="apply" @click="applyFilters">Apply</button>
		</div>
	</section>
</template>
<script>
import { store } from "@/store";

var moment = require("moment");

export default {
	name: "ccmobile-filters",
	props: [
		"creditRating",
		"creditRewards",
		"selectedMobFilters",
		"creditAdvanced"
	],
	data() {
		return {
			sharedState: store.state,
			selectedFilters: [],
			advancedFilters: [],
			feeFilters: []
		};
	},
	methods: {
		closeFilters: function() {
			this.$emit("closeFilters", true);
		},
		applyFilters: function() {
			this.$emit("applyMobFilters", this.selectedFilters);
		},
		clearFilters: function() {
			for (var filter in this.selectedFilters) {
				this.selectedFilters[filter] = [];
			}
		},
		onCreditRatingChange: function(e) {
			this.selectedFilters = e.target.checked ? e.target.value : this.selectedFilters;
			this.sharedState.queryParams.score = this.selectedFilters.toString();
		}
	},
	created: function() {
		this.selectedFilters = this.sharedState.queryParams.score ? this.sharedState.queryParams.score : this.selectedMobFilters.Value;
	}
};
</script>
<style lang="scss" scoped>
</style>
