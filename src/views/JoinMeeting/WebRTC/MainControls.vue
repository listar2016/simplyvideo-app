<template>
    <div>
        <!--
        <span>Joined as {{ isHost ? 'Host' : 'Guest' }}</span>
        <br>
        -->

        <button @click="$emit('disconnect-me')">Disconnect</button>

        <span v-if="isMicrophoneAllowedByBrowser" class="ml-2">
            <button v-if="isOutgoingAudioSupportedByCallType" @click="$emit('toggle-my-audio')">
                {{ isAudioLocallyMuted ? 'Enable audio' : 'Disable audio' }}
            </button>
            <span v-else>
                <!--
                Outgoing audio not supported
                -->
            </span>
        </span>
        <span v-else class="ml-2">
            Access to mic denied
        </span>

        <span v-if="isCameraAllowedByBrowser" class="ml-2">
            <button v-if="isOutgoingVideoSupportedByCallType" @click="$emit('toggle-my-video')">
                {{ isVideoLocallyMuted ? 'Enable video' : 'Disable video' }}
            </button>
            <span v-else>
                <!--
                Outgoing video not supported
                -->
            </span>
        </span>
        <span v-else class="ml-2">
            Access to camera denied
        </span>
    </div>
</template>

<script>
    export default {
        name: 'MainControls',
        components: {},
        props: {
            isHost: Boolean,

            isMicrophoneAllowedByBrowser: Boolean,
            isCameraAllowedByBrowser: Boolean,

            isOutgoingAudioSupportedByCallType: Boolean,
            isOutgoingVideoSupportedByCallType: Boolean,

            isAudioLocallyMuted: Boolean,
            isVideoLocallyMuted: Boolean,
        },
        data() {
            return {};
        },
        methods: {}
    }
</script>
