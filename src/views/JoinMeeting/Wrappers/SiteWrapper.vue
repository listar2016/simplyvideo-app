<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <div class="section-header">
                    <slot name="section-header"></slot>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-body" style="min-height: 350px;">
                                <slot></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        name: 'SiteWrapper',
    }
</script>
