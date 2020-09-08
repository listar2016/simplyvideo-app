export default {
    data() {
        return {
            isShowPaymentConfirmationModal: false,
        };
    },
    methods: {
        closePaymentConfirmationModal() {
            // eslint-disable-next-line
            $('#paymentConfirmationModal').modal('hide');
            window.setTimeout(() => {
                this.isShowPaymentConfirmationModal = false;
            }, 800);
        },
        showPaymentConfirmationModal() {
            this.isShowPaymentConfirmationModal = true;
            // This is now handled inside the PaymentConfirmationModal.vue:
            /*
            window.setTimeout(() => {
                // eslint-disable-next-line
                $('#paymentConfirmationModal').modal('show')
            }, 200);
             */
        },
    }
};
