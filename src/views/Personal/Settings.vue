<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Personal</a></li>
                    <li class="breadcrumb-item active">Settings</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>Settings</h1>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Meeting settings</h3>
                                </div>
                                <div class="section-panel-header-action">
                                    <a v-if="statusMeeting" href="#" class="btn btn-link" @click.prevent="discardMeetingSettings"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusMeeting = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="form-group m-0">
                                                <label>Host pin</label>
                                                <input type="number" min="1000" max="99999" step="1" class="form-control" :disabled="!statusMeeting" v-model="pin"/>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 mt-1 mt-lg-0">
                                            <div class="form-group m-0">
                                                <label>Guest pin</label>
                                                <input type="number" min="1000" max="99999" step="1" class="form-control" :disabled="!statusMeeting" v-model="guest_pin"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr v-if="statusMeeting"/>
                                    <div class="row">
                                        <div class="col-lg-3 ml-auto mt-1 mt-lg-0" v-if="statusMeeting">
                                            <div class="form-group text-md-right m-0">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateMeetingSettings()">Save</button>
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
                                    <h3>Email notifications</h3>
                                </div>
                                <div v-if="isPaidPlan" class="section-panel-header-action">
                                    <a v-if="statusEmail" href="#" class="btn btn-link" @click.prevent="discardEmailSettings"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusEmail = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                                <div v-else class="section-panel-header-action">
                                    <a class="btn btn-link cursor-pointer" @click="$emit('show-premium-feature-popup')">
                                        <img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit
                                    </a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <div class="custom-checkbox-slide">
                                            <input 
                                                id="check2"
                                                type="checkbox"
                                                :checked="notify_guests_before_meeting_starts" 
                                                :disabled="!statusEmail"
                                                @change="notify_guests_before_meeting_starts = 1 - notify_guests_before_meeting_starts"/>
                                            <label for="check2">Send reminder email to guest 5 minutes before call starts</label>
                                        </div>
                                        <div class="custom-checkbox-slide">
                                            <input 
                                                id="check3"
                                                type="checkbox"
                                                :checked="notify_host_before_meeting_starts" 
                                                :disabled="!statusEmail"
                                                @change="notify_host_before_meeting_starts = 1 - notify_host_before_meeting_starts"/>
                                            <label for="check3">Send me a reminder email 5 minutes before call starts</label>
                                        </div>
                                        <div class="custom-checkbox-slide">
                                            <input
                                                id="check4"
                                                type="checkbox"
                                                :checked="notify_host_when_guest_enters_room"
                                                :disabled="!statusEmail"
                                                @change="notify_host_when_guest_enters_room = 1 - notify_host_when_guest_enters_room"/>
                                            <label for="check4">Notify me when attendenties join my meeting flow and Im not in my room already</label>
                                        </div>
                                    </div>
                                    <div class="form-group text-md-right m-0 ml-auto" v-if="statusEmail">
                                        <label class="d-none d-lg-block">&nbsp;</label>
                                        <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateEmailSettings()">Save</button>
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
                            <div class="section-panel-header">
                                <div class="section-panel-header-title-group">
                                    <h3>Profile Details</h3>
                                    <p>Select password for use on Outlook and Chrome plugins</p>
                                </div>
                                <div class="section-panel-header-action">
                                    <a v-if="statusPassword" href="#" class="btn btn-link" @click.prevent="statusPassword =false"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusPassword = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="password" class="form-control" :disabled="!statusPassword" v-model="plugin_password"/>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label>Confirm</label>
                                                <input type="password" class="form-control" :disabled="!statusPassword" v-model="confirm_plugin_password"/>
                                            </div>
                                        </div>
                                        <div class="col-lg flex-lg-grow-0 ml-lg-auto">
                                            <div class="form-group">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updatePasswordSettings">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </section>
    </main>
