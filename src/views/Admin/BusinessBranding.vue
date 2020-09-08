<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Personal</a></li>
                    <li class="breadcrumb-item active">Settings</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>Settings</h1>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div :class="isShowGotcha ? 'col-xl-9' : 'col-xl-12'">
                        <div class="section-panel">
                            <div class="section-panel-alert" data-alert="notification">
                                <div class="section-panel-alert-content">
                                    <div class="icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="currentColor" d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                                        </svg>
                                    </div>
                                    <div class="content">
                                        <p>
                                            Override personal user branding with business branding
                                            <span class="info-popover" data-toggle="tooltip" data-title="If enabled, all meeting rooms will display the same logo, hero image and welcome message">
                                                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                                            <g id="Content" transform="translate(260.000000, 108.000000)">
                                                                <g id="Notification" transform="translate(0.000000, 130.000000)">
                                                                    <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </span>
                                        </p>
                                    </div>
                                    <div v-if="brand && brand.level" class="custom-checkbox-slide custom-checkbox-slide-invert ml-lg-auto mt-1 mt-lg-0">
                                        <div v-if="isAuthUserBusinessPlanAdmin">
                                            <input v-model="override_personal_brand" @click.prevent="isShowConfirmOverride = true" id="check10" type="checkbox" />
                                            <label for="check10">{{ override_personal_brand ? 'Yes' : 'No'}}</label>
                                        </div>
                                        <div v-else>
                                            <input checked @click.prevent="$emit('show-premium-feature-popup')" id="check10-disabled" type="checkbox" />
                                            <label for="check10-disabled">Yes</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Brand info</h3>
                                </div>
                                <div v-if="isAuthUserBusinessPlanAdmin" class="section-panel-header-action">
                                    <a v-if="statusBrand" href="#" class="btn btn-link" @click.prevent="discardBrandInfo"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusBrand = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                                <div v-else class="section-panel-header-action">
                                    <a class="btn btn-link cursor-pointer" @click="$emit('show-premium-feature-popup')">
                                        <img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit
                                    </a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group" :class="{'form-error': errors.business_name}">
                                                <label>
                                                    Business name
                                                    <span class="info-popover" data-toggle="tooltip" data-title="Used in welcome page and other places">
                                                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                                                    <g id="Content" transform="translate(260.000000, 108.000000)">
                                                                        <g id="Notification" transform="translate(0.000000, 130.000000)">
                                                                            <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="Name"
                                                    v-model="business_name"
                                                    :disabled="!statusBrand"/>
                                                 <div 
                                                    class="form-error-message" 
                                                    v-for="(error, index) in errors.business_name"
                                                    :key="index">
                                                    {{ error }}
                                                </div>   
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group" :class="{'form-error': errors.guest_welcome_message}">
                                                <label>
                                                    Guest welcome message
                                                    <span class="info-popover" data-toggle="tooltip" data-title="Used in welcome page as a greeting">
                                                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                                                    <g id="Content" transform="translate(260.000000, 108.000000)">
                                                                        <g id="Notification" transform="translate(0.000000, 130.000000)">
                                                                            <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </label>
                                                <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Welcome Message"
                                                        v-model="guest_welcome_message"
                                                        :disabled="!statusBrand"/>
                                                <div
                                                        class="form-error-message"
                                                        v-for="(error, index) in errors.guest_welcome_message"
                                                        :key="index">
                                                    {{ error }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group" :class="{'form-error': errors.subdomain}">
                                                <label>
                                                    Subdomain
                                                    <span class="info-popover" data-toggle="tooltip" data-title="This will form a unique URL for your brand">
                                                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                                                    <g id="Content" transform="translate(260.000000, 108.000000)">
                                                                        <g id="Notification" transform="translate(0.000000, 130.000000)">
                                                                            <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="your-unique-url"
                                                    v-model="subdomain"
                                                    :disabled="!statusBrand"/>
                                                <div 
                                                    class="form-error-message" 
                                                    v-for="(error, index) in errors.subdomain"
                                                    :key="index">
                                                    {{ error }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 ml-auto" v-if="statusBrand">
                                            <div class="form-group text-md-right">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateBrandInfo()">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Colors</h3>
                                </div>
                                <div v-if="isAuthUserBusinessPlanAdmin" class="section-panel-header-action">
                                    <a v-if="statusColors" href="#" class="btn btn-link" @click.prevent="discardColors"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusColors = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                                <div v-else class="section-panel-header-action">
                                    <a class="btn btn-link cursor-pointer" @click="$emit('show-premium-feature-popup')">
                                        <img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit
                                    </a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="form-group with-color-picker" :class="{'form-error': errors.primary_color_hex}">
                                                <label>
                                                    Primary color
                                                    <span class="info-popover" data-toggle="tooltip" data-title="Change button colors within welcome page and invite process">
                                                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                                                    <g id="Content" transform="translate(260.000000, 108.000000)">
                                                                        <g id="Notification" transform="translate(0.000000, 130.000000)">
                                                                            <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    v-model="primary_color_hex"
                                                    :disabled="!statusColors" 
                                                    readonly
                                                    ref="txt-primary-color"
                                                    id="txt-primary-color"
                                                    @click="showPrimaryColorPicker"
                                                />
                                                <div 
                                                    class="color-picker-container"
                                                    v-click-outside="{
                                                        exclude: ['txt-primary-color'],
                                                        handler: 'hidePrimaryColorPicker'
                                                    }"
                                                >
                                                    <label
                                                        v-if="primary_color_hex"
                                                        class="current-color" 
                                                        for="txt-primary-color"
                                                        :style="`background-color: ${primary_color_hex}`" >
                                                    </label>
                                                    <chrome-picker 
                                                        v-model="primaryColors" 
                                                        v-if="isPrimaryShow" 
                                                        @input="onChangePrimary">
                                                    </chrome-picker>    
                                                </div>
                                                <!-- <div class="color-edit-icon" v-if="statusColors">
                                                    <a href="#" class="fas fa-eye-dropper" aria-hidden="true" @click.prevent="showPrimaryColorPicker"></a>
                                                </div> -->
                                                <div 
                                                    class="form-error-message" 
                                                    v-for="(error, index) in errors.primary_color_hex"
                                                    :key="index">
                                                    {{ error }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group with-color-picker" :class="{'form-error': errors.secondary_color_hex}">
                                                <label>
                                                    Secondary color
                                                    <span class="info-popover" data-toggle="tooltip" data-title="Change button colors within welcome page and invite process">
                                                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                                                    <g id="Content" transform="translate(260.000000, 108.000000)">
                                                                        <g id="Notification" transform="translate(0.000000, 130.000000)">
                                                                            <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    v-model="secondary_color_hex"
                                                    :disabled="!statusColors"
                                                    readonly
                                                    ref="txt-second-color"
                                                    id="txt-second-color"
                                                    @click="showSecondColorPicker"/>
                                                <div 
                                                    class="color-picker-container" 
                                                    v-click-outside="{
                                                        exclude: ['txt-second-color'],
                                                        handler: 'hideSecondColorPicker'
                                                    }"
                                                >
                                                    <label
                                                        v-if="secondary_color_hex"
                                                        class="current-color" 
                                                        for="txt-second-color"
                                                        :style="`background-color: ${secondary_color_hex}`" >
                                                    </label>
                                                    <chrome-picker 
                                                        v-model="secondColors" 
                                                        v-if="isSecondShow" 
                                                        @input="onChangeSecond"
                                                    >
                                                    </chrome-picker>    
                                                </div>
                                                <!-- <div class="color-edit-icon" v-if="statusColors">
                                                    <a href="#" class="fas fa-eye-dropper" aria-hidden="true" @click.prevent="showSecondColorPicker"></a>
                                                </div> -->
                                                <div 
                                                    class="form-error-message" 
                                                    v-for="(error, index) in errors.secondary_color_hex"
                                                    :key="index">
                                                    {{ error }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 ml-auto" v-if="statusColors">
                                            <div class="form-group text-md-right">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateColors()">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Visual materials</h3>
                                </div>
                                <div v-if="isAuthUserBusinessPlanAdmin" class="section-panel-header-action">
                                    <a v-if="statusImages" href="#" class="btn btn-link" @click.prevent="discardImages"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                                    <a v-else href="#" class="btn btn-link" @click.prevent="statusImages = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                                </div>
                                <div v-else class="section-panel-header-action">
                                    <a class="btn btn-link cursor-pointer" @click="$emit('show-premium-feature-popup')">
                                        <img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit
                                    </a>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <form class="form-horizontal">
                                    <div class="row align-items-center">
                                        <div class="col-lg flex-lg-grow-0 mb-1 mb-lg-0">
                                            <div class="form-group-upload">
                                                <label for="logo" v-if="logo" class="real-image">
                                                    <span>
                                                        <img alt="Upload" :src="logo" />
                                                    </span>
                                                </label>
                                                <label for="logo" v-else class="place-holder">
                                                    <span class="p-3">
                                                        <img alt="Upload" src="@/assets/img/icons/icon-upload.svg" />
                                                        <span>Drag &amp; Drop file here</span>
                                                    </span>
                                                </label>
                                                <input 
                                                    name="logo" 
                                                    id="logo" 
                                                    type="file" 
                                                    @change="onLogoFileSelected" 
                                                    :disabled="!statusImages"/>
                                            </div>
                                        </div>
                                        <div class="col-lg">
                                            <div class="form-group-logo-content">
                                                <h4>Brand logo</h4>
                                                <p>
                                                    Visible on the welcome screen for all meetings, during invite process and other places.
                                                </p>
                                                <label v-if="logo && statusImages" class="btn btn-outline" @click.prevent="confirmDeleteImage('logo')"><i class="far fa-trash-alt text-danger"/></label>
                                                <label v-if="statusImages" for="logo" class="btn btn-outline">Choose</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="row align-items-center">
                                        <div class="col-lg flex-lg-grow-0 mb-1 mb-lg-0">
                                            <div class="form-group-upload">
                                                <label for="hero_image" v-if="hero_image" class="real-image">
                                                    <span>
                                                        <img alt="Upload" :src="hero_image" />
                                                    </span>
                                                </label>
                                                <label for="hero_image" v-else class="place-holder">
                                                    <span class="p-3">
                                                        <img alt="Upload" src="@/assets/img/icons/icon-upload.svg" />
                                                        <span>Drag &amp; Drop file here</span>
                                                    </span>
                                                </label>
                                                <input 
                                                    name="hero_image" 
                                                    id="hero_image" 
                                                    type="file" 
                                                    @change="onHeroImageFileSelected"
                                                    :disabled="!statusImages"/>
                                            </div>
                                        </div>
                                        <div class="col-lg">
                                            <div class="form-group-logo-content">
                                                <h4>Hero image</h4>
                                                <p>
                                                    Visible on the welcome screen for all meetings and other places.
                                                </p>
                                                <label v-if="hero_image && statusImages" class="btn btn-outline" @click.prevent="confirmDeleteImage('hero_image')"><i class="far fa-trash-alt text-danger"/></label>
                                                <label v-if="statusImages" for="hero_image" class="btn btn-outline">Choose</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="row align-items-center">
                                        <div class="col-lg flex-lg-grow-0 mb-1 mb-lg-0">
                                            <div class="form-group-upload">
                                                <label for="favicon" v-if="favicon" class="real-image">
                                                    <span>
                                                        <img alt="Upload" :src="favicon" />
                                                    </span>
                                                </label>
                                                <label for="favicon" v-else class="place-holder">
                                                    <span class="p-3">
                                                        <img alt="Upload" src="@/assets/img/icons/icon-upload.svg" />
                                                        <span>Drag &amp; Drop file here</span>
                                                    </span>
                                                </label>
                                                <input 
                                                    name="favicon" 
                                                    id="favicon" 
                                                    type="file" 
                                                    @change="onFaviconFileSelected"
                                                    :disabled="!statusImages"/>
                                            </div>
                                        </div>
                                        <div class="col-lg">
                                            <div class="form-group-logo-content">
                                                <h4>Favicon</h4>
                                                <p>
                                                    Replace Simply Video default favicon with your own throughout the site.
                                                    We accept .ico format.
                                                </p>
                                                <label v-if="favicon && statusImages" class="btn btn-outline" @click.prevent="confirmDeleteImage('favicon')"><i class="far fa-trash-alt text-danger"/></label>
                                                <label v-if="statusImages" for="favicon" class="btn btn-outline">Choose</label>
                                            </div>
                                        </div>
                                        <div class="col-lg ml-auto" v-if="statusImages">
                                            <div class="form-group text-md-right">
                                                <label class="d-none d-lg-block">&nbsp;</label>
                                                <button type="submit" class="btn btn-md btn-primary" @click.prevent="updateImages()">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl mt-2 mt-xl-0" v-if="isShowGotcha">
                        <gotcha :tip-list="tipList" @close="isShowGotcha = false"></gotcha>
                    </div>
                </div>
            </div>
        </section>

        <confirm-dialog
            v-if="isShowConfirmDeleteImage"
            title="Are you sure you want to delete this image?"
            description="You will not be able to recover it later"
            @no="cancelDeleteImage"
            @yes="deleteImage">
        </confirm-dialog>

        <confirm-dialog
                v-if="isShowConfirmOverride"
                title="Confirmation"
                :description="'Are you sure you want to '+(this.override_personal_brand ? 'disable' : 'enable')+' override?'"
                @no="isShowConfirmOverride = false"
                @yes="toggleOverridePersonalBrand">
        </confirm-dialog>
    </main>
</template>
<script>
import {mapState} from 'vuex'
import {Chrome} from 'vue-color'
import Gotcha from '@/components/Gotcha'
import PlanMixin from "../../mixins/PlanMixin";
import ConfirmDialog from '@/components/ConfirmDialog'
import axios from "axios";
export default {
    mixins: [PlanMixin],
    mounted() {
        // eslint-disable-next-line
        $('[data-toggle="tooltip"]').tooltip({placement: 'top'})
    },
    components: {
        'chrome-picker': Chrome,
        ConfirmDialog,
        Gotcha
    },
    data() {
        return {
            statusBrand: false,
            statusColors: false,
            statusImages: false,
            override_personal_brand: true,
            guest_welcome_message: '',
            business_name: '',
            subdomain: '',
            primary_color_hex: '',
            secondary_color_hex: '',
            favicon: '',
            logo: '',
            hero_image:'',
            faviconFile: '',
            logoFile: '',
            heroImageFile: '',
            isPrimaryShow: false,
            isSecondShow: false,
            primaryColors: '',
            secondColors: '',
            isShowGotcha: true,
            tipList: [
                "Business branding gives more options than Personal branding",
            ],
            errors: [],
            isShowConfirmDeleteImage: false,
            isShowConfirmOverride: false,
            imageToBeDeleted: '',
        }
    },
    computed: {
        ...mapState({
            brand: state => state.auth.business_brand
        })
    },
    created() {

        if (this.authUserLoadedAndCannotAccessAdminFeatures) {
            this.$router.push({name: 'dashboard'});
            return;
        }

        this.$store.dispatch('getBusinessBrand')
            .then(() => {
                this.initBrand()
            })
    },
    methods: {
        initBrand() {
            this.initBrandInfo()
            this.initColors()
            this.initImages()
        },
        initBrandInfo() {
            this.override_personal_brand = this.brand.override_personal_brand
            this.guest_welcome_message = this.brand.guest_welcome_message
            this.subdomain = this.brand.subdomain
            this.business_name = this.brand.business_name
        },
        initColors() {
            this.primary_color_hex = this.brand.primary_color_hex
            this.secondary_color_hex = this.brand.secondary_color_hex
            this.primaryColors = {hex: this.primary_color_hex}
            this.secondColors = {hex: this.secondary_color_hex}
            this.isPrimaryShow = false
            this.isSecondShow = false
        },
        initImages() {
            this.logo = this.brand.logo
            this.favicon = this.brand.favicon
            this.hero_image = this.brand.hero_image
        },
        discardBrandInfo() {
            this.statusBrand = false
            this.initBrandInfo()
        },
        discardColors() {
            this.statusColors = false
            this.initColors()
        },
        discardImages() {
            this.statusImages = false
            this.initImages()
        },
        updateBrandInfo() {
            let vm = this
            vm.errors = []
            let flag_error = false
            /*
            if (!this.guest_welcome_message) {
                vm.errors.guest_welcome_message = ["Please input guest welcome message!"]
                flag_error = true
            }
            if (!this.business_name) {
                vm.errors.business_name = ["Please input business name!"]
                flag_error = true
            }
            if (!this.subdomain) {
                vm.errors.subdomain = ["Please input subdomain"]
                flag_error = true
            }
             */
            if (flag_error) return
            let param = {
                guest_welcome_message: vm.guest_welcome_message,
                business_name: vm.business_name,
                subdomain: vm.subdomain
            }
            vm.$store.dispatch('updateBrandInfo', param)
                .then(() => {
                    vm.$toast.success("Brand updated successfully!")
                    vm.statusBrand = false
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            vm.errors = data.errors
                        } 
                    } catch {
                        vm.$toast.error(err)
                    }
                })  
        },
        updateColors() {
            let vm = this
            let flag_error = false
            vm.errors = []
            if (!this.primary_color_hex) {
                vm.errors.primary_color_hex = ["Please select primary color!"]
                flag_error = true
            }
            if (!this.secondary_color_hex) {
                vm.errors.secondary_color_hex = ["Please select secondary color!"]
                flag_error = true
            }
            if (flag_error) return
            let param = {
                primary_color_hex: vm.primary_color_hex,
                secondary_color_hex: vm.secondary_color_hex,
            }
            vm.$store.dispatch('updateBrandColors', param)
                .then(() => {
                    vm.$toast.success("Colors updated successfully!")
                    vm.statusColors = false
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            vm.errors = data.errors
                        } 
                    } catch {
                        vm.$toast.error(err)
                    }
                })  
        },
        updateImages() {
            let vm = this
            let param = new FormData();
            if (vm.logoFile) {
                param.append('logo', vm.logoFile)
            }
            if (vm.faviconFile) {
                param.append('favicon', vm.faviconFile)
            }
            if (vm.heroImageFile) {
                param.append('hero_image', vm.heroImageFile);
            }
            vm.$store.dispatch('updateBrandImages', param)
                .then(() => {
                    vm.$store.dispatch('getUserProfile')
                    vm.$toast.success("Visual materials updated successfully!")
                    vm.statusImages = false
                    vm.logoFile = ''
                    vm.faviconFile = ''
                    vm.heroImageFile = ''
                })
                .catch(err => {
                    try {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        console.log(data.message)
                    } catch {
                        console.log(err)
                    }
                })
        },
        toggleOverridePersonalBrand() {
            this.$store.dispatch('setLoadingStatus', 'loading');
            axios.post('/override-personal-brand', {override_personal_brand: this.override_personal_brand ? 0 : 1})
                .then(() => {
                    this.override_personal_brand = !this.override_personal_brand;
                    this.$store.dispatch('setLoadingStatus', '');
                    this.isShowConfirmOverride = false;
                })
                .catch(error => {
                    console.log(error);
                    this.isShowConfirmOverride = false;
                    this.$store.dispatch('setLoadingStatus', '');
                    this.$toast.error('Error.');
                });
        },
        confirmDeleteImage(image) {
            this.imageToBeDeleted = image;
            this.isShowConfirmDeleteImage = true;
        },
        cancelDeleteImage() {
            this.isShowConfirmDeleteImage = false;
            this.imageToBeDeleted = '';
        },
        deleteImage() {
            this.$store.dispatch('setLoadingStatus', 'loading');
            axios({ url: '/business-brand-image/'+this.imageToBeDeleted, method: 'DELETE' })
                .then(() => {
                    this.$store.dispatch('setLoadingStatus', '');
                    this.$store.dispatch('getUserProfile');
                    this.$store.dispatch('getBusinessBrand')
                        .then(() => {
                            this.isShowConfirmDeleteImage = false;
                            this.initBrand();
                            this.$toast.success('Image deleted');
                        });
                })
                .catch(err => {
                    this.$store.dispatch('setLoadingStatus', '');
                    console.log(err);
                    this.$toast.error('Error');
                });
        },
        onLogoFileSelected(event) {
            this.logoFile = event.target.files[0]
            this.logo = URL.createObjectURL(this.logoFile)
        },
        onFaviconFileSelected(event) {
            this.faviconFile = event.target.files[0]
            this.favicon = URL.createObjectURL(this.faviconFile)
        },
        onHeroImageFileSelected(event) {
            this.heroImageFile = event.target.files[0]
            this.hero_image = URL.createObjectURL(this.heroImageFile)
        },
        onChangePrimary(val) {
            if (this.statusColors) {
                this.primary_color_hex = val.hex
                this.primaryColors = val
            }
        },
        onChangeSecond(val) {
            if (this.statusColors) {
                this.secondColors = val
                this.secondary_color_hex = val.hex
            }            
        },
        showSecondColorPicker() {
           if (this.statusColors) {
                this.isSecondShow = !this.isSecondShow
            }
        },
        showPrimaryColorPicker() {
            if (this.statusColors) {
                this.isPrimaryShow = !this.isPrimaryShow
            }
        },
        hideSecondColorPicker() {
            if (this.statusColors && this.isSecondShow) {
                this.isSecondShow = false
            }
        },
        hidePrimaryColorPicker() {
            if (this.statusColors && this.isPrimaryShow) {
                this.isPrimaryShow = false
            }
        }
    },
    
}
</script>