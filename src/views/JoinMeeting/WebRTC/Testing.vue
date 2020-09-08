<template>
    <div class="testing-view">
        <video
                v-show="isCameraAllowedByBrowser && isCameraAllowedByUser"
                ref="cameraPreview"
                class="video"
        >
        </video>

        <div v-if="callType === 'audioonly'" class="heading-center d-flex justify-content-center align-items-center h-100">
            <h3 class="text-white-50">Audio only</h3>
        </div>

        <div class="test-block">
            <div class="test-body">
                <div v-if="!showPinInput">
                   <div class="top-bar">
                       <div class="action-cover">
                           <span v-if="isMicrophoneAllowedByBrowser" @click="toggleMicrophoneAllowedByUser"
                                 :class="{
                               'fa': true,
                               'fa-microphone': isMicrophoneAllowedByUser,
                               'fa-microphone-slash': !isMicrophoneAllowedByUser}">
                           </span>
                           <span v-if="isCameraAllowedByBrowser"
                                 @click="toggleCameraAllowedByUser"
                                 :class="{
                                     'fa': true,
                                     'fa-video': isCameraAllowedByUser,
                                     'fa-video-slash': !isCameraAllowedByUser,
                                 }">
                           </span>
                       </div>
                        <div v-if="isMicrophoneAllowedByBrowser" class="dropdown d-inline-block">
                            <a class="dropdown-toggle cursor-pointer" id="microphoneDropdown" data-toggle="dropdown">
                                Change microphone
                            </a>
                            <div class="dropdown-menu" aria-labelledby="microphoneDropdown">
                                <a v-for="microphone in microphones"
                                   :key="microphone.deviceId"
                                   @click.prevent="onMicrophoneChange(microphone)"
                                   :style="{cursor: 'pointer'}"
                                   class="dropdown-item">
                                    <b>
                                        {{ microphone.deviceId === selectedMicrophoneDeviceId ? '(Active)' : '' }}
                                    </b>
                                    {{ microphone.label }}
                                </a>
                            </div>
                        </div>
                        <div v-else class="ml-3">
                            Mic not allowed
                        </div>

                        <div v-if="isCameraAllowedByBrowser" class="dropdown d-inline-block ml-2">
                            <a class="dropdown-toggle cursor-pointer" id="cameraDropdown" data-toggle="dropdown">
                                Change camera
                            </a>
                            <div class="dropdown-menu" aria-labelledby="cameraDropdown">

                                <a v-for="camera in cameras"
                                   :key="camera.deviceId"
                                   @click.prevent="onCameraChange(camera)"
                                   :style="{cursor: 'pointer'}"
                                   class="dropdown-item">
                                    <b>
                                        {{ camera.deviceId === selectedCameraDeviceId ? '(Active)' : '' }}
                                    </b>
                                    {{ camera.label }}
                                </a>
                            </div>
                        </div>
                        <div v-else class="ml-3">
                            Camera not allowed
                        </div>
                    </div>

                    <div class="form-row">
                        <label class="label">Microphone level:</label>
                        
                        <div class="progress-line-cover">
                            <div
                                    class="progress-line"
                                    :style="{
                                    backgroundColor: 'green',
                                    width: microphoneVolume+'%',
                                    borderRadius: '10px'}">
                            </div>
                        </div>
                    </div>


                    <div v-if="isConnecting">
                        <connecting :retry-connecting="retryConnecting"></connecting>
                    </div>

                   <div v-else class="bottom-bar">
                        <button @click="onTestingComplete" class="btn btn-primary" type="button">Join</button>
                        <router-link :to="{name: previousRoute.name, params: previousRoute.params}">Go back</router-link>
                    </div>
                </div><!-- Testing options. -->

                <div v-else><!-- PIN -->

                    <form class="form-horizontal mx-auto"
                          @submit="joinMeeting"
                          style="max-width:400px;opacity:0.8;">
                        <div class="form-group">
                            <label class="w-100">
                                PIN
                                <input type="text" class="form-control mt-1" ref="pin" v-model="pin" required placeholder="Enter the room's PIN">
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
                </div>
            </div>
        </div>

        <div class="bottom-btn-cover">
            <button
                    @click.prevent="toggleTestSound"
                    class="cursor-pointer btn btn-sm btn-primary"
                    :disabled="isTestingCompleted"
            >
                {{ isTestSoundPlaying ? 'Stop playing' : 'Play test sound' }}
            </button>
            <audio ref="testSoundAudio">
                <source src="phone-ringing.mp3" type="audio/mpeg">
            </audio>
        </div>

    </div>
