<template>
    <div class="h-100" style="min-height: 350px;">
        <div class="h-100" v-show="isTesting || isConnecting"><!-- v-show wont work on <testing> directly because it has d-flex class internally -->
            <testing
                v-on:testing-complete="onTestingComplete"
                :previous-route="previousRoute"
                :is-connecting="isConnecting"
                :retry-connecting="retryConnecting"
            ></testing>
        </div>

        <!--
        <connecting v-if="isConnecting" :retry-connecting="retryConnecting"></connecting>
        -->

        <form class="form-horizontal mx-auto" 
            @submit="continueConnectWithPin" 
            v-show="showPinInput"
            style="max-width:400px;">
            <h5 class="my-5"> Join a meeting</h5>
            <div class="form-group">
                <label class="w-100">
                    PIN
                    <input type="text" class="form-control" ref="pin" v-model="pin" required placeholder="Enter the room's PIN">
                </label>
            </div>

            <div v-show="invalidPin" class="alert alert-warning" role="alert">
                Invalid PIN
            </div>

            <div class="text-center">
                <div class="position-relative">
                    <button class="btn btn-primary" type="submit">Join</button>
                    <router-link
                            :to="{name: previousRoute.name, params: previousRoute.params}"
                            class="position-absolute pl-2"
                            style="top:12px;"
                    >
                        Go back
                    </router-link>
                </div>
            </div>
        </form>

        <div class="row h-100" v-show="connected">
            <div class="col-2">
                <participants
                        :is-host="isHost"
                        :my-uuid="myUuid"
                        :participants="participants"

                        v-on:toggle-participant-mute="toggleParticipantMute"
                        v-on:disconnect-participant="disconnectParticipant"
                        v-on:set-participant-to-guest="setParticipantToGuest"
                        v-on:set-participant-to-host="setParticipantToHost"
                ></participants>
            </div>
            <div :class="videoColClasses()">
                <video id="video" src="" style="width:100%;"
                       v-show="isIncomingVideoSupportedByCallType">
                </video>

                <div v-show="!isIncomingVideoSupportedByCallType" class="text-center">
                    Audio only
                </div>

                <div class="position-absolute text-center" style="bottom:20px;width:100%;">
                    <main-controls
                            :is-host="isHost"

                            :is-microphone-allowed-by-browser="isMicrophoneAllowedByBrowser"
                            :is-camera-allowed-by-browser="isCameraAllowedByBrowser"

                            :is-outgoing-audio-supported-by-call-type="isOutgoingAudioSupportedByCallType"
                            :is-outgoing-video-supported-by-call-type="isOutgoingVideoSupportedByCallType"

                            :is-audio-locally-muted="isAudioLocallyMuted"
                            :is-video-locally-muted="isVideoLocallyMuted"

                            v-on:disconnect-me="disconnectMe"
                            v-on:toggle-my-audio="toggleMyAudio"
                            v-on:toggle-my-video="toggleMyVideo"
                    ></main-controls>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Testing from '@/views/JoinMeeting/WebRTC/Testing.vue'
    // import Connecting from '@/views/JoinMeeting/WebRTC/Connecting.vue'
    import MainControls from '@/views/JoinMeeting/WebRTC/MainControls.vue'
    import Participants from '@/views/JoinMeeting/WebRTC/Participants.vue'
    import {mapState} from "vuex";
    import Vue from "vue";

    export default {
        name: 'Call',
        components: {
            Testing,
            // Connecting,
            MainControls,
            Participants
        },
        props: {
            webrtcAlias: String,
            displayName: String,
            callType: String,
            retryConnecting: Boolean, // Set this to true for instant meeting rooms and false for others
            conferencingNode: String,
            previousRoute: Object,
        },
        data() {
            return {
                isTesting: true,
                pexip: null,
                pin: '',
                showPinInput: false,
                invalidPin: false,
                isConnecting: false,
                connected: false,
                myUuid: null,
                participants: [],
                recordingParticipantName: '',
                isHost: false,

                isCameraAllowedByBrowser: false,
                isMicrophoneAllowedByBrowser: false,

                isAudioLocallyMuted: false,
                isVideoLocallyMuted: false,

                isIncomingAudioSupportedByCallType: false,
                isOutgoingAudioSupportedByCallType: false,
                isIncomingVideoSupportedByCallType: false,
                isOutgoingVideoSupportedByCallType: false,

                // Instant meeting rooms are not available immediately after they're
                // created. It can take up to 30s to reach them. So we will retry this operation
                // a few times
                connectionAttempts: 0,
            };
        },
        computed: {
            ...mapState({
                isLoggedIn: state => !!state.auth.token,
            })
        },
        mounted() {

            if (!this.webrtcAlias) {
                let routeName = this.isLoggedIn ? 'dashboard' : 'join-meeting';
                this.$router.push({name: routeName});
            }

            console.log('Mounted Call. Enabling fullscreen.');
            this.$emit('enable-fullscreen');
        },
        destroyed() {
            console.log('Destroyed Call. Disabling fullscreen.');
            this.$emit('disable-fullscreen');
        },
        methods: {
            makeCall() {
                this.isTesting = false;
                this.setIncomingAndOutgoingMedia();
                this.isConnecting = true;

                this.initiatePexip();
                this.pexip.makeCall(
                    this.conferencingNode,
                    this.webrtcAlias,
                    this.displayName,
                    null, // bandwidth
                    this.callType
                );
            },
            initiatePexip() {
                // eslint-disable-next-line
                this.pexip = new PexRTC();
                this.pexip.onSetup = this.onSetup;
                this.pexip.onConnect = this.onConnect;
                this.pexip.onDisconnect = this.onDisconnect;
                this.pexip.onParticipantCreate = this.onParticipantCreate;
                this.pexip.onParticipantUpdate = this.onParticipantUpdate;
                this.pexip.onParticipantDelete = this.onParticipantDelete;
                this.pexip.onRosterList = this.onRosterList;
                this.pexip.onChatMessage = this.onChatMessage;
                this.pexip.onError = this.onError;

                if (this.isOutgoingVideoSupportedByCallType) {
                    this.pexip.video_source = null;
                    // https://docs.pexip.com/api_client/api_pexrtc.htm
                    // null: default sources
                    // false: do not request
                } else {
                    this.pexip.video_source = false;
                }
            },
            setIncomingAndOutgoingMedia() {
                if (this.callType === 'video') {
                    this.isOutgoingAudioSupportedByCallType = true;
                    this.isIncomingAudioSupportedByCallType = true;
                    this.isOutgoingVideoSupportedByCallType = true;
                    this.isIncomingVideoSupportedByCallType = true;
                }

                if (this.callType === 'audioonly') {
                    this.isOutgoingAudioSupportedByCallType = true;
                    this.isIncomingAudioSupportedByCallType = true;
                    this.isOutgoingVideoSupportedByCallType = false;
                    this.isIncomingVideoSupportedByCallType = false;
                }

                if (!this.isCameraAllowedByBrowser) {
                    this.isOutgoingVideoSupportedByCallType = false;
                }
            },
            onSetup(stream, pinStatus, conferenceExtension) {
                console.log('onSetup', stream, pinStatus, conferenceExtension);
                if (pinStatus === 'required' && !this.pin.length) {
                    this.askPin();
                } else {
                    this.pexip.connect(this.pin);
                }
            },
            askPin() {
                this.isConnecting = false;
                this.showPinInput = true;
                setTimeout(() => {
                    this.$refs.pin.focus();
                }, 200);
            },
            continueConnectWithPin(e) {
                e.preventDefault();
                this.showPinInput = false;
                this.makeCall();
            },
            onConnect(stream) {
                this.isConnecting = false;
                this.connected = true;
                this.pin = '';
                this.myUuid = this.pexip.uuid;
                this.isHost = this.pexip.role === 'HOST';

                let video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
            },
            disconnectMe() {
                this.pexip.disconnect();
                this.participants = [];
                this.connected = false;
                if (this.isLoggedIn) {
                    this.$router.push({
                        name: 'dashboard',
                        params: {
                            reloadRequired: true, // Otherwise Pexip doesn't release camera/mic and the light stays on
                        }
                    });
                } else {
                    this.$router.push({name: 'join-meeting'});
                }
            },
            disconnectParticipant(participant) {

                if (participant.uuid === this.myUuid) {
                    this.disconnectMe();
                    return;
                }

                this.pexip.disconnectParticipant(participant.uuid);
            },
            toggleMyAudio() {
                let newValue = !this.isAudioLocallyMuted;
                this.pexip.muteAudio(newValue);

                this.isAudioLocallyMuted = newValue;
            },
            toggleMyVideo() {
                let newValue = !this.isVideoLocallyMuted;
                this.pexip.muteVideo(newValue);

                this.isVideoLocallyMuted = newValue;
            },
            toggleParticipantMute(participant) {
                let muted = !(participant.is_muted === 'YES');
                this.pexip.setParticipantMute(participant.uuid, muted);
            },
            setParticipantToHost(participant) {
                this.pexip.setRole(participant.uuid, 'chair');
            },
            setParticipantToGuest(participant) {
                this.pexip.setRole(participant.uuid, 'guest');
            },
            onChatMessage(message) {
                console.log('onChatMessage', message);

                // let participantName = message.origin;
                // let messageText = message.payload;
                // let output = participantName + ': ' + messageText;
                // addChatMessageToList(output);
            },
            onError(error) {

                // Instant meeting rooms are not available immediately after they're
                // created. It can take up to 30s to reach them. So we will retry this operation
                // a few times
                let notFound = error.indexOf('Neither conference nor gateway found') !== -1;
                let gatewayFailed = error.indexOf('Gateway dial out failed') !== -1;

                if ((notFound || gatewayFailed) && this.retryConnecting && this.connectionAttempts <= 15) {
                    console.log('Trying the call again!');
                    setTimeout(this.makeCall, 4000);
                    this.connectionAttempts++;
                    return;
                }

                this.isConnecting = false;
                if (error.indexOf('Invalid PIN') !== -1) {
                    this.showPinInput = true;
                    this.invalidPin = true;
                    this.pin = '';
                } else {
                    this.redirectBack(error);
                }
            },
            onDisconnect(msg) {
                let callRejected = msg.indexOf('Call rejected') !== -1;
                let gatewayFailed = msg.indexOf('Gateway dial out failed') !== -1;
                if ((callRejected || gatewayFailed) && this.retryConnecting && this.connectionAttempts <= 15) {
                    console.log('Trying the call again!');
                    setTimeout(this.makeCall, 4000);
                    this.connectionAttempts++;
                    return;
                }

                this.isConnecting = false;
                this.redirectBack(msg);
            },
            onRosterList(participants) {
                this.participants = participants;
            },
            onParticipantCreate(participant) {
                this.participants.push(participant);
            },
            onParticipantUpdate(updatedParticipant) {
                let index = this.participants.findIndex((participant) => {
                    return participant.uuid === updatedParticipant.uuid;
                });

                if (index === -1) {
                    this.onParticipantCreate(updatedParticipant);
                    return;
                }

                this.$set(this.participants, index, updatedParticipant);
            },
            onParticipantDelete(deletedParticipant) {
                let index = this.participants.findIndex((participant) => {
                    return participant.uuid === deletedParticipant.uuid;
                });

                this.participants.splice(index, 1);
            },
            onTestingComplete(isCameraAllowedByBrowser, isMicrophoneAllowedByBrowser) {
                this.isTesting = false;
                this.isCameraAllowedByBrowser = isCameraAllowedByBrowser;
                this.isMicrophoneAllowedByBrowser = isMicrophoneAllowedByBrowser;

                console.log('Testing complete!');
                this.makeCall();
            },

            redirectBack(error) {

                let params = Vue.util.extend({}, this.previousRoute.params);
                params.error = error;

                this.$router.push({
                    name: this.previousRoute.name,
                    params: params,
                });
            },

            videoColClasses() {
                if (!this.isIncomingVideoSupportedByCallType) {
                    return ['col-10', 'p-0', 'd-flex', 'align-items-center', 'justify-content-center', 'border-left'];
                }

                return ['col-10', 'p-0'];
            },

            sendChatMessage() {
                //let input = document.getElementById('chatMessageInput');
                let messageText = 'Test message';
                this.pexip.sendChatMessage(messageText);
                // addChatMessageToList('Me: ' + input.value);
                //input.value = '';
            },

            // Recorder gets added as another participant
            // Instead of talking/listening like normal human would,
            // it will record the stream and send it to S3
            startRecording() {
                console.log('startRecording');

                /*
                // @TODO use "Profile -> Recordings -> Start recording" POST API to retrieve new instance of recording. In the response, look for "rtmp" and "recording_participant_name" keys and use it here:
                let rtmp = 'rtmp://rec.simplyvideo.net/live/recordings/cfe7f6c13bdad37f';
                recordingParticipantName = 'rec.simplyvideo.net';
                pexip.dialOut(rtmp, 'rtmp', "guest");
                */
            },

            stopRecording() {

                console.log('stopRecording');
                /*
                participants.forEach((participant) => {
                    if (participant.display_name === recordingParticipantName) {
                        pexip.disconnectParticipant(participant.uuid);
                    }
                });
                */
                //
            },
        }
    }
</script>
