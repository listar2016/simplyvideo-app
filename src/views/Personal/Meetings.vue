<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Personal</a></li>
                    <li class="breadcrumb-item active">Meetings</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>My meetings</h1>
                    </div>
                    <div class="section-header-action">
                        <router-link :to="{ name:'meeting' }" class="btn btn-gray"><img alt="" src="@/assets/img/icons/icon-plus.svg" />Create Meeting</router-link>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div :class="isShowGotcha ? 'col-xl-9' : 'col-xl-12'">
                        <div class="section-panel">
                            <div class="section-table-tabs">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li><a class="active" href="#tab-upcoming" data-toggle="tab" role="tab">Upcoming</a></li>
                                    <li><a href="#tab-previous" data-toggle="tab" role="tab">Previous meetings</a></li>
                                </ul>
                            </div>
                            <div class="section-panel-body">
                                <div class="tab-content">
                                    <div id="tab-upcoming" class="tab-pane fade show active">
                                        <div class="table-date-row-wrapper">
                                            <upcoming-meetings-table></upcoming-meetings-table>
                                        </div>
                                    </div>
                                    <div id="tab-previous" class="tab-pane fade">
                                        <div class="table-date-row-wrapper">
                                            <previous-meetings-table></previous-meetings-table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-panel">
                            <div class="section-panel-body">
                                <plugins></plugins>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl mt-2 mt-xl-0" v-if="isShowGotcha">
                        <gotcha :tip-list="tipList" @close="isShowGotcha = false"></gotcha>
                    </div>
                </div>
            </div>
        </section>
        <!-- <transition name="fade">
          <confirm-billing-method title="Join meeting" v-if="isModalShow" @close="isModalShow = false"></confirm-billing-method>
        </transition> -->
    </main>
</template>
<script>
    // import {mapState} from 'vuex'
    import Gotcha from '@/components/Gotcha'
    // import ConfirmBillingMethod from '@/components/ConfirmBillingMethod'
    import UpcomingMeetingsTable from "../../components/UpcomingMeetingsTable";
    import PreviousMeetingsTable from "../../components/PreviousMeetingsTable";
    import Plugins from "../../components/Plugins";
    export default {
        components: {
            Gotcha,
            // ConfirmBillingMethod,
            UpcomingMeetingsTable,
            PreviousMeetingsTable,
            Plugins,
        },
        data() {
            return {
                isShowGotcha: true,
                tipList: [
                    "You will find your upcoming and previous meeting details here",
                    "You can join any upcoming meeting or check out details of historic ones too."
                ],
                splitDate: '',
                isModalShow: false,
                curMeetingId: ''
            }
        },
        methods: {
        },
    }
</script>
