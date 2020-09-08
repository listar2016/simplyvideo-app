<template>
    <div id="modal-calendar-integration" class="f-modal">
        <div class="f-modal-table">
            <div class="f-modal-cell">
                <div class="f-modal-content">
                    <div class="f-modal-close" @click="$emit('close')"></div>
                    <div class="modal-popup">
                        <div class="modal-popup-content">
                            <div class="icon icon-orange">
                                <svg width="38px" height="38px" viewBox="0 0 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Dashboard-_-Personal-_-Meetings-_-Popup-alert" transform="translate(-711.000000, -81.000000)" fill="#F15F22" fill-rule="nonzero">
                                            <g id="Popup" transform="translate(480.000000, 0.000000)">
                                                <g id="Icon" transform="translate(200.000000, 50.000000)">
                                                    <path fill="#333" d="M56,31 L64,31 C66.6887547,31 68.8818181,33.1223067 68.9953805,35.7831104 L69,36 L69,64 C69,66.6887547 66.8776933,68.8818181 64.2168896,68.9953805 L64,69 L56,69 C55.4477153,69 55,68.5522847 55,68 C55,67.4871642 55.3860402,67.0644928 55.8833789,67.0067277 L56,67 L64,67 C65.5976809,67 66.9036609,65.75108 66.9949073,64.1762728 L67,64 L67,36 C67,34.4023191 65.75108,33.0963391 64.1762728,33.0050927 L64,33 L56,33 C55.4477153,33 55,32.5522847 55,32 C55,31.4871642 55.3860402,31.0644928 55.8833789,31.0067277 L56,31 L64,31 L56,31 Z M45.2097046,39.3871006 L45.2928932,39.2928932 C45.6533772,38.9324093 46.2206082,38.9046797 46.6128994,39.2097046 L46.7071068,39.2928932 L56.7071068,49.2928932 L56.7485042,49.336853 L56.7485042,49.336853 L56.8036654,49.4046934 L56.8036654,49.4046934 L56.8753288,49.5159379 L56.8753288,49.5159379 L56.9287745,49.628664 L56.9287745,49.628664 L56.9641549,49.734007 L56.9641549,49.734007 L56.9889822,49.8515331 L56.9889822,49.8515331 L56.9982536,49.9407399 L56.9982536,49.9407399 L56.9982536,50.0592877 L56.9982536,50.0592877 L56.9931674,50.1174626 L56.9931674,50.1174626 L56.9725773,50.2335141 L56.9725773,50.2335141 L56.9401054,50.3416665 L56.9401054,50.3416665 L56.9063266,50.4232215 L56.9063266,50.4232215 L56.8540045,50.5207088 L56.8540045,50.5207088 L56.7803112,50.625449 L56.7803112,50.625449 L56.7071068,50.7071068 L46.7071068,60.7071068 C46.3165825,61.0976311 45.6834175,61.0976311 45.2928932,60.7071068 C44.9324093,60.3466228 44.9046797,59.7793918 45.2097046,59.3871006 L45.2928932,59.2928932 L53.584,51 L32,51 C31.4871642,51 31.0644928,50.6139598 31.0067277,50.1166211 L31,50 C31,49.4871642 31.3860402,49.0644928 31.8833789,49.0067277 L32,49 L53.586,49 L45.2928932,40.7071068 C44.9324093,40.3466228 44.9046797,39.7793918 45.2097046,39.3871006 L45.2928932,39.2928932 L45.2097046,39.3871006 Z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <h6>Meeting Invite</h6>
                            <div class="text-left">
                                <p class="font-weight-bold py-1">Add user by their email</p>
                                <form class="form-horizontal">
                                    <div class="form-group m-0">
                                        <input 
                                            class="form-control" 
                                            data-add-users="true" 
                                            type="text" 
                                            placeholder="Email address" 
                                            :class="isEmailValid()"
                                            v-model="txtEmail" 
                                            @keyup="addEmail"
                                            @focusout="checkEmail"/>
                                        <p class="form-group-note">
                                            <img alt="Separate email adresses with a comma" src="@/assets/img/icons/icon-info.svg" /> Separate email addresses with a comma
                                        </p>
                                    </div>
                                    <div class="form-group m-0 mt-1 mt-lg-0">
                                        <div class="added-users">
                                            <div class="added-users-user" 
                                                v-for="item in emailList" 
                                                :key="item.email" 
                                                :class="{ 'is-selected': item.isSelected }" 
                                                @click="item.isSelected = !item.isSelected">
                                                    {{ item.email }}
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="my-2"/>
                                    <button 
                                        type="button" 
                                        data-delete="users" 
                                        class="btn btn-link my-0" 
                                        @click="deleteSelItem()"
                                        v-if="emailList.filter(item => item.isSelected).length > 0">
                                        <img alt="" src="@/assets/img/icons/icon-trash-primary.svg" />
                                        Delete selected emails
                                    </button>
                                </form>
                            </div>
                            <a href="#" class="btn btn-primary" @click.prevent="sendInvite">Send Invites</a>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        // eslint-disable-next-line
        $('body').addClass('f-modal-is-open')
    },
    destroyed() {
        // eslint-disable-next-line
        $('body').removeClass('f-modal-is-open')
    },
    props: {
        meetingId: Number
    },
    data() {
        return {
            txtEmail: '',
            emailList:[],
            // eslint-disable-next-line
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    methods: {
        isEmailValid() {
            return this.reg.test(this.txtEmail) ? '' : 'has-error';
        },
        addEmail(event) {
            if (event.key === ','){
                let curEmail = this.txtEmail.slice(0,-1)
                if (this.reg.test(curEmail)) {
                    this.emailList.push({
                        email: curEmail,
                        isSelected: false
                    })
                    this.txtEmail = ''
                } else {
                    this.txtEmail = curEmail
                }
            }
        },
        checkEmail(){
            if (this.reg.test(this.txtEmail)) {
                this.emailList.push({
                    email: this.txtEmail,
                    isSelected: false
                })
                this.txtEmail = ''
            }
        },
        deleteSelItem() {
            this.emailList = this.emailList.filter(item => !item.isSelected)
        },
        async sendInvite() {
            let vm = this
            for (const item of vm.emailList) {
                let param = {
                    email: item.email,
                    meeting_id: vm.meetingId
                }
                vm.$store.dispatch('sendInvite', param)
                    .then(() => {
                        this.$toast.success("Sent the invitation successfully!")
                        this.emailList = []
                    })
                    .catch((err) => {
                        if (err.response.data) {
                            let data= err.response.data
                            this.$toast.error(data.message)
                        } else {
                            this.$toast.error(err)
                        }
                    })
            }
        }
    },
}
</script>