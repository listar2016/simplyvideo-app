<template>
    <div>
        <div class="text-left" style="font-size:25px;width:200px;">
            <span class="fa fa-cog fa-spin"></span> Connecting{{ dots }}
        </div>
        <small v-if="retryConnecting" style="color: rgb(240,240,240)">
            It may take up to 60 seconds to setup instant meeting room
        </small>
    </div>
</template>

<script>
    export default {
        name: 'Connecting',
        components: {},
        props: {
            retryConnecting: Boolean, // Set this to true for instant meeting rooms and false for others
        },
        data() {
            return {
                dotsInterval: null,
                dots: '',
                addingDots: true,
            };
        },
        mounted() {
            this.dotsInterval = setInterval(() => {

                if (this.dots.length === 4) {
                    this.dots = '';
                    return;
                }

                this.dots += '.';
            }, 250);
        },
        destroyed() {
            clearInterval(this.dotsInterval);
        },
        methods: {}
    }
</script>
