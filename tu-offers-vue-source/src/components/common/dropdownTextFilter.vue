<template>
	<div class="dropdown checklist" :class="{open:dropdownOpen}" v-on-clickaway='closeDropdown'>
		<div @click="toggleDropDown" 
			class="dropdownFilter"
			:class="{selected: selectedFilters.length > 0}">{{selectedFilterText}} 
			<!-- <span v-if="selectedFilterCount > 1"> ({{selectedFilterCount}})</span> -->
		<span class="downArrow"></span>
		</div>
		<div class="dropdown-menu dropdownlist" :class="{multiple: multiCol}" v-show='dropdownOpen' transition='fade'>
			<ul>
				<li v-for="filter in filtersList" :key="filter.id">
					<div>
					  <h4 style="font-weight:bold;">Zipcode: </h4>
							<input 
								type="text"
								placeholder="Enter Zipcode"
								id="filter.query"
								@click="onFilterChange($event)"
								v-on:keypress.enter="applyFilters"
								v-model="selectedFilters">
					</div>
				</li>
			</ul>
			<!-- <div class="dropdownSubHead" v-if="feeFilters.length > 0"> ANNUAL FEE</div>
			<ul v-if="feeFilters.length > 0">
				<li v-for="filter in feeFilters">
					<div class="checkbox">
					  <label>
							<input type="checkbox" 
								:value="filter.query" 
								id="filter.query"
								@click="onFilterChange($event)"
								v-model="selectedFilters">
								<span>{{filter.name}}</span>
						</label>
					</div>
				</li>
			</ul> -->
			<div class="cancelApply clearfix">
				<a href="javascript:void(0)" class="cancel" @click="closeDropdown">Cancel</a>
				<button type="button" class="apply" @click="applyFilters">Apply</button>
			</div>
		</div>
	</div>
</template>

<script>
  import { mixin as clickaway } from 'vue-clickaway'
	export default {
		name: 'dropDown-filter',
    mixins: [ clickaway ],
		props: ['filters','multiCol'],
		data () {
			return {
				dropdownOpen: false,
				selectedFilterText: this.filters.defaultFilterText,
				activeFilter: [],
				selectedFilters: [],
				selectedFilterCount: 0,
				filtersList: []
			}
		},
		created: function() {
			// this.feeFilters = this.filters.filterList.filter(item => item.name.indexOf('Zipcode') > 0);
			this.filtersList = this.filters.filterList
			this.activeFilter = this.filters.filterList.filter(item => item.active === true);
			
			if (this.activeFilter.length > 0) {
				this.selectedFilters.push(this.activeFilter[0].query);
				this.selectedFilterText = this.activeFilter[0].query;
			}			
		},
		methods: {
		  toggleDropDown: function (e) {
        this.dropdownOpen = !this.dropdownOpen;
      },
      closeDropdown: function() {
        if(this.dropdownOpen) {
          this.dropdownOpen = false
        }
      },
			onFilterChange: function(e) {
				// if (!e.target.checked) {
					this.selectedFilters = this.selectedFilters.filter(item => item === e.target.value);
				// }
			},
			applyFilters: function() {
				this.selectedFilterCount = this.selectedFilters.length;
				if (this.selectedFilterCount > 1 ) {
					// this.activeFilter = this.filters.filterList.filter(item => item.query === this.selectedFilters);
					// this.selectedFilterText = this.activeFilter[0].query;
					this.activeFilter = this.selectedFilters
					this.selectedFilterText = `Zipcode: ${this.activeFilter}`

				} else {
					this.selectedFilterText = this.filters.defaultFilterText;
				}
				var selectedItem = 
				this.$emit('filtersChanged', this.selectedFilters);
				this.closeDropdown();
			}
		}
	}	
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>