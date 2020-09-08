<template>
	<main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Account</a></li>
            <li class="breadcrumb-item active">Invoices</li>
        </ol>
        <div class="section-header">
          <div class="section-header-title">
            <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
            <h1>Invoices</h1>
          </div>
        </div>
        <div class="row row-has-panel">
          <div class="col-lg-12">
            <div class="section-panel">
              <div class="section-panel-header">
                <div class="section-panel-header-title">
                  <h3>Invoices</h3>
                </div>
              </div>
              <div class="section-panel-body">

                <div v-if="!isFetchingUpcomingInvoice && upcomingInvoice.current_period_end">

                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item pl-1 border-0">
                      <strong>
                        Next invoice:
                      </strong>
                      {{ upcomingInvoice.current_period_end }}
                    </li>
                    <li class="list-group-item border-0">
                      <strong>
                        Estimated amount:
                      </strong>
                      {{ formatMoney(upcomingInvoice.upcoming_amount) }}
                    </li>
                  </ul>

                </div>

                <div class="table-responsive">
                  <table class="table table-borderless table-data">
                    <thead>
                      <tr>
                        <th>Invoice Number</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="invoice in invoiceData.data" :key="invoice.id">
                        <td>{{ invoice.number }}</td>
                        <td>{{ invoice.date | moment('ddd, D MMMM h:mm A') }}</td>
                        <td><span>{{ formatMoney(invoice.total) }}</span></td>
                        <td>
                            {{ invoice.status }}
                        </td>
                        <td><a :href="invoice.pdf" target="_black">PDF</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row" >
                  <div class="col-12 p-3">
                    <label class="float-right font-weight-bold m-2">
                      {{ invoiceData.total }} item{{ ((invoiceData.total === 0) || (invoiceData.total > 1)) ? 's' : '' }},
                      {{ invoiceData.last_page }} page{{ invoiceData.last_page > 1 ? 's' : '' }}
                    </label>
                    <div class="pagiantion float-right">
                      <button
                        class="btn btn-outline fas fa-step-backward"
                        :disabled="curPage === 1"
                        @click="go(invoiceData.first_page_url)">
                      </button>
                      <button
                        class="btn btn-outline fas fa-angle-left"
                        :disabled="curPage === 1"
                        @click.prevent="go(invoiceData.prev_page_url)">
                      </button>
                      <input
                        type="text"
                        class="text-center"
                        v-model="curPage"
                        @keyup.enter="go(`/?page=${curPage}`)"/>
                      <button
                        class="btn btn-outline fas fa-angle-right"
                        :disabled="curPage === invoiceData.last_page"
                        @click.prevent="go(invoiceData.next_page_url)">
                      </button>
                      <button
                        class="btn btn-outline fas fa-step-forward"
                        :disabled="curPage === invoiceData.last_page"
                        @click.prevent="go(invoiceData.last_page_url)">
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapState } from 'vuex'
import FormatMoneyMixin from "../../mixins/FormatMoneyMixin";
import axios from "axios";

export default {
  name: 'invoices',
  mixins: [FormatMoneyMixin],
  data: () => ({
    curPage: '',
    isFetchingUpcomingInvoice: true,
    upcomingInvoice: {},
  }),
  computed: {
    ...mapState({
      invoiceData: state => state.auth.invoices,
    }),
  },
  watch: {
    invoiceData(val) {
      this.curPage = val.current_page
    }
  },
  created() {
    this.fetchUpcomingInvoice();
    this.$store.dispatch('getInvoices', '');
  },
  methods: {
    fetchUpcomingInvoice() {
      axios({url: '/upcoming-invoice', method: 'GET'})
        .then(response => {
          this.isFetchingUpcomingInvoice = false;
          this.upcomingInvoice = response.data;
        })
        .catch(err => {
            console.log(err);
        });
    },
    go(url) {
      this.$store.dispatch('getInvoices', url)
    }
  }
}
</script>