<template>
	<div class="dropdown checklist" :class="{open:dropdownOpen}" v-on-clickaway='closeDropdown'>
		<div @click="toggleDropDown" 
			class="dropdownFilter"
			:class="{selected: selectedFilters.length > 0}">{{selectedFilterText}} <span v-if="selectedFilterCount > 1"> ({{selectedFilterCount}})</span>
		<span class="downArrow"></span>
		</div>
		<div class="dropdown-menu dropdownlist dropdownSelect" v-show='dropdownOpen' transition='fade'>
			<ul>
				<li v-for="filter in filtersList">
					<a href="javascript:void(0)" @click="onFilterChange($event, filter)">{{filter.name}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import { mixin as clickaway } from 'vue-clickaway'
	export default {
		name: 'dropDown-select',
    mixins: [ clickaway ],
		props: ['filters'],
		data () {
			return {
				dropdownOpen: false,
				selectedFilterText: this.filters.defaultFilterText,
				activeFilter: [],
				selectedFilters: [],
				selectedFilterCount: 0,
				feeFilters: [],
				filtersList: []
			}
		},
		created: function() {
			this.activeFilter = this.filters.filterList.filter(item => item.active === true);
			if (this.activeFilter.length > 0) {
				this.selectedFilters.push(this.activeFilter[0].query);
				this.selectedFilterText = this.activeFilter[0].name;
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
			onFilterChange: function(e, filterObj) {
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