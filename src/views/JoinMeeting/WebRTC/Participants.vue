<template>
    <div class="px-2 pt-2">
        <div v-for="participant in participants" :key="participant.id" class="border-bottom row participant-row">

            <div class="col-sm-10">
                <span>
                    {{ participant.display_name }} {{ participant.uuid === myUuid ? '(you)' : '' }}
                    <!--
                    {{ isParticipantHost(participant) ? '(host)' : '(guest)' }}
                    -->
                </span>
            </div>

            <div class="col-sm-2 p-0 text-right">
                <span v-if="isHost">
                    <span
                            @click="$emit('toggle-participant-mute', participant)"
                            :class="muteClasses(participant)"
                            :title="isParticipantMuted(participant) ? 'Unmute' : 'Mute'"
                    ></span>
                    <span
                            @click="$emit('disconnect-participant', participant)"
                            class="control-icon fa fa-phone-slash"
                            title="Disconnect"
                    ></span>
                    <!--
                    <button v-if="isParticipantHost(participant)"
                            @click="$emit('set-participant-to-guest', participant)">Make guest</button>
                    <button v-else
                            @click="$emit('set-participant-to-host', participant)">Make host</button>
                    -->
                </span>
            </div>
        </div>

        <br>

        {{ isHost ? 'You have Host privileges' : "You're joined as Guest" }}

    </div>
</template>
<style>
    .control-icon {
        color: gray;
        cursor: pointer;
    }

    .control-icon:hover {
        color: black;
    }

    .participant-row:hover {
        background-color: rgb(250, 250, 250);
    }
</style>

<script>
    export default {
        name: 'Participants',
        components: {},
        props: {
            isHost: Boolean,
            myUuid: String,
            participants: Array,

        },
        data() {
            return {};
        },
        methods: {
            isParticipantHost(participant) {
                return participant.role === 'chair';
            },
            isParticipantMuted(participant) {
                return participant.is_muted === 'YES';
            },
            muteClasses(participant) {

                let classes = ['control-icon', 'fa', 'pr-1'];
                classes.push(
                    this.isParticipantMuted(participant) ? 'fa-microphone-slash' : 'fa-microphone'
                );

                return classes;
            },
        }
    }
</script>
