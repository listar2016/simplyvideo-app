<template>
    <div class="dropdown d-inline-block table-action" style="cursor:pointer;">
        <slot>
            <a class="dropdown-toggle" :id="'sendInvites-' + meeting.id" data-toggle="dropdown">
                <img alt="" src="@/assets/img/icons/icon-plus-primary.svg" class="mr-1"/> Send Invites
            </a>
        </slot>
        <div class="dropdown-menu" :aria-labelledby="'sendInvites-' + meeting.id">

            <a class="dropdown-item"
               :href="meeting.calendar.google"
               target="_blank">
                Google Calendar
            </a>

            <a class="dropdown-item"
               :href="meeting.calendar.ics"
               :download="icsFilename">
                Download ICS
            </a>

            <a class="dropdown-item"
               @click="copyTextInvite">
                Copy Text invite
            </a>

            <a class="dropdown-item"
               @click="copyUrl">
                Copy URL
            </a>

            <textarea ref="txtInvite" class="position-absolute" type="text"
                      :value="textInvite"
                      style="opacity: 0;z-index:-1;left:-9999px;"></textarea>

            <input ref="txtUrl" class="position-absolute" type="text" :value="url"
                   style="opacity:0;z-index:-1;left:-9999px;">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            meeting: Object,
        },
        data() {
            return {};
        },
        computed: {
            url() {

                if (!this.meeting.meeting_room) {
                    return '';
                }

                let a = document.createElement('a');
                a.href = this.$router.resolve({
                    name: 'welcome-guest',
                    params: {webrtcAlias: this.meeting.meeting_room.webrtc.alias}
                }).href;
                return a.href;
            },
            textInvite() {
                let format = 'YYYY-MM-DD HH:mm';

                return 'Subject: ' + this.meeting.subject
                    + '\n'
                    + 'Time: ' + this.$moment(this.meeting.starts_at, format).format('DD-MM-YYYY HH:mm')
                    + ' - ' + this.$moment(this.meeting.ends_at, format).format('HH:mm')
                    + '\n'
                    + 'Description: '
                    + '\n'
                    + this.meeting.description
                    + '\n'
                    + '\n'
                    + 'Direct URL: ' + this.url
                    ;
            },
            icsFilename() {
                return 'SimplyVideo Invite ' + this.meeting.id;
            }
        },
        mounted() {
        },
        methods: {
            copyUrl() {
                this.copyToClipboard(
                    this.$refs.txtUrl
                );
            },
            copyTextInvite() {
                this.copyToClipboard(
                    this.$refs.txtInvite
                );
            },
            copyToClipboard(domElement) {

                domElement.setAttribute('type', 'text');
                domElement.select();

                try {
                    let successful = document.execCommand('copy');
                    if (successful) {
                        this.$toast.success('Copied successfully')
                    } else {
                        this.$toast.error('Oops, unable to copy')
                    }
                } catch (err) {
                    this.$toast.error('Oops, unable to copy')
                }

                window.getSelection().removeAllRanges()
            },
        },
    }
</script>