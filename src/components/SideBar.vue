<template>
    <nav class="sidebar">
        <div class="sidebar-content">
            <ul class="sidebar-menu">
                <li :class="{'active': currentPage.includes('dashboard')}" @click="closeSidebar">
                    <router-link :to="{name: 'dashboard'}">
                        <div class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="currentColor" d="M5,23 C3.34314575,23 2,21.6568542 2,20 L2,9 C2,8.69140957 2.14247284,8.40010398 2.38605939,8.21064778 L11.3860594,1.21064778 C11.7471699,0.929784072 12.2528301,0.929784072 12.6139406,1.21064778 L21.6139406,8.21064778 C21.8575272,8.40010398 22,8.69140957 22,9 L22,20 C22,21.6568542 20.6568542,23 19,23 L5,23 Z M12,3.26686158 L4,9.48908381 L4,20 C4,20.5522847 4.44771525,21 5,21 L8,21 L8,12 C8,11.4871642 8.38604019,11.0644928 8.88337887,11.0067277 L9,11 L15,11 C15.5128358,11 15.9355072,11.3860402 15.9932723,11.8833789 L16,12 L16,21 L19,21 C19.5522847,21 20,20.5522847 20,20 L20,9.48908381 L12,3.26686158 Z M14,13 L10,13 L10,21 L14,21 L14,13 Z"></path>
                            </svg>
                        </div>
                        Dashboard
                    </router-link>
                </li>
                <li :class="{'active': currentPage.includes('personal')}" @click="closeSidebar">
                    <router-link :to="{name: 'personal'}">
                        <div class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="currentColor" d="M1,8 L19,8 C21.7614237,8 24,10.2385763 24,13 C24,15.6887547 21.8776933,17.8818181 19.2168896,17.9953805 L19,18 C19,20.7614237 16.7614237,23 14,23 L5,23 C2.23857625,23 0,20.7614237 0,18 L0,9 C0,8.44771525 0.44771525,8 1,8 L19,8 L1,8 Z M17,10 L2,10 L2,18 C2,19.6568542 3.34314575,21 5,21 L14,21 C15.6568542,21 17,19.6568542 17,18 L17,10 Z M19,10 L19,16 C20.6568542,16 22,14.6568542 22,13 C22,11.4023191 20.75108,10.0963391 19.1762728,10.0050927 L19,10 Z M5,1 C5.51283584,1 5.93550716,1.38604019 5.99327227,1.88337887 L6,2 L6,5 C6,5.55228475 5.55228475,6 5,6 C4.48716416,6 4.06449284,5.61395981 4.00672773,5.11662113 L4,5 L4,2 C4,1.44771525 4.44771525,1 5,1 Z M9,1 C9.51283584,1 9.93550716,1.38604019 9.99327227,1.88337887 L10,2 L10,5 C10,5.55228475 9.55228475,6 9,6 C8.48716416,6 8.06449284,5.61395981 8.00672773,5.11662113 L8,5 L8,2 C8,1.44771525 8.44771525,1 9,1 Z M13,1 C13.5128358,1 13.9355072,1.38604019 13.9932723,1.88337887 L14,2 L14,5 C14,5.55228475 13.5522847,6 13,6 C12.4871642,6 12.0644928,5.61395981 12.0067277,5.11662113 L12,5 L12,2 C12,1.44771525 12.4477153,1 13,1 Z"></path>
                            </svg>
                        </div>
                        Personal
                    </router-link>
                    <div class="sub-menu">
                        <ul class="sub-menu-list">
                            <li :class="{'active': currentPage.includes('profile')}"><router-link :to="{name: 'profile'}">Profile</router-link></li>
                            <li :class="{'active': currentPage.includes('meeting') }"><router-link :to="{name: 'meetings'}">Meetings</router-link></li>
                            <li :class="{'active': currentPage.includes('recordings')}">
                                <router-link v-if="isPaidPlan" :to="{name: 'recordings'}">Recordings</router-link>
                                <a v-else @click="$emit('show-premium-feature-popup')" class="cursor-pointer">Recordings</a>
                            </li>
                            <li :class="{'active': currentPage.includes('settings')}"><router-link :to="{name: 'settings'}">Settings</router-link></li>
                            <li :class="{'active': currentPage.includes('personal-branding')}"><router-link :to="{name: 'personal-branding'}">Branding</router-link></li>
                        </ul>
                    </div>
                </li>
                <li :class="{'active': currentPage.includes('admin')}" @click="closeSidebar">
                    <router-link :to="{name: 'admin'}">
                        <div class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="currentColor" d="M12,0 C13.6568542,0 15,1.34314575 15,3 L15,3.08601169 C15.0010253,3.34508314 15.1558067,3.57880297 15.4037653,3.68513742 C15.6468614,3.79242541 15.9307827,3.74094519 16.1128932,3.56289322 L16.3172635,3.36763594 C16.8626928,2.88939884 17.5651246,2.62342669 18.295,2.62342669 C19.0912277,2.62342669 19.8547952,2.93995553 20.4167133,3.5025 C20.9800445,4.06520477 21.2965733,4.82877226 21.2965733,5.625 C21.2965733,6.42122774 20.9800445,7.18479523 20.4171068,7.74710678 L20.3648626,7.79926496 C20.1790548,7.98921731 20.1275746,8.27313857 20.2348626,8.51623466 C20.26314,8.58030647 20.2845309,8.64699387 20.2987985,8.71517468 C20.4176633,8.89040605 20.6163373,8.99914118 20.83,9 L21,9 C22.6568542,9 24,10.3431458 24,12 C24,13.6568542 22.6568542,15 21,15 L20.9139883,15 C20.6549169,15.0010253 20.421197,15.1558067 20.3148626,15.4037653 C20.2075746,15.6468614 20.2590548,15.9307827 20.4371068,16.1128932 L20.6323641,16.3172635 C21.1106012,16.8626928 21.3765733,17.5651246 21.3765733,18.295 C21.3765733,19.0912277 21.0600445,19.8547952 20.4975,20.4167133 C19.9347952,20.9800445 19.1712277,21.2965733 18.375,21.2965733 C17.5787723,21.2965733 16.8152048,20.9800445 16.2528932,20.4171068 L16.200735,20.3648626 C16.0107827,20.1790548 15.7268614,20.1275746 15.4739314,20.2391398 C15.2358067,20.341197 15.0810253,20.5749169 15.08,20.83 L15.08,21 C15.08,22.6568542 13.7368542,24 12.08,24 C10.4231458,24 9.08,22.6568542 9.08,21 L9.08027346,20.9333846 C9.07403212,20.6665579 8.90531385,20.4306648 8.59623466,20.3148626 C8.35313857,20.2075746 8.06921731,20.2590548 7.88710678,20.4371068 L7.68273651,20.6323641 C7.13730717,21.1106012 6.43487543,21.3765733 5.705,21.3765733 C4.90877226,21.3765733 4.14520477,21.0600445 3.58328666,20.4975 C3.01995553,19.9347952 2.70342669,19.1712277 2.70342669,18.375 C2.70342669,17.5787723 3.01995553,16.8152048 3.58289322,16.2528932 L3.63513742,16.200735 C3.82094519,16.0107827 3.87242541,15.7268614 3.76086017,15.4739314 C3.65880297,15.2358067 3.42508314,15.0810253 3.17,15.08 L3,15.08 C1.34314575,15.08 0,13.7368542 0,12.08 C0,10.4231458 1.34314575,9.08 3,9.08 L3.06661541,9.08027346 C3.33344206,9.07403212 3.56933519,8.90531385 3.68513742,8.59623466 C3.79242541,8.35313857 3.74094519,8.06921731 3.56289322,7.88710678 L3.36763594,7.68273651 C2.88939884,7.13730717 2.62342669,6.43487543 2.62342669,5.705 C2.62342669,4.90877226 2.93995553,4.14520477 3.5025,3.58328666 C4.06520477,3.01995553 4.82877226,2.70342669 5.625,2.70342669 C6.42122774,2.70342669 7.18479523,3.01995553 7.74710678,3.58289322 L7.79926496,3.63513742 C7.98921731,3.82094519 8.27313857,3.87242541 8.51623466,3.76513742 L8.61416379,3.72791577 L8.71517468,3.70120146 L8.79705744,3.63541842 C8.92365453,3.51569571 8.99928431,3.34805225 9,3.17 L9,3 C9,1.34314575 10.3431458,0 12,0 Z M12,2 C11.4477153,2 11,2.44771525 11,3 L11,3.17398831 C10.9957795,4.2302027 10.3647479,5.18306046 9.39393144,5.59913983 C9.30943133,5.63535548 9.22053528,5.65966354 9.12978593,5.67154209 C8.1847178,6.00283804 7.12462982,5.77295717 6.39289322,5.05710678 L6.3325,4.99671334 C6.14493174,4.8089363 5.89040925,4.70342669 5.625,4.70342669 C5.35959075,4.70342669 5.10506826,4.8089363 4.91671334,4.9975 C4.7289363,5.18506826 4.62342669,5.43959075 4.62342669,5.705 C4.62342669,5.97040925 4.7289363,6.22493174 4.91710678,6.41289322 L4.98486258,6.48073504 C5.69504132,7.20675484 5.92389315,8.26948715 5.60882133,9.16784883 L5.46625808,9.52187365 C5.04927385,10.4450623 4.13585063,11.055794 3.09,11.08 L3,11.08 C2.44771525,11.08 2,11.5277153 2,12.08 C2,12.6322847 2.44771525,13.08 3,13.08 L3.17398831,13.080008 C4.2302027,13.0842205 5.18306046,13.7152521 5.59486258,14.6762347 C6.0322675,15.6673187 5.82238657,16.8248438 5.05710678,17.6071068 L4.99671334,17.6675 C4.8089363,17.8550683 4.70342669,18.1095908 4.70342669,18.375 C4.70342669,18.6404092 4.8089363,18.8949317 4.9975,19.0832867 C5.18506826,19.2710637 5.43959075,19.3765733 5.705,19.3765733 C5.97040925,19.3765733 6.22493174,19.2710637 6.41289322,19.0828932 L6.48073504,19.0151374 C7.20675484,18.3049587 8.26948715,18.0761068 9.16784883,18.3911787 L9.52187365,18.5337419 C10.4450623,18.9507261 11.055794,19.8641494 11.08,20.91 L11.08,21 C11.08,21.5522847 11.5277153,22 12.08,22 C12.6322847,22 13.08,21.5522847 13.08,21 L13.080008,20.8260117 C13.0842205,19.7697973 13.7152521,18.8169395 14.6762347,18.4051374 C15.6673187,17.9677325 16.8248438,18.1776134 17.6071068,18.9428932 L17.6675,19.0032867 C17.8550683,19.1910637 18.1095908,19.2965733 18.375,19.2965733 C18.6404092,19.2965733 18.8949317,19.1910637 19.0832867,19.0025 C19.2710637,18.8149317 19.3765733,18.5604092 19.3765733,18.295 C19.3765733,18.0295908 19.2710637,17.7750683 19.0828932,17.5871068 L19.0151374,17.519265 C18.2576134,16.7448438 18.0477325,15.5873187 18.4808602,14.6060686 C18.8969395,13.6352521 19.8497973,13.0042205 20.91,13 L21,13 C21.5522847,13 22,12.5522847 22,12 C22,11.4477153 21.5522847,11 21,11 L20.8260117,11 C19.7697973,10.9957795 18.8169395,10.3647479 18.4008602,9.39393144 C18.3767164,9.33759803 18.3578649,9.27931088 18.3444603,9.21982334 L18.3284579,9.12978593 L18.2728978,8.95134601 C18.0277954,8.05348943 18.2717835,7.07889628 18.9428932,6.39289322 L19.0032867,6.3325 C19.1910637,6.14493174 19.2965733,5.89040925 19.2965733,5.625 C19.2965733,5.35959075 19.1910637,5.10506826 19.0025,4.91671334 C18.8149317,4.7289363 18.5604092,4.62342669 18.295,4.62342669 C18.0295908,4.62342669 17.7750683,4.7289363 17.5871068,4.91710678 L17.519265,4.98486258 C16.7448438,5.74238657 15.5873187,5.9522675 14.6060686,5.51913983 C13.6352521,5.10306046 13.0042205,4.1502027 13,3.09 L13,3 C13,2.44771525 12.5522847,2 12,2 Z M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z M12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 Z"></path>
                            </svg>
                        </div>
                        Admin
                    </router-link>
                    <div class="sub-menu">
                        <ul class="sub-menu-list">
                            <li
                            :class="{
                                'active': currentPage.includes('user-management') || currentPage.includes('account-plan') || currentPage.includes('plans-role') || currentPage.includes('create-user')
                            }"
                            >
                                <router-link :to="{name: 'user-management'}">User management</router-link>
                            </li>
                            <li v-if="canAuthUserAccessAdminFeatures" :class="{'active': currentPage.includes('business-branding')}">
                                <router-link v-if="isAuthUserBusinessPlanAdmin" :to="{name: 'business-branding'}">Business Branding</router-link>
                                <a v-else @click="$emit('show-premium-feature-popup')" class="cursor-pointer">Business Branding</a>
                            </li>
                            <!--
                            <li><a>Ops dashboard</a></li>
                            <li :class="{'active': currentPage.includes('create-user')}"><router-link :to="{name: 'create-user'}">Create a new user</router-link></li>
                            <li><a>Reporting</a></li>
                            -->
                        </ul>
                    </div>
                </li>
                <!-- <li :class="{'active': currentPage.includes('room-system')}">s
                    <router-link :to="{name: 'room-system'}">
                        <div class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="currentColor" d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                            </svg>
                        </div>
                        Room System
                    </router-link>
                    <div class="sub-menu">
                        <ul class="sub-menu-list">
                            <li :class="{'active': currentPage.includes('room-systems-manage')}"><router-link :to="{name: 'room-systems-manage'}">Manage room systems</router-link></li>
                            <li><a href="#">Create legacy gateway</a></li>
                        </ul>
                    </div>
                </li> -->
                <li v-if="canAuthUserAccessAdminFeatures" :class="{'active': currentPage.includes('account')}" @click="closeSidebar">
                    <router-link :to="{name: 'account'}">
                        <div class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="currentColor" d="M8,14 L16,14 C18.6887547,14 20.8818181,16.1223067 20.9953805,18.7831104 L21,19 L21,21 C21,21.5522847 20.5522847,22 20,22 C19.4871642,22 19.0644928,21.6139598 19.0067277,21.1166211 L19,21 L19,19 C19,17.4023191 17.75108,16.0963391 16.1762728,16.0050927 L16,16 L8,16 C6.40231912,16 5.09633912,17.24892 5.00509269,18.8237272 L5,19 L5,21 C5,21.5522847 4.55228475,22 4,22 C3.48716416,22 3.06449284,21.6139598 3.00672773,21.1166211 L3,21 L3,19 C3,16.3112453 5.12230671,14.1181819 7.78311038,14.0046195 L8,14 L16,14 L8,14 Z M12,2 C14.7614237,2 17,4.23857625 17,7 C17,9.76142375 14.7614237,12 12,12 C9.23857625,12 7,9.76142375 7,7 C7,4.23857625 9.23857625,2 12,2 Z M12,4 C10.3431458,4 9,5.34314575 9,7 C9,8.65685425 10.3431458,10 12,10 C13.6568542,10 15,8.65685425 15,7 C15,5.34314575 13.6568542,4 12,4 Z"></path>
                            </svg>
                        </div>
                        Account
                    </router-link>
                    <div class="sub-menu">
                        <ul class="sub-menu-list">
                            <li :class="{'active': currentPage.includes('business-profile')}"><router-link :to="{name: 'business-profile'}">Business Profile</router-link></li>
                            <li :class="{'active': currentPage.includes('billing')}"><router-link :to="{name: 'billing'}">Billing</router-link></li>
                            <li :class="{'active': currentPage.includes('invoices')}"><router-link :to="{name: 'invoices'}">Invoices</router-link></li>
                        </ul>
                    </div>
                </li>
                <li @click="closeSidebar">
                    <a href="#" @click="logout">
                        <div class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="currentColor" d="M4.92777778,5.93300868 C5.3182383,5.54242063 5.95140327,5.54231725 6.34199132,5.93277778 C6.73257937,6.3232383 6.73268275,6.95640327 6.34222222,7.34699132 C3.21877844,10.4714552 3.21932974,15.5363001 6.34345363,18.660084 C9.46757752,21.7838679 14.5324225,21.7838679 17.6565464,18.660084 C20.7806703,15.5363001 20.7812216,10.4714552 17.6577778,7.34699132 C17.2673173,6.95640327 17.2674206,6.3232383 17.6580087,5.93277778 C18.0485967,5.54231725 18.6817617,5.54242063 19.0722222,5.93300868 C22.976527,9.83858854 22.9758378,16.1696447 19.070683,20.0743745 C15.1655281,23.9791043 8.8344719,23.9791043 4.92931703,20.0743745 C1.02416217,16.1696447 1.02347305,9.83858854 4.92777778,5.93300868 Z M12,1 C12.5128358,1 12.9355072,1.38604019 12.9932723,1.88337887 L13,2 L13,12 C13,12.5522847 12.5522847,13 12,13 C11.4871642,13 11.0644928,12.6139598 11.0067277,12.1166211 L11,12 L11,2 C11,1.44771525 11.4477153,1 12,1 Z"></path>
                            </svg>
                        </div>
                        Log out
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
<script>

import {mapState} from "vuex";
import PlanMixin from "../mixins/PlanMixin";

export default {
    computed: {
        ...mapState({
            userList: state => state.user.subUsers,
            roleList: state => state.billingPlan.roles,
        }),
        currentPage() {
            return this.$route.path
        },
    },
    mixins: [PlanMixin],
    methods: {
        logout() {
            this.removeFavicon()
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
            });
        },
        closeSidebar() {
            document.body.classList.remove('sidebar-open')
            // eslint-disable-next-line
            $('.btn-toggle-menu').attr('aria-expanded', false)
        },
        removeFavicon() {
            var link = document.createElement('link'),
                oldLink = document.getElementById('dynamic-favicon')
            link.id = 'dynamic-favicon'
            link.rel = 'shortcut icon'
            link.href = ''
            if (oldLink) {
                document.head.removeChild(oldLink);
            }
            document.head.appendChild(link);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~bootstrap/scss/functions';
    @import '~bootstrap/scss/variables';
    @import '~bootstrap/scss/mixins';

    .sidebar {
        @include media-breakpoint-down(sm) {
            left: -230px;
        }
    }
</style>
