<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Personal</a></li>
                    <li class="breadcrumb-item active">Branding</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>Personal branding</h1>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Brand info</h3>
                                </div>
                                <div v-if="isPaidPlan" class="section-panel-header-action">
                                    <a v-if="statusEdit" href="#" class="btn btn-link" @click.prevent="discardEdit"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusEdit = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
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
                                        <div class="col-12">
                                            <h6 class="mb-1">What type of calls do you have?</h6>
                                            <div class="form-group">
                                                <div class="custom-checkbox">
                                                    <input 
                                                        id="type-meeting"
                                                        type="checkbox"
                                                        :checked="call_type==='meetings'"
                                                        @click="changeCallType('meetings')"
                                                        :disabled="!statusEdit"
                                                    />
                                                    <label for="type-meeting">Meetings</label>
                                                </div>
                                                <div class="custom-checkbox">
                                                    <input 
                                                        id="type-conference"
                                                        type="checkbox"
                                                        :checked="call_type==='conferences'"
                                                        @click="changeCallType('conferences')"
                                                        :disabled="!statusEdit"
                                                    />
                                                    <label for="type-conference">Conferences</label>
                                                </div>
                                            </div>    
                                            <div class="form-group">
                                                <div class="custom-checkbox mb-1">
                                                    <input 
                                                        id="type-other"
                                                        type="checkbox"
                                                        :checked="call_type==='other'"
                                                        @click="changeCallType('other')"
                                                        :disabled="!statusEdit"
                                                    />
                                                    <label for="type-other">Other</label>
                                                </div>
                                                <input 
                                                    v-if="call_type === 'other'"
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="E.g. consulting room"
                                                    v-model="custom_call_type"
                                                    :disabled="!statusEdit"/>
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
                                    <h3>Visual materials</h3>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row align-items-center">
                                        <div class="col-lg flex-lg-grow-0 mb-1 mb-lg-0">
                                            <div class="form-group-upload">
                                                <label for="logo" v-if="logo" class="real-image">
                                                    <span>
                                                        <img alt="Upload" :src="logo" />
                                                    </span>
                                                </label>
                                                <label for="logo" v-else class="place-holder">
                                                    <span class="p-3">
                                                        <img alt="Upload" src="@/assets/img/icons/icon-upload.svg" />
                                                        <span>Drag &amp; Drop file here</span>
                                                    </span>
                                                </label>
                                                <input 
                                                    name="logo" 
                                                    id="logo" 
                                                    type="file" 
                                                    :disabled="!statusEdit"
                                                    @change="onFileSelected"/>
                                            </div>
                                        </div>
                                        <div class="col-lg">
                                            <div class="form-group-logo-content">
                                                <h4>Logo</h4>
                                                <p>
                                                    Visible on the welcome screen for all meetings, during invite process and other places.
                                                </p>
                                                <label v-if="logo && statusEdit" class="btn btn-outline" @click.prevent="confirmDeleteImage('logo')"><i class="far fa-trash-alt text-danger"/></label>
                                                <label v-if="statusEdit" for="logo" class="btn btn-outline">Choose</label>
                                            </div>
                                            <div v-if="statusEdit">
                                                <button type="submit" class="btn btn-md btn-primary float-right" @click.prevent="updatePersonalBrand()">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <confirm-dialog
            v-if="isShowConfirmDialog"
            title="Are you sure you want to delete this image?"
            description="You will not be able to recover it later"
            @no="cancelDeleteImage"
            @yes="deleteImage">
        </confirm-dialog>
    </main>

</template>
<script>
import {mapState} from 'vuex'
import PlanMixin from "../../mixins/PlanMixin";
import ConfirmDialog from '@/components/ConfirmDialog'
import axios from "axios";
export default {
    mixins: [PlanMixin],
    components: {
        ConfirmDialog
    },
    data() {
        return {
            statusEdit: false,
            logo: '',
            selectedFile: '',
            errors: [],
            call_type: '',
            custom_call_type: '',
            isShowConfirmDialog: false,
            imageToBeDeleted: '',
        }
    },
    computed: {
        ...mapState({
            brand: state => state.auth.personal_brand
        })
    },
    created() {
        this.$store.dispatch('getPersonalBrand')
            .then(() => {
                this.initBrand()
            })
    },
    methods: {
        initBrand() {
            this.logo = this.brand.logo
            this.selectedFile = ''
            this.call_type = this.brand.call_type
            this.custom_call_type = this.brand.custom_call_type
        },
        discardEdit() {
            this.statusEdit = false
            this.initBrand()
        },
        updatePersonalBrand() {
            let vm = this
            let param = new FormData()
            vm.errors = []
            param.append('call_type', vm.call_type)
            param.append('custom_call_type', vm.custom_call_type)
            if (vm.selectedFile) {
                param.append('logo', vm.selectedFile, vm.selectedFile ? vm.selectedFile.name : '')
            }
            vm.$store.dispatch('updatePersonalBrand', param)
                .then(() => {
                    vm.$store.dispatch('getUserProfile')
                    vm.$toast.success("Brand updated successfully!")
                    vm.statusEdit = false
                    vm.selectedFile = ''
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
        },
        confirmDeleteImage(image) {
            this.imageToBeDeleted = image;
            this.isShowConfirmDialog = true;
        },
        cancelDeleteImage() {
            this.isShowConfirmDialog = false;
            this.imageToBeDeleted = '';
        },
        deleteImage() {
            this.$store.dispatch('setLoadingStatus', 'loading');
            axios({ url: '/personal-brand-image/'+this.imageToBeDeleted, method: 'DELETE' })
                .then(() => {
                    this.$store.dispatch('setLoadingStatus', '');
                    this.$store.dispatch('getUserProfile');
                    this.$store.dispatch('getPersonalBrand')
                        .then(() => {
                            this.isShowConfirmDialog = false;
                            this.initBrand();
                            this.$toast.success('Image deleted');
                        });
                })
                .catch(err => {
                    this.$store.dispatch('setLoadingStatus', '');
                    console.log(err);
                    this.$toast.error('Error');
                });
        },
        onFileSelected(event) {
            console.log('change...')
            this.selectedFile = event.target.files[0]
            this.logo = URL.createObjectURL(this.selectedFile)
        },
        changeCallType(curType) {
            if (this.call_type === curType) {
                this.call_type = ''
            } else {
                this.call_type = curType
            }

            if (this.call_type !== 'other') {
                this.custom_call_type = ''
            }
        }
    }
}
</script>