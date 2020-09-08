export default {
    data() {
        return {
            isShowPaymentModal: false,
        };
    },
    methods: {
        closePaymentModal() {
            // eslint-disable-next-line
            $('#paymentModal').modal('hide');
            window.setTimeout(() => {
                this.isShowPaymentModal = false;
            }, 800);
        },
        showPaymentModal() {
            this.isShowPaymentModal = true;
            window.setTimeout(() => {
                // eslint-disable-next-line
                $('#paymentModal').modal('show')
            }, 200);
        },
    }
};
