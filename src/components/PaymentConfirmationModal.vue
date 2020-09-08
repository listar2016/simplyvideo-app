<template>
    <div class="modal fade" id="paymentConfirmationModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div v-if="!isPreviewLoading" class="modal-content" style="margin-top:100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                    <button type="button" class="close" aria-label="Close" @click="closePaymentConfirmationModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <!--
                    <strong>
                        Payment method:
                    </strong>
                    **** **** **** {{ defaultPaymentMethod.mask }}
                    -->

                    <div class="table-responsive text-right">
                        <table class="my-0 table w-100">
                            <tr>
                                <th class="border-top-0"></th>
                                <th class="border-top-0">Price</th>
                                <th class="border-top-0">Quantity</th>
                                <th class="border-top-0">Subtotal</th>
                            </tr>
                            <tr>
                                <td>{{ selectedPlan.name }}</td>
                                <td>
                                    {{ willUseSpareBusinessLicense ? formatMoney(0) : formatMoney(selectedPlan.price) }}
                                </td>
                                <td>{{ preview.plan_licenses_to_purchase }}</td>
                                <td>
                                    {{ willUseSpareBusinessLicense ? formatMoney(0) : formatMoney(selectedPlan.price * preview.plan_licenses_to_purchase) }}
                                </td>
                            </tr>
                            <tr v-for="addon in selectedAddons.filter((selectedAddon) => {return !isAddonIncluded(selectedAddon);})" :key="addon.id">
                                <td style="max-width: 150px;">{{ addon.name }}</td>
                                <td>{{ formatMoney(addon.price) }}</td>
                                <td>{{ isAddonIncluded(addon) ? preview.plan_licenses_to_purchase : '1' }}</td>
                                <td>
                                    {{ isAddonIncluded(addon) ? formatMoney(0) : formatMoney(addon.price) }}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    Grand total: {{ formatMoney(amountEachMonthForSelectedItems) }}
                                    <br>
                                    <br>

                                    <div v-if="willUseSpareBusinessLicense" style="color:darkred;">
                                        Will use spare business license
                                        <br>
                                        <br>
                                    </div>

                                    <div v-if="preview.plan_licenses_to_purchase === 2" style="color:darkred;">
                                        Minimum Business licenses purchase is 2 licenses
                                        <br>
                                        After the purchase you can assign licenses to individual users
                                        <br>
                                        <br>
                                    </div>

                                    <div v-if="preview.current_period_end && preview.pay_now !== amountEachMonthForSelectedItems">
                                        <div v-if="preview.pay_now > 0">
                                            For remaining time of billing period until {{ preview.current_period_end }}
                                            <br>
                                            <strong>
                                                You will now pay
                                                {{ formatMoney(preview.pay_now) }}
                                            </strong>
                                            <br>
                                            <br>
                                            Afterwards you will pay {{ formatMoney(amountEachMonthForSelectedItems) }} a
                                            month
                                        </div>
                                        <div v-else-if="amountEachMonthForSelectedItems > 0">
                                            <strong>
                                                You won't be charged now.
                                            </strong>
                                            <br>
                                            <span>
                                                Afterwards you will pay {{ formatMoney(amountEachMonthForSelectedItems) }} a month
                                            </span>
                                        </div>
                                    </div>
                                    <div v-else-if="(preview.pay_now > 0) && preview.pay_now !== amountEachMonthForSelectedItems">
                                        <strong>
                                            You will now pay
                                            {{ formatMoney(preview.pay_now) }}
                                        </strong>
                                        <br>
                                        <br>
                                        Afterwards you will pay {{ formatMoney(amountEachMonthForSelectedItems) }} a
                                        month
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!--
                    <br>
                    <strong>
                        You will pay
                        {{ formatMoney(preview.amount_each_month) }} each month
                    </strong>
                    <a href="" @click.prevent="isShowDetails = !isShowDetails" style="cursor:pointer;">
                        {{ isShowDetails ? 'Hide details' : 'Details'}}
                    </a>

                    <div v-if="isShowDetails" class="table-responsive text-right">
                        <table class="mt-2 table w-100">
                            <tr>
                                <th></th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                            <tr v-for="(data, id) in preview.breakdown.billing_plans" :key="'plan'+id">
                                <td>{{ data.name }}</td>
                                <td>{{ formatMoney(data.price) }}</td>
                                <td>{{ data.quantity }}</td>
                                <td>{{ formatMoney(data.total) }}</td>
                            </tr>
                            <tr v-for="(data, id) in preview.breakdown.addons" :key="'addon'+id">
                                <td style="max-width: 150px;">{{ data.name }}</td>
                                <td>{{ formatMoney(data.price) }}</td>
                                <td>{{ data.quantity }}</td>
                                <td>{{ formatMoney(data.total) }}</td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    Grand total: {{ formatMoney(preview.breakdown.amount_each_month) }}
                                </td>
                            </tr>
                        </table>
                    </div>
                    -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closePaymentConfirmationModal">Close
                    </button>
                    <button class="btn btn-primary" id="add-card-button" @click="confirmAndPay">
                        {{ buttonText ? buttonText : internalButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {mapState} from "vuex";
    import FormatMoneyMixin from "../mixins/FormatMoneyMixin";

    export default {
        props: {
            curUser: Object,
            buttonText: String,
            defaultPaymentMethod: Object,
            selectedPlan: Object,
            oldPlan: Object,
            selectedAddons: Array,
        },
        mixins: [FormatMoneyMixin],
        computed: {
            ...mapState({
                authUser: state => state.auth.user
            }),
            internalButtonText() {
                if (!this.preview.pay_now) {
                    return 'Confirm';
                }

                return 'Confirm and pay ' + this.formatMoney(this.preview.pay_now);
            },
            includedAddonIds() {
                return this.selectedPlan.included_addons.map((includedAddon) => {
                    return includedAddon.id;
                });
            },
            selectedAddonIds() {

                return this.selectedAddons.map((curAddon) => {
                    return curAddon.id;
                }).filter((addonId) => {
                    return this.includedAddonIds.indexOf(addonId) === -1;
                });
            },
            willUseSpareBusinessLicense() {
                return this.selectedPlan.name === 'Business' && this.authUser.spare_business_licenses;
            },
            amountEachMonthForSelectedItems() {

                let planPrice = parseFloat(this.selectedPlan.price);
                if (this.willUseSpareBusinessLicense) {
                    planPrice = 0;
                }

                let amount = planPrice * this.preview.plan_licenses_to_purchase;

                this.selectedAddons.filter((addon) => {
                    return this.includedAddonIds.indexOf(addon.id) === -1;
                }).forEach((addon) => {
                    amount += parseFloat(addon.price);
                });

                return amount;
            }
        },
        data() {
            return {
                isShowDetails: false,
                isPreviewLoading: true,
                preview: {}
            };
        },
        created() {
            this.loadPreview();
        },
        methods: {
            isAddonIncluded(addon) {
                return this.includedAddonIds.indexOf(addon.id) !== -1;
            },
            loadPreview() {

                this.$store.dispatch('setLoadingStatus', 'loading');

                let payload = {
                    billing_plan_id: this.selectedPlan.id,
                    addon_ids: this.selectedAddonIds
                };

                axios.patch('/preview-subusers-update/' + this.curUser.id, payload)
                    .then(response => {
                        this.isPreviewLoading = false;
                        this.preview = response.data;
                        this.$store.dispatch('setLoadingStatus', '');
                        this.showModal();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$store.dispatch('setLoadingStatus', '');
                        this.$toast.error('Error. Could not load preview.');
                    });
            },
            showModal() {
                window.setTimeout(() => {
                    // eslint-disable-next-line
                    $('#paymentConfirmationModal').modal('show')
                }, 200);
            },
            confirmAndPay() {
                this.$emit('confirm-and-pay');
            },
            closePaymentConfirmationModal() {
                this.$emit('close-payment-confirmation-modal');
            },
        }
    }
</script>