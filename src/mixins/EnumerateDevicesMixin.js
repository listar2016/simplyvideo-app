export default {
    data() {
        return {
            microphones: [],
            cameras: [],
            speakers: [],

            selectedMicrophoneDeviceId: '',
            selectedCameraDeviceId: '',
        };
    },
    methods: {
        enumerateDevices(callback) {
            navigator.mediaDevices.enumerateDevices()
                .then((list) => {

                    let microphones = list.filter((device) => {
                        return device.kind === 'audioinput';
                    }).map((device, index) => {
                        return {
                            kind: device.kind,
                            label: device.label || ('Microphone #' + (index + 1)),
                            deviceId: device.deviceId,
                        };
                    });

                    let cameras = list.filter((device) => {
                        return device.kind === 'videoinput';
                    }).map((device, index) => {
                        return {
                            kind: device.kind,
                            label: device.label || ('Camera #' + (index + 1)),
                            deviceId: device.deviceId,
                        };
                    });

                    let speakers = list.filter((device) => {
                        return device.kind === 'audiooutput';
                    }).map((device, index) => {
                        return {
                            kind: device.kind,
                            label: device.label || ('Audio output #' + (index + 1)),
                            deviceId: device.deviceId,
                        };
                    });

                    this.microphones = microphones;
                    this.cameras = cameras;
                    this.speakers = speakers;

                    if (!this.selectedMicrophoneDeviceId) {
                        this.selectedMicrophoneDeviceId = microphones[0] ? microphones[0].deviceId : '';
                    }

                    if (!this.selectedCameraDeviceId) {
                        this.selectedCameraDeviceId = cameras[0] ? cameras[0].deviceId : '';
                        this.$store.commit('call/setCamera', this.selectedCameraDeviceId)
                    }

                    if (callback) {
                        callback();
                    }
                });
        },
    }
};
