<template>
<div class="col-xs-12 col-sm-12 col-md-12">
	<!-- Start: Offers Navigation mobile View-->
	<div class="dropdown mainSection">
		<button id="creditDropdown" class="btn btn-default dropdown-toggle offersNavDropdown" type="button" data-toggle="dropdown">{{activeOfferCategory[0].category}} Offers
		<span class="caret"></span></button>
			<ul class="dropdown-menu">
				<li v-for="offer in mobileOfferCategory" :class="offer.class">
			   	<a :href="offer.url">{{offer.category}}</a>
			   </li>
			</ul>
	</div>
	<!--End: Offers Navigation mobile View-->	 
	<!--Start: Offers Navigation desktop View-->
	  <nav>
		<div class="deskSection">
		   <ul>
			   <li v-for="offer in offerCategories" :class="offer.class">
			   	<a :href="offer.url">{{offer.category}}</a>
			   </li>
			</ul>
		</div>
	  </nav>
	 <!--End: Offers Navigation desktop View-->	 
</div>
</template>

<script>
export default {
	name: 'offers-navigation',
	props: ['offerCategories'],
	data () {
		return {
			activeOfferCategory: this.offerCategories.filter(item => item.class === 'active'),
			mobileOfferCategory: this.offerCategories.filter(item => item.class.indexOf('active') < 0)
		}
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
</style>