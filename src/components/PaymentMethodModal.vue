<template>
    <div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="margin-top:100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Payment method</h5>
                    <button type="button" class="close" aria-label="Close" @click="closePaymentModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--
                    <h6 class="mb-2">Add new payment method</h6>
                    -->

                    <label>Card Holder Name</label>
                    <input id="card-holder-name" type="text" v-model="name" class="form-control mb-2">

                    <label>Card</label>
                    <div id="card-element">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closePaymentModal">Close</button>
                    <button class="btn btn-primary" id="add-card-button" @click="submitPaymentMethod">
                        {{ buttonText ? buttonText : 'Save Payment Method' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from "vuex";

    export default {
        props: {
            buttonText: String,
        },
        computed: {
            ...mapState({
                stripeData: state => state.auth.stripe,
            })
        },
        data() {
            return {
                name: '',

                stripe: '',
                elements: '',
                card: '',
            };
        },
        created() {
            this.$store.dispatch('getStripeData')
                .then(() => {
                    this.includeStripe('js.stripe.com/v3/', function(){
                        this.configureStripe();
                    }.bind(this) );
                });
        },
        methods: {
            closePaymentModal() {
                this.$emit('close-payment-modal');
                this.card.clear();
                this.name = '';
            },
            includeStripe( URL, callback ){

                // eslint-disable-next-line
                if (typeof Stripe !== 'undefined'){
                    callback();
                    return;
                }

                let documentTag = document,
                    tag = 'script',
                    object = documentTag.createElement(tag),
                    scriptTag = documentTag.getElementsByTagName(tag)[0]
                object.src = '//' + URL
                if (callback) {
                    object.addEventListener('load', function (e) {
                        callback(null, e)
                    }, false)
                }
                scriptTag.parentNode.insertBefore(object, scriptTag)
            },
            configureStripe(){
                // eslint-disable-next-line
                this.stripe = Stripe( this.stripeData.stripe_key)

                this.elements = this.stripe.elements()
                this.card = this.elements.create('card', {hidePostalCode: true})
                this.card.mount('#card-element')
            },
            submitPaymentMethod() {
                this.$store.dispatch('setLoadingStatus', 'loading')
                this.stripe.confirmCardSetup(
                    this.stripeData.stripe_secret, {
                        payment_method: {
                            card: this.card,
                            billing_details: {
                                name: this.name
                            }
                        }
                    }
                ).then(function(result) {
                    console.log(result)
                    if (result.error) {
                        this.$toast.error(result.error.message)
                    } else {
                        this.savePaymentMethods( result.setupIntent.payment_method )
                    }
                }.bind(this))
            },
            savePaymentMethods(payment_method) {
                let vm = this
                this.$store.dispatch('savePaymentMethods', {payment_method})
                    .then(() => {
                        vm.$toast.success("Payment method saved successfully!")
                        this.$store.dispatch('getPaymentMethods')
                            .then(() => {
                                this.$store.dispatch('setLoadingStatus', '')
                                this.$emit('payment-method-saved');
                                vm.closePaymentModal();
                            })
                    })
                    .catch(err => {
                        try {
                            let data= err.response.data
                            vm.$toast.error(data.message)
                            console.log(data.message)
                        } catch {
                            console.log(err)
                        }
                    })
            },
        }
    }
</script>