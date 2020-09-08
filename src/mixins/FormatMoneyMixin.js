import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            authUser: state => state.auth.user
        }),
    },
    methods: {
        formatMoney(amount) {

            if (this.authUser && this.authUser.account) {
                return this.authUser.account.currency.sign + parseFloat(amount).toFixed(2);
            }

            return '';
        },
    }
};
