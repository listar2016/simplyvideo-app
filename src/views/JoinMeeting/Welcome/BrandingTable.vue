<template>
    <table class="text-left">
        <tr>
            <td>Branding level</td>
            <td>{{ brand.level }}</td>
        </tr>
        <tr>
            <td class="pr-3">Guest welcome message</td>
            <td>{{ brand.guest_welcome_message || 'none' }}</td>
        </tr>
        <tr>
            <td>Business name</td>
            <td>{{ brand.business_name || 'none' }}</td>
        </tr>
        <tr>
            <td>Subdomain</td>
            <td>{{ brand.subdomain || 'none' }}</td>
        </tr>
        <tr>
            <td>Primary color</td>
            <td>{{ brand.primary_color_hex || 'none' }}</td>
        </tr>
        <tr>
            <td>Secondary color</td>
            <td>{{ brand.secondary_color_hex || 'none' }}</td>
        </tr>
        <tr>
            <td>Logo</td>
            <td>{{ brand.logo || 'none' }}</td>
        </tr>
        <tr>
            <td>Favicon</td>
            <td>{{ brand.favicon || 'none' }}</td>
        </tr>
        <tr>
            <td>Hero image</td>
            <td>{{ brand.hero_image || 'none' }}</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: 'BrandingTable',
        props: {
            brand: {
                type: Object,
                required: true
            },
        },
        data() {
            return {};
        },
        methods: {
        }
    }
</script>
