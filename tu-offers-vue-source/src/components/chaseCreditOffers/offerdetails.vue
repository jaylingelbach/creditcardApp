<template>
<!-- Begin: Card details -->
    <section class="cardDetailsContainer">
        <div class="container">
            <div class="backToOffers clearfix">
                <a href="javascript: void(0)" class="hidden-xs" @click="backToOffers"><span class="fa fa-reply"></span> Back to all offers</a>
                <a href="javascript: void(0)" class="hidden-sm hidden-md hidden-lg" @click="backToOffers"><span class="fa fa-reply"></span> Back</a>
            </div>
            <div class="creditCardInfo" v-for="result in compareOffersList">
                <div class="creditCardDetails">
                    <div class="creditCardName hidden-sm hidden-md hidden-lg" v-html="result"></div>
                    <div class="creditCardImg">
                        <img :src="result.Creative.LogoImageUrl" :alt="result" />
                    </div>
                    <div class="applyNowButton">
                        <a :href="result" target="_blank">APPLY NOW</a>
                    </div>
                </div>
                <div class="creditCardDescription">
                    <div class="creditCardName hidden-xs" v-html="result"></div>
                    <p class="cardDescriptionParagraph" v-html="sharedState"></p>
                </div>
            </div>
            <div class="ccDetails hidden-sm hidden-md hidden-lg">
                <span>ANNUAL FEE</span>
                <p v-html="result.AdditionalAdData.ColumnC2"></p>
                <span>CREDIT NEEDED</span>
                <p v-html="result"></p>
                <span>CASHBACK REWARDS</span>
                <p>Gas: <span v-html="result"></span>
                <br>Groceries: <span v-html="result"></span>
                <br>Other: <span v-html="result"></span></p>
                <span>BALANCE TRANSFER</span>
                <p>Intro APR: <span v-html="result"></span>
                <br>Intro APR Period For: <span v-html="result"></span>
                <br>Balance Transfer Fee: <span v-html="result"></span>, 
                Minimum <span v-html="result"></span></p>
                <span>PURCHASE INTRO / REGULAR APR</span>
                <p>Purchase Intro APR: <span v-html="result"></span>
                <br>Purchase Intro Period: <span v-html="result"></span>
                <br>Regular APR: <span v-html="result"></span> <span v-html="result"></span></p>
            </div>
            <table style="width:100%" class="ccDetailsTable ccDetailsTableTablet table-striped hidden-xs hidden-md hidden-lg">
                <col class="annualFee">
                <col class="creditNeeded">
                <col class="cashbackRewards">
                <thead>
                    <tr>
                    <th><span class="bluePipe">|</span><span>ANNUAL FEE</span></th> 
                    <th><span class="bluePipe">|</span><span>CREDIT NEEDED</span></th>
                    <th><span class="bluePipe">|</span><span>CASHBACK REWARDS</span><span class="bluePipe hidden-md hidden-lg">|</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td v-html="result"></td> 
                    <td v-html="result"></td>
                    <td>Gas: <span v-html="result"></span>
                    <br>Groceries: <span v-html="result"></span>
                    <br>Other: <span v-html="result"></span></td>
                    </tr>
                    </tbody>
            </table>
            <table style="width:100%" class="ccDetailsTable ccDetailsTableTablet table-striped hidden-xs hidden-md hidden-lg">
                <col class="balanceTransfer">
                <col class="other">
                <thead>
                    <tr>
                    <th><span class="bluePipe">|</span><span>BALANCE TRANSFER</span></th>
                    <th><span class="bluePipe">|</span><span>PURCHASE INTRO / REGULAR APR</span><span class="bluePipe">|</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>
                        Intro APR: <span v-html="result"></span>
                        <br>Intro APR Period For: <span v-html="result"></span>
                        <br>Balance Transfer Fee: <span v-html="result"></span>, 
                        Minimum <span v-html="result"></span>
                    </td>
                    <td>
                        Purchase Intro APR: <span v-html="result"></span>
                        <br>Purchase Intro Period: <span v-html="result"></span>
                        <br>Regular APR: <span v-html="result"></span> <span v-html="result"></span>
                    </td>
                    </tr>
                    </tbody>
            </table>
            <table style="width:100%" class="ccDetailsTable ccDetailsTableDesktop table-striped hidden-xs hidden-sm">
                <col class="annualFee">
                <col class="creditNeeded">
                <col class="cashbackRewards">
                <col class="balanceTransfer">
                <col class="other">
                <thead>
                    <tr>
                    <th><span class="bluePipe">|</span><span>ANNUAL FEE</span></th> 
                    <th><span class="bluePipe">|</span><span>CREDIT NEEDED</span></th>
                    <th><span class="bluePipe">|</span><span>CASHBACK REWARDS</span><span class="bluePipe hidden-md hidden-lg">|</span></th>
                    <th><span class="bluePipe">|</span><span>BALANCE TRANSFER</span></th>
                    <th><span class="bluePipe">|</span><span>PURCHASE INTRO / REGULAR APR</span><span class="bluePipe">|</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td v-html="result"></td> 
                    <td v-html="result"></td>
                    <td>Gas: <span v-html="result"></span>
                    <br>Groceries: <span v-html="result"></span>
                    <br>Other: <span v-html="result"></span></td>
                    <td>
                        Intro APR: <span v-html="result"></span>
                        <br>Intro APR Period For: <span v-html="result"></span>
                        <br>Balance Transfer Fee: <span v-html="result"></span>, 
                        Minimum <span v-html="result"></span>
                    </td>
                    <td>
                        Purchase Intro APR: <span v-html="result"></span>
                        <br>Purchase Intro Period: <span v-html="result"></span>
                        <br>Regular APR: <span v-html="result"></span> <span v-html="result.RegAPRType"></span>
                    </td>
                    </tr>
                    </tbody>
            </table>
            <div class="applyNowButton bottomBtn">
                <a :href="result" target="_blank">APPLY NOW</a>
            </div>
        </div>
    </section>

