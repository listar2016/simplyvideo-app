<template>
    <div class="d-flex h-100 justify-content-center">
        <div class="w-100">
            <div class="row mx-0">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-xl-9 mx-auto">

                            <form class="mt-6 mt-md-4 form-horizontal" @submit="showWelcomePage">
                                <div class="form-group">
                                    <label class="w-100">
                                        Meeting ID
                                        <input type="text" class="form-control" v-model="webrtcAlias"
                                               ref="webrtcAlias" required>
                                    </label>
                                </div>

                                <div v-show="error" class="alert alert-warning" role="alert">
                                    {{ error }}
                                </div>

                                <div class="text-center">
                                    <div class="position-relative">
                                        <button class="btn btn-primary" type="submit">Next</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!--
                        <div class="col-xl-9 mx-auto">
                            <hr/>
                        </div>
                        -->
                    </div>
                </div>
                <div class="col-6 right-side-image d-none d-md-block">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'JoinMeeting',
        components: {},
        props: {
            error: String,
        },
        data() {
            return {
                webrtcAlias: '',
            };
        },
        mounted() {
            this.$emit('disable-fullscreen')
            window.setTimeout(() => {
                this.$refs.webrtcAlias.focus();
            }, 400);
        },
        methods: {
            showWelcomePage(e) {
                e.preventDefault();

                this.$router.push({
                    name: 'welcome-guest',
                    params: {
                        webrtcAlias: this.webrtcAlias,
                        previousRoute: {
                            name: 'join-meeting',
                            header: 'Join meeting',
                            params: {}
                        },
                    }
                });
            },
        }
    }
</script>
