export default {
    methods: {
        webrtcAliasDirectLink(webrtcAlias) {

            let a = document.createElement('a');
            a.href = this.$router.resolve({
                name: 'welcome-guest',
                params: {
                    webrtcAlias: webrtcAlias
                }
            }).href;
            return a.href;
        },
        meetingRoomDirectLink(webrtcAlias) {
            // return this.webrtcAliasDirectLink(meetingRoom.webrtc.alias);
            let a = document.createElement('a');
            a.href = this.$router.resolve({
                name: 'host',
                params: {
                    spWebrtcAlias: webrtcAlias
                }
            }).href;
            return a.href;
        },
        meetingDirectLink(meeting) {
            return this.webrtcAliasDirectLink(meeting.meeting_room.webrtc.alias);
        },
    }
};
