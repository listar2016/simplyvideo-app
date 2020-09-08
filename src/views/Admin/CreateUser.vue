<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                    <li class="breadcrumb-item active">Create new user</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'user-management'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <div class="section-header-title-group">
                            <h1>Create new user</h1>
                            <p>Here you can create new users, set their role, plan and optional extras.</p>
                        </div>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-xl-9">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Add user by their email</h3>
                                </div>
                                <!--
                                <div class="section-panel-header-action">
                                    <a href="#" class="btn btn-link"><img alt="" src="@/assets/img/icons/icon-plus-primary.svg" />Quick upload</a>
                                </div>
                                -->
                            </div>
                            <div class="section-panel-body">
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
                                    <hr/>
                                    <button 
                                        type="button" 
                                        data-delete="users" 
                                        class="btn btn-link" 
                                        @click="deleteSelItem()"
                                        v-if="emailList.filter(item => item.isSelected).length > 0">
                                        <img alt="" src="@/assets/img/icons/icon-trash-primary.svg" />
                                        Delete selected emails
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl mt-2 mt-xl-0">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Pick a user plan</h3>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <div class="plan-option" v-for="plan in planList" :key="plan.id" :class="{'is-checked': curPlanId === plan.id }">
                                    <div class="plan-option-header">
                                        <a href="#"><i class="far fa-arrow-circle-left"></i></a>
                                        <span data-trigger="expandable" @click="slideToggle(`plan-${plan.id}`)" :ref="`span-plan-${plan.id}`">{{ plan.name }}</span>
                                        <div v-if="isPlanLevelAtLeast(plan.id)" class="plan-option-checkbox">
                                            <input
                                            :id="`check-plan-${plan.id}`"
                                            type="checkbox"
                                            @change="setCurrentPlan(plan.id, $event)"
                                            :checked="curPlanId === plan.id"/>
                                            <label :for="`check-plan-${plan.id}`"></label>
                                        </div>
                                        <div v-else class="plan-option-checkbox">
                                            <input
                                                :id="`check-plan-${plan.id}`"
                                                type="checkbox"
                                                @click.prevent="$emit('show-premium-feature-popup')"
                                            />
                                            <label :for="`check-plan-${plan.id}`"></label>
                                        </div>
                                    </div>
                                    <div class="expandable" :ref="`div-plan-${plan.id}`">
                                        <div class="expandable-content">
                                            <p>
                                                {{ plan.description }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!--
                                <div class="custom-checkbox-slide set-plan-for-all mt-1" :class="{'custom-checkbox-slide-disabled': emailList.length === 0}">
                                    <input id="check-allusers" name="all_users" type="checkbox" :checked="isAllUsers" @change="isAllUsers = !isAllUsers"/>
                                    <label for="check-allusers">Set one plan for all users</label>
                                </div>
                                -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <hr/>
                        <div class="text-right">
                            <a href="#" class="btn btn-primary" @click.prevent="addUser()"><img alt="Add user" src="@/assets/img/icons/icon-plus.svg" /> Add user</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
import { mapState } from 'vuex'
import PlanMixin from "../../mixins/PlanMixin";
export default {
    mixins: [PlanMixin],
    data() {
        return {
            curPlanId: '',
            isAllUsers: false,
            txtEmail: '',
            emailList:[],
            // eslint-disable-next-line
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    computed: {
        ...mapState({
            planList: state => state.billingPlan.plans
        })
    },
    created() {
        if (this.authUserLoadedAndCannotAccessAdminFeatures) {
            this.$router.push({name: 'dashboard'});
        }
    },
    watch: {
        
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
        addUser() {
            if (!this.curPlanId) {
                this.$toast.error('Please select one plan!')
                return
            }
            if (this.emailList.length===0) {
                this.$toast.error('Please input one email at least!')
                return
            }
            console.log(this.isAllUsers)
            let realEmailList = []
            this.emailList.forEach( item => {
                realEmailList.push( item.email)
            })
            let param = {
                plan_id: this.curPlanId,
                emails: realEmailList
            }
            console.log(param)
            this.$store.dispatch('addSubUsers', param)
                .then(() => {
                    this.emailList = [];
                    this.$store.dispatch('getSubUsers').then(() => {
                        this.$router.push({name: 'user-management'});
                        this.$toast.success("Invites sent successfully");
                    })
                })
                .catch(err => {
                    if (err.response.data) {
                        let data= err.response.data
                        this.$toast.error(data.message)
                        console.log(data.message)
                        if (err.response.status === 422) {
                            if (data.errors) {
                                for (let messages of Object.values(data.errors)) {
                                    for (let msg of messages) {
                                        this.$toast.error(msg) 
                                        console.log(msg)
                                    }
                                }
                            }
                        }
                    } else {
                        this.$toast.error(err)
                    }
                })  
        },
        setCurrentPlan(id, event) {
            if (event.target.checked){
                this.curPlanId = id
            } else {
                this.curPlanId = ''
            }
        },
        slideToggle(id) {
            let expandWidget = this.$refs[`div-${id}`][0]
            let expandSpan = this.$refs[`span-${id}`][0]
            if (expandSpan.classList.value){
                expandSpan.classList = []
                expandWidget.style.maxHeight = ''
            } else {
                expandSpan.classList = ['is-active']
                expandWidget.style.maxHeight = expandWidget.scrollHeight + 'px'
            }
        },
        deleteSelItem() {
            this.emailList = this.emailList.filter(item => !item.isSelected)
        }
    }
}
</script>