</template>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }

    .transparent-black {
        background-color: rgba(50,50,50,0.5);
        padding:10px;
        color:white;
        border-radius:15px;
    }
</style>

<script>
    import Connecting from "./Connecting";
    import EnumerateDevicesMixin from "../../../mixins/EnumerateDevicesMixin";

    export default {
        name: 'Testing',
        components: {
            Connecting,
        },
        mixins: [
            EnumerateDevicesMixin
        ],
        props: {
            isConnecting: Boolean,
            retryConnecting: Boolean,
            previousRoute: Object,
            showPinInput: Boolean,
            invalidPin: Boolean,
            callType: String,
        },
        watch: {
            showPinInput(val) {
                if (val) {
                    setTimeout(() => {
                        this.$refs.pin.focus();
                    }, 200);
                }
            }
        },
        data() {
            return {
                cameraStream: null,
                microphoneStream: null,
                isCameraAllowedByBrowser: false,
                isMicrophoneAllowedByBrowser: false,
                microphoneVolume: 0,
                microphoneVolumeCheckInterval: null,

                isTestSoundPlaying: false,

                isCameraAllowedByUser: true,
                isMicrophoneAllowedByUser: true,

                pin: '',
                isTestingCompleted: false
            };
        },
        mounted() {

            if (this.callType === 'video'){
                this.requestCameraAccess(
                    null,
                    this.requestMicrophoneAccess
                );
            }

            if (this.callType === 'audioonly'){
                this.requestMicrophoneAccess();
            }

            this.enumerateDevices();

            // Loop the test sound until it's not explicitly stopped by user:
            this.$refs.testSoundAudio.onended = () => {
                this.$refs.testSoundAudio.play();
            };
        },
        beforeDestroy() {
            let el = this.$refs.testSoundAudio;
            el.pause()
            this.stopCamera();
            this.stopMicrophone();
        },
        methods: {
            toggleMicrophoneAllowedByUser() {
                this.isMicrophoneAllowedByUser = !this.isMicrophoneAllowedByUser;

                this.isMicrophoneAllowedByUser ? this.requestMicrophoneAccess() : this.stopMicrophone();
            },
            toggleCameraAllowedByUser() {
                this.isCameraAllowedByUser = !this.isCameraAllowedByUser;

                this.isCameraAllowedByUser ? this.requestCameraAccess() : this.stopCamera();
            },
            toggleTestSound() {
                let el = this.$refs.testSoundAudio;
                this.isTestSoundPlaying = !this.isTestSoundPlaying;

                if (el.paused) {
                    el.play();
                    return;
                }

                console.log('Stopping test sound');
                el.pause();
                el.currentTime = 0;
            },
            stopCamera() {
                if (this.cameraStream) {
                    this.cameraStream.getTracks().forEach(track => track.stop());
                }

                this.selectedCameraDeviceId = this.cameras[0] ? this.cameras[0].deviceId : '';
            },
            stopMicrophone() {
                if (this.microphoneStream) {
                    this.microphoneStream.getTracks().forEach(track => track.stop());
                }

                if (this.microphoneVolumeCheckInterval) {
                    window.clearInterval(this.microphoneVolumeCheckInterval);
                }

                this.microphoneVolume = 0;
                this.selectedMicrophoneDeviceId = this.microphones[0] ? this.microphones[0].deviceId : '';
            },
            onMicrophoneChange(newMicrophone) {

                console.log('On change ', newMicrophone);
                this.stopMicrophone();

                this.isMicrophoneAllowedByUser = true;
                this.selectedMicrophoneDeviceId = newMicrophone.deviceId;

                this.requestMicrophoneAccess({
                    deviceId: this.selectedMicrophoneDeviceId
                });
            },
            onCameraChange(newCamera) {

                console.log('On change ', newCamera);
                this.stopCamera();

                this.isCameraAllowedByUser = true;
                this.selectedCameraDeviceId = newCamera.deviceId;

                this.requestCameraAccess({
                    deviceId: this.selectedCameraDeviceId
                });
            },
            requestCameraAccess(videoConstraints, callback) {

                videoConstraints = videoConstraints ? videoConstraints : true;

                navigator.mediaDevices.getUserMedia({video: videoConstraints})
                    .then((stream) => {
                        console.log('Camera allowed');
                        this.cameraStream = stream;
                        this.isCameraAllowedByBrowser = true;

                        let cameraPreview = this.$refs.cameraPreview;
                        cameraPreview.srcObject = stream;
                        cameraPreview.play();

                        if (callback) {
                            this.enumerateDevices();
                            callback();
                        }
                    })
                    .catch(() => {
                        console.log('Camera denied');

                        if (callback) {
                            callback();
                        }
                    });
            },
            requestMicrophoneAccess(audioConstraints) {

                audioConstraints = audioConstraints ? audioConstraints : true;

                navigator.mediaDevices.getUserMedia({audio: audioConstraints})
                    .then((stream) => {
                        console.log('Microphone allowed');
                        this.microphoneStream = stream;
                        this.isMicrophoneAllowedByBrowser = true;
                        this.monitorMicrophoneVolume(stream);

                        this.enumerateDevices();
                    })
                    .catch(() => {
                        console.log('Microphone denied');
                    });
            },
            monitorMicrophoneVolume(stream) {
                let audioContext = new AudioContext();
                let analyser = audioContext.createAnalyser();
                let microphone = audioContext.createMediaStreamSource(stream);

                analyser.fftSize = 1024;
                microphone.connect(analyser);

                this.microphoneVolumeCheckInterval = window.setInterval(() => {

                    let array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    let values = 0;

                    let length = array.length;
                    for (var i = 0; i < length; i++) {
                        values += (array[i]);
                    }

                    let volume = Math.round(values / length);
                    volume = volume <= 100 ? volume : 100;

                    this.microphoneVolume = volume;
                }, 50);
            },
            goBack() {
                this.$emit('go-back');
            },
            onTestingComplete() {
                let el = this.$refs.testSoundAudio;
                el.pause()
                this.isTestSoundPlaying = false
                this.isTestingCompleted = true
                this.$emit('testing-complete', {
                    isCameraAllowedByBrowser: this.isCameraAllowedByBrowser,
                    isMicrophoneAllowedByBrowser: this.isMicrophoneAllowedByBrowser,
                    cameraStream: this.cameraStream,
                    microphoneStream: this.microphoneStream,
                    isMicrophoneAllowedByUser: this.isMicrophoneAllowedByUser,
                    isCameraAllowedByUser: this.isCameraAllowedByUser,
                    selectedCameraDeviceId: this.selectedCameraDeviceId,
                    selectedMicrophoneDeviceId: this.selectedMicrophoneDeviceId,
                });
            },
            joinMeeting() {
                let el = this.$refs.testSoundAudio;
                el.pause()
                this.isTestSoundPlaying = false
                this.isTestingCompleted = true
                this.$emit('continue-connect-with-pin', this.pin)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~bootstrap/scss/functions';
    @import '~bootstrap/scss/variables';
    @import '~bootstrap/scss/mixins';

    .testing-view {
        background-color: rgb(60,60,60);
        height: 100%;
    }

    .video {
        margin: 0 auto;
        height: 100%;
        display: flex;
        max-width: 100%;
    }

    .test-block {
        position: absolute;
        max-width: 450px;
        margin: 30px auto 30px auto;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        background-color: rgba(50,50,50,.5);
        padding: 15px;
        color: #fff;
        border-radius: 15px;

        @include media-breakpoint-down(md) {
            margin-bottom: 70px;
        }

        @include media-breakpoint-down(sm) {
            left: 30px;
            right: 30px;
            max-width: 100%;
        }

        .test-body {
            width: 100%;
        }
    }

    .top-bar {
        display: flex;
        align-items: center;
        justify-content: center;

        @include media-breakpoint-down(sm) {
            flex-direction: column;
        }

        .action-cover {
            display: flex;
            align-items: center;
            margin-right: auto;

            @include media-breakpoint-down(sm) {
                margin: 0 auto 5px auto;
            }

            .fa {
                font-size: 30px;

                &:last-child {
                    margin-left: 15px;
                }
            }
        }

        .dropdown-menu {
            @include media-breakpoint-down(sm) {
                max-width: 100%;

                .dropdown-item {
                    white-space: inherit;
                }
            }
        }
    }

    .bottom-bar {
        a {
            margin-left: 10px;
        }
    }

    .form-row {
        display: flex;
        align-items: center;
        margin-top: 10px;

        .label {
            margin: 0;
        }
    }

    .progress-line-cover {
        display: flex;
        height: 15px;
        background-color: lightgray;
        border-radius: 10px;
        width: 100%;
        margin: 10px 0;
    }

    .bottom-btn-cover {
        position: absolute;
        bottom: 30px;
        left: 30px;
        display: flex;

        @include media-breakpoint-down(md) {
            left: 0;
            right: 0;
            bottom: 15px;
            margin: auto;
            justify-content: center;
        }
    }
</style>
