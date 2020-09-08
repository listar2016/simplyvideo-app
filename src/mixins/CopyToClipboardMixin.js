export default {
    methods: {
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
    }
};
