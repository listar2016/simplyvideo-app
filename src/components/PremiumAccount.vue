<template>
    <div id="modal-calendar-integration" class="f-modal">
        <div class="f-modal-table">
            <div class="f-modal-cell">
                <div class="f-modal-content">
                    <div class="f-modal-close" @click="$emit('close')"></div>
                    <div class="modal-popup">
                        <div class="modal-popup-content">
                            <div class="my-4">
                                <img src="@/assets/img/icons/ic_premium.svg"/>
                            </div>
                            <h6>
                                {{ this.headerText ? this.headerText : 'You discovered a Premium feature!' }}
                            </h6>
                            <p>
                                {{ this.mainText ? this.mainText : 'This feature is not included in your current plan' }}
                            </p>
                            <div v-if="!hideButton">
                                <button v-if="canAuthUserAccessAdminFeatures" class="btn btn-primary" @click="unlockThisFeature" >
                                    {{ this.buttonText ? this.buttonText : 'Unlock this feature' }}
                                </button>
                                <p v-else>Account admin can unlock this feature</p>
                            </div>
                            <div>
                                <a class="btn mt-1" @click.prevent="$emit('close')">
                                    {{ hideButton ? 'Close' : 'Not now' }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PlanMixin from "../mixins/PlanMixin";

export default {
    mixins: [PlanMixin],
    props: {
        headerText: String,
        mainText: String,
        buttonText: String,
        hideButton: Boolean,
        prevRoute: String
    },
    created() {
        // eslint-disable-next-line
        $('body').addClass('f-modal-is-open')
        console.log(this.prevRoute)
    },
    destroyed() {
        // eslint-disable-next-line
        $('body').removeClass('f-modal-is-open')
    },
    methods: {
        unlockThisFeature() {
            this.$emit('hide-premium-feature-popup');
            this.$router.push({name: 'account-plan', params: {prevRoute: this.prevRoute}});
        }
    }
}
</script>