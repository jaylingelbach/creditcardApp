<template>
<!-- Begin: Card compare -->
<!-- compare table 5th and 6th columns are hidden for tablets as per the design. 
     Please update table as per requirements --> 
    <section class="cardCompareContainer hidden-xs">
        <div class="container">
            <div class="backToOffers clearfix">
                <a href="javascript:void(0)" class="" @click="backToOffers"><span class="fa fa-reply"></span> Back to all offers</a>
            </div>
            <div>
                <table id="ccCompareTable" style="width:100%" class="table-striped">
                    <col class="ccName">
                    <col class="annualFee">
                    <col class="creditNeeded">
                    <col class="cashbackRewards">
                    <col class="balanceTransfer hidden-sm">
                    <col class="other hidden-sm">
                    <thead>
                        <tr>
                        <th><span class="bluePipe">|</span><span>CREDIT CARD NAME</span></th>
                        <th><span class="bluePipe">|</span><span>ANNUAL FEE</span></th> 
                        <th><span class="bluePipe">|</span><span>WELCOME BONUS</span></th>
                        <th><span class="bluePipe">|</span><span>REWARDS RATE</span><span class="bluePipe hidden-md hidden-lg">|</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(offer, index) in sharedState.compareOffers">
                            <td>
                                <div class="cardCompareBox">
                                    <img :src="offer.Creative[0].ImageUrl" :alt="offer.Creative[0].ImageUrl" />
                                    <div class="cardInfo">
                                    <p v-html="offer.ProductName"></p>
                                    </div>
                                    <div class="cardApply">
                                        <a href="javascript:void(0)" class="applyButton" @click="getUrl(offer.Creative[index].ClickUrl)">APPLY</a>
                                    </div>
                                    <div>
                                        <a class="learnMore" href="javascript:void(0)" @click="getUrl(offer.Creative[index].ClickUrl)">LEARN MORE</a>
                                        <a class="hidden-xs remove" href="javascript:void(0)" @click="onRemoveOffer(offer)">REMOVE</a>
                                    </div>
                                </div>
                            </td>
                            <td v-html="offer.AdditionalAdData.ColumnC2"></td> 
                            <td v-html="offer.AdditionalAdData.ColumnB2"></td>
                            <td v-html="offer.AdditionalAdData.ColumnA2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
<!-- End: Card compare -->
</template>
<script>
import { store } from '@/store'
export default {
    name: 'compare-ccoffers',
    props: ['compareOffersList'],
    data () {
        return {
            sharedState: store.state
        }
    },
    methods: {
        getUrl: function (url) {
        	var that = this
        	var sharedState = store.state
        		$.ajax({
        		type: "GET",
        		url: url,
        		success: function(data){
					// redirect
            		window.location.href = data.RePostUrl
				},
				error: function(error) {
					console.log("err:", error)
				},
				complete: function() {
					// enable button
				}
       		});
    	},
        backToOffers: function() {
            this.$emit('backFromCompare', true);            
        },
        onLearnMore: function(data) {
            this.$emit('onlearnMore', data);
        },
        onRemoveOffer: function(data) {
            this.$emit('onRemoveToCompare', data);
            this.$bus.$emit('removeOfferFromCompare', data);
        }
    },
}
</script>
<style lang="scss" scoped>		
.cardCompareContainer {
        background-color: #eeeeee;
        padding-bottom: 35px;
    .backToOffers {
        text-transform: uppercase;
        text-align: left;
        margin-top: 30px;
        a {
            color: #00A6CA;
            font-size: 16px;
            text-decoration: none;
        }
        margin-bottom: 40px;
    }
    
    #ccCompareTable {
        font-size: 14px;
        text-align: center;
        .ccName {
            width: 25%;
        }
        .annualFee {
            width: 25%;
        }
        .creditNeeded {
            width: 25%;
        }
        .cashbackRewards {
            width: 25%;
        }
        thead {
            tr {
                border-bottom: 4px solid #00A6CA;
                th {
                    text-align: center;
                    padding: 2px;
                    span {
                        font-size: 14px;
                    }
                    span.bluePipe {
                        color: #00A6CA;
                        float: left;
                    }
                    span.bluePipe:last-child {
                        float: right;
                    }
                }
            }
        }
        tbody {
            
            td:nth-child(odd) {
                background-color: #eeeeee;
            }
            td:nth-child(even) {
                border-left: 1px solid #fff;
                border-right: 1px solid #fff;
                background-color: #f5f5f5;
            }
            tr {
                border-bottom: 1px solid #707070;
            }
            tr:last-child {
                border-bottom: 4px solid #00A6CA;
            }
        }
    }
    .cardCompareBox {
        padding: 30px 15px;
        margin-bottom: 20px;
        text-align: center;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex: 1 0 auto;
        div {
            width: 100%;
        }
        .cardTitle {
            font-size: 18px;
            margin-bottom: 20px;
            width: 100%;
        }
        img {
            width: 85%;
        }
        .cardInfo {
            margin: 20px 0 10px 0;
            p {
                font-size: 14px;
                margin-bottom: 10px;
            }
        }
        .cardApply {
            margin-bottom: 20px;
            .applyButton {
                background-color: #f16e00;
                color: white;
                height: 32px;
                border: none;
                font-size: 14px;
                padding: 0.5em 2em;
                display: inline-block;
                margin: 0;
                text-decoration: none;
            }
        }
        .learnMore, .remove {
            font-size: 11px;
            color: #00A6CA;
            text-decoration: none;
        }
        .remove {
            border-left: 2px solid #000;
            padding-left: 12px;
        }
    }
}
@media (min-width: 992px) {
    .cardCompareContainer {
        #ccCompareTable {
            .ccName {
                width: 18%;
            }
            .annualFee {
                width: 15%;
            }
            .creditNeeded {
                width: 15%;
            }
            .cashbackRewards {
                width: 15%;
            }
            .balanceTransfer {
                width: 20%;
            }
            .other {
                width: 17%;
            }
        }
        .cardCompareBox {
            .learnMore, .remove {
                font-size: 14px;
            }
        }
    }
}
</style>