</template>
<script>
import {mapState} from 'vuex'
import PlanMixin from "../../mixins/PlanMixin";
export default {
    mixins: [PlanMixin],
    data() {
        return {
            statusMeeting: false,
            statusEmail: false,
            statusPassword: false,
            pin: '',
            guest_pin: '',
            notify_host_before_meeting_starts: 0,
            notify_guests_before_meeting_starts: 0,
            notify_host_when_guest_enters_room: 0,
            plugin_password: '',
            confirm_plugin_password: ''
        }
    },
    computed: {
        ...mapState({
            settings: state => state.auth.settings
        })
    },
    watch:{
        settings: function() {
            this.initSettings()
        }
    },
    created() {
        this.initSettings()
    },
    methods: {
        initSettings() {
            this.initMeetingSettings()
            this.initEmailSettings()
            this.initPasswordSettings()
        },
        initMeetingSettings() {
            if (this.settings && this.settings.length > 0) {
                this.settings.forEach(item => {
                    switch(item.key) {
                        case 'pin':
                            this.pin = item.value
                            break
                        case 'guest_pin':
                            this.guest_pin = item.value
                            break
                    }
                })
            } else {
                this.pin = ''
                this.guest_pin = ''
            }
        },
        initEmailSettings() {
            if (this.settings && this.settings.length > 0) {
                this.settings.forEach(item => {
                    switch(item.key) {
                        case 'notify_host_before_meeting_starts':
                            this.notify_host_before_meeting_starts = item.value
                            break
                        case 'notify_guests_before_meeting_starts':
                            this.notify_guests_before_meeting_starts = item.value
                            break
                        case 'notify_host_when_guest_enters_room':
                            this.notify_host_when_guest_enters_room = item.value
                            break
                    }
                })
            } else {
                this.notify_host_before_meeting_starts = 0
                this.notify_guests_before_meeting_starts = 0
                this.notify_host_when_guest_enters_room = 0
            }
        },
        initPasswordSettings() {
            this.plugin_password = '',
            this.confirm_plugin_password = ''
        },
        discardMeetingSettings() {
            this.statusMeeting = false
            this.initMeetingSettings()
        },
        discardEmailSettings() {
            this.statusEmail = false
            this.initEmailSettings()
        },
        discardPasswordSettings() {
            this.statusPassword = false
            this.initPasswordSettings()
        },
        updateMeetingSettings() {
            let vm = this
            let param = {
                pin: vm.pin,
                guest_pin: vm.guest_pin,
            }
            vm.$store.dispatch('updateMeetingSettings', param)
                .then(() => {
                    vm.$toast.success("Settings updated successfully!")
                    vm.statusMeeting = false
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            for (let messages of Object.values(data.errors)) {
                                for (let msg of messages) {
                                    vm.$toast.error(msg) 
                                }
                            }
                        } 
                    } catch {
                        vm.$toast.error(err)
                    }
                })  
        },
        updateEmailSettings() {
            let vm = this
            let param = {
                notify_host_before_meeting_starts: vm.notify_host_before_meeting_starts,
                notify_guests_before_meeting_starts: vm.notify_guests_before_meeting_starts,
                notify_host_when_guest_enters_room: vm.notify_host_when_guest_enters_room
            }
            vm.$store.dispatch('updateEmailSettings', param)
                .then(() => {
                    vm.$toast.success("The settings of email notifications is updated successfully!")
                    vm.statusEmail = false
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            for (let messages of Object.values(data.errors)) {
                                for (let msg of messages) {
                                    vm.$toast.error(msg) 
                                }
                            }
                        } 
                    } catch {
                        vm.$toast.error(err)
                    }
                })  
        },
        updatePasswordSettings() {
            let vm = this
            if (vm.plugin_password !== vm.confirm_plugin_password) {
                vm.$toast.error("The password confirmation does not match!")
                return
            }
            let param = {
                plugin_password: vm.plugin_password
            }
            vm.$store.dispatch('updatePasswordSettings', param)
                .then(() => {
                    vm.$toast.success("The plugin password is updated successfully!")
                    vm.statusPassword = false
                    vm.initPasswordSettings()
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            for (let messages of Object.values(data.errors)) {
                                for (let msg of messages) {
                                    vm.$toast.error(msg) 
                                }
                            }
                        } 
                    } catch {
                        vm.$toast.error(err)
                    }
                })  
        }
    }
}
</script>