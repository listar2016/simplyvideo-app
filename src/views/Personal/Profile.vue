<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Personal</a></li>
                    <li class="breadcrumb-item active">Profile</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>Your account</h1>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Profile Details</h3>
                                </div>
                                <div class="section-panel-header-action">
                                    <a v-if="statusDetails" href="#" class="btn btn-link" @click.prevent="discardDetails"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusDetails = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="col-md-6 col-lg-4">
                                            <div 
                                                class="form-group" 
                                                :class="{'form-error': errors.name}">
                                                <label>Name</label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    v-model="newUserInfo.name" 
                                                    :readonly="!statusDetails" 
                                                    required/>
                                                <div
                                                    class="form-error-message"
                                                    v-for="(error, index) in errors.name"
                                                    :key="index">
                                                    {{ error }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4">
                                            <div 
                                                class="form-group" 
                                                :class="{'form-error': errors.last_name}">
                                                <label>Last name</label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    v-model="newUserInfo.last_name" 
                                                    :readonly="!statusDetails" 
                                                    required/>
                                                <div
                                                    class="form-error-message"
                                                    v-for="(error, index) in errors.last_name"
                                                    :key="index">
                                                    {{ error }}
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4">
                                            <div 
                                                class="form-group"
                                                :class="{'form-error': errors.phone}">
                                                <label>Phone number</label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    v-model="newUserInfo.phone" 
                                                    :readonly="!statusDetails" 
                                                    required/>
                                                <div
                                                    class="form-error-message"
                                                    v-for="(error, index) in errors.phone"
                                                    :key="index">
                                                    {{ error }}
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 ml-auto" v-if="statusDetails">
                                            <div class="form-group text-md-right">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button 
                                                    type="submit" 
                                                    class="btn btn-md btn-primary" 
                                                    @click.prevent="updateDetails()">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Personal room ID</h3>
                                </div>
                                <div v-if="isAuthUserBusinessPlan" class="section-panel-header-action">
                                    <a 
                                        v-if="statusRoom" 
                                        href="#" 
                                        class="btn btn-link" 
                                        @click.prevent="discardRoom">
                                        <img alt="" src="@/assets/img/icons/icon-delete-user.svg" />
                                        Cancel &amp; Discard
                                    </a>
                                    <a 
                                        v-else 
                                        href="#" 
                                        class="btn btn-link" 
                                        @click.prevent="statusRoom = true">
                                        <img alt="" src="@/assets/img/icons/icon-edit.svg" />
                                        Edit
                                    </a>
                                </div>
                                <div v-else class="section-panel-header-action">
                                    <a class="btn btn-link cursor-pointer" @click="$emit('show-premium-feature-popup')">
                                        <img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit
                                    </a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div 
                                                class="form-group pre-url-with"
                                                :class="{'form-error': errors.direct_access_token}">
                                                <label>Personal room ID</label>
                                                <input type="text" 
                                                    class="form-control" 
                                                    data-pre-populate="www.simplyvideo.me/" 
                                                    placeholder="room id" 
                                                    :readonly="!statusRoom"
                                                    v-model="roomId"/>
                                                <div class="pre-url">www.simplyvideo.me/</div>
                                                 <div
                                                    class="form-error-message"
                                                    v-for="(error, index) in errors.direct_access_token"
                                                    :key="index">
                                                    {{ error }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 ml-auto" v-if="statusRoom">
                                            <div class="form-group text-md-right">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateRoomId()">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Email &amp; Password</h3>
                                </div>
                                <div class="section-panel-header-action">
                                    <a v-if="statusCredentials" href="#" class="btn btn-link" @click.prevent="discardCredentials"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusCredentials = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="colmd-6 col-lg-4">
                                            <div class="form-group">
                                                <label>Email Address</label>
                                                <input type="email" class="form-control" v-model="newUserInfo.email" :readonly="!statusCredentials"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 col-lg-4">
                                            <div class="form-group m-0">
                                                <label>Password</label>
                                                <input type="password" class="form-control" v-model="newUserInfo.password" :readonly="!statusCredentials"/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 ml-auto" v-if="statusCredentials">
                                            <div class="form-group text-md-right">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateCredentials()">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!--
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-body">
                                <div class="call-to-action">
                                    <div class="row align-items-center">
                                        <div class="col-xl-7 col-md-9">
                                            <div class="call-to-action-content">
                                                <h4>Calendar and contact intergration</h4>
                                                <p>You can change ID of your meeting room any time you like by simply editing it below.</p>
                                                <a href="#" data-trigger="f-modal" data-href="#modal-calendar-integration" @click.prevent="isModalShow = true">Connect to your calendar service</a>
                                            </div>
                                        </div>
                                        <div class="col-xl-5 col-md-3 mb-1 mb-md-0 text-md-right order-first order-md-last">
                                            <img alt="" class="icon-fluid" src="@/assets/img/icons/icon-calendar-cl.svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </section>
        <transition name="fade">
            <confirm-billing-method title="Calendar and contact integration" v-if="isModalShow" @close="isModalShow = false"></confirm-billing-method>
        </transition>
    </main>
</template>
<script>
import { mapState } from 'vuex'
import ConfirmBillingMethod from '@/components/ConfirmBillingMethod.vue'
import PlanMixin from "../../mixins/PlanMixin";
export default {
    mixins: [PlanMixin],
    components: {
        ConfirmBillingMethod
    },
    data: () => ({
        newUserInfo: '',
        statusDetails: false,
        statusRoom: false,
        statusCredentials: false,
        isModalShow: false,
        roomId: '',
        errors: []
    }),
    computed: {
        ...mapState({
            userInfo: state => state.auth.user
        })
    },
    watch:{
        userInfo: function(val) {
            this.newUserInfo = {...val}
            if (this.newUserInfo.meeting_room && this.newUserInfo.meeting_room.webrtc && this.newUserInfo.meeting_room.webrtc.direct_access_token) {
                this.roomId = this.newUserInfo.meeting_room.webrtc.direct_access_token
            } else {
                this.roomId = ''
            }
        }
    },
    created() {
        this.newUserInfo = {...this.userInfo}
        if (this.newUserInfo.meeting_room && this.newUserInfo.meeting_room.webrtc && this.newUserInfo.meeting_room.webrtc.direct_access_token) {
            this.roomId = this.newUserInfo.meeting_room.webrtc.direct_access_token
        } else {
            this.roomId = ''
        }
    },
    methods: {
        discardDetails() {
            this.statusDetails = false
            this.newUserInfo.name = this.userInfo.name 
            this.newUserInfo.last_name = this.userInfo.last_name
            this.newUserInfo.phone = this.userInfo.phone
        },
        updateDetails() {
            let vm = this
            let param = {
                name: vm.newUserInfo.name,
                last_name: vm.newUserInfo.last_name,
                phone: vm.newUserInfo.phone
            }
            vm.$store.dispatch('updateProfile', param)
                .then(() => {
                    vm.errors = []
                    vm.$toast.success("Updated successfully!")
                    vm.statusDetails = false
                })
                .catch(err => {
                    console.log(err)
                    let data= err.response.data
                    vm.$toast.error(data.message)
                    if (err.response.status === 422) {
                        vm.errors = data.errors
                    }
                })
        },
        discardCredentials() {
            this.statusCredentials = false
            this.newUserInfo.email = this.userInfo.email
            this.newUserInfo.password = ''
        },
        updateCredentials() {
            let vm = this
            let param = {
                email: (vm.newUserInfo.email === vm.userInfo.email) ? '' : vm.newUserInfo.email,
                password: vm.newUserInfo.password
            }
            if (!param.email && !param.password) {
                vm.statusCredentials = false
                return
            }
            vm.$store.dispatch('updateCredentials', param)
                .then(() => {
                    vm.$toast.success("Updated successfully!")
                    vm.newUserInfo.password = ''
                    vm.statusCredentials = false
                    vm.errors = []
                })
                .catch(err => {
                    console.log(err)
                    let data= err.response.data
                    vm.$toast.error(data.message)
                    if (err.response.status === 422) {
                        vm.errors = data.errors
                    }
                })
        },
        discardRoom() {
            this.statusRoom = false
            this.newUserInfo.meeting_room.webrtc.direct_access_token = this.userInfo.meeting_room.webrtc.direct_access_token
            this.roomId = this.newUserInfo.meeting_room.webrtc.direct_access_token
        },
        updateRoomId() {
            let vm = this
            console.log(vm.newUserInfo)
            let param = {
                alias: vm.newUserInfo.meeting_room.webrtc.alias,
                direct_access_token: vm.roomId
            }
            vm.$store.dispatch('updateRoomId', param)
                .then(() => {
                    vm.$toast.success("The room id is updated successfully!")
                    vm.statusRoom = false
                    vm.errors = []
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            vm.errors = data.errors
                        }
                    } catch {
                        console.log(err)
                    }
                })
        }
    }
}
</script>