<!-- End: Card details -->
</template>
<script>
import { store } from '@/store'

export default {
    name: 'offer-details',
    props: ['compareOffersList'],
    data () {
        return {
            sharedState: store.state,
            compareOffers: sharedState.compareOffers
        }
    },
    methods: {
        backToOffers: function() {
            this.$emit('backToOffers', true);
        }
    }
}
</script>
<style lang="scss" scoped>
/* Begin: Card details */
		
	.cardDetailsContainer {
			background-color: #eeeeee;
			padding-bottom: 35px;
            text-align: left;
		.backToOffers {
            margin-top: 20px;
			text-transform: uppercase;
			a {
				color: #00A6CA;
				font-size: 16px;
				text-decoration: none;
			}
		}
		.creditCardInfo {
			float: left;
			.creditCardName{
				font-size:20px;
				font-weight:600;
				line-height:18px;
				margin-bottom: 20px;
			}
			.creditCardDetails{
				margin-top: 30px;
				padding-right:16px;
				text-align: center;
				padding-left:8px;
				.creditCardImg {
					margin-bottom: 20px;
					img {
						width: 160px;
						height: 100px;
					}
				}
			}
			.creditCardDescription{
				font-size:14px;
				text-align:left;
				margin-top:30px;
				.cardDescriptionParagraph {
					font-weight: 300;
				}
			}
		}
		.applyNowButton{
			margin-top:30px;
			text-align: center;
			a {
				background-color: #f16e00;
				color: white;
				border: none;
				font-size: 16px;
				padding: 10px 35px;
				text-decoration: none;
			}
			a:hover, a:focus {
				color: #fff;
				text-decoration: none;
			 }
		}
		.ccDetails {
			span {
				display: block;
				font-weight: 600;
				font-size: 16px;
				margin-top: 35px;
				margin-bottom: 20px;
			}
			p {
				font-size: 14px;
				margin: 0;
                span {
                    display: inline;
                    font-size: 14px;
                    font-weight: normal;
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
		
	/* End: Card details */

    /* Small devices (vertical tablets, 768px and up) */
    @media (min-width: 768px) {
        .cardDetailsContainer {
            .backToOffers {
                margin-top: 30px;
            }
            .creditCardInfo {
                margin-top: 30px;
                .creditCardName{
                    font-size:26px;
                    line-height: 26px;
                }
                .creditCardDetails{
                    margin-top: 0;
                    padding-right:16px;
                    padding-left:8px;
                    float: left;
                    width: 40%;
                    
                    .creditCardImg {
                        margin-bottom: 20px;
                        img {
                            width: 194px;
                            height: 120px;
                        }
                    }
                }
                .creditCardDescription{
                    font-size:14px;
                    margin-top:0;
                    float: left;
                    width: 60%;
                }
            }
            .applyNowButton {
                &.bottomBtn {
                    float: right;			
                }
            }
            .ccDetailsTable {
                font-size: 14px;
                text-align: center;
                margin-top: 55px;
                float: left;
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
            .ccDetailsTableTablet {
                .annualFee {
                    width: 25%;
                }
                .creditNeeded {
                    width: 25%;
                }
                .cashbackRewards {
                    width: 25%;
                }
                .balanceTransfer {
                    width: 50%;
                }
                .other {
                    width: 50%;
                }
            }
        }
    }

    /* Medium devices (horizontal tablets, laptop, desktops, 992px and up) */
    @media (min-width: 992px) {
        .cardDetailsContainer {
            .creditCardInfo {
                .creditCardDetails{
                    .creditCardImg {
                        img {
                            width: 248px;
                            height: 156px;
                        }
                    }
                }
            }
            .ccDetailsTableDesktop {
                .annualFee {
                    width: 17%;
                }
                .creditNeeded {
                    width: 16%;
                }
                .cashbackRewards {
                    width: 17%;
                }
                .balanceTransfer {
                    width: 25%;
                }
                .other {
                    width: 25%;
                }
            }
        }
    }
</style>