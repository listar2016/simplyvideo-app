import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import Home from '../views/Home'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword'
import ChangePassword from '../views/ChangePassword'
import Dashboard from '../views/Dashboard.vue'
import EmailVerify from '../views/EmailVerify.vue'
import RegisterViaInvite from '../views/RegisterViaInvite'

import JoinMeeting from '../views/JoinMeeting/JoinMeeting.vue'
import WelcomeGuest from "../views/JoinMeeting/Welcome/WelcomeGuest";
import Call from "../views/JoinMeeting/WebRTC/Call";

import Admin from '../views/Admin/Index'
import UserManagement from '../views/Admin/UserManagement'
import CreateUser from '../views/Admin/CreateUser'
import PlansRole from '../views/Admin/PlansRole'
import BusinessBranding from '../views/Admin/BusinessBranding'

import Personal from '../views/Personal/Index'
import Profile from '../views/Personal/Profile'
import Meetings from '../views/Personal/Meetings'
import Settings from '../views/Personal/Settings'
import PersonalBranding from '../views/Personal/PersonalBranding'
import CreateMeeting from '../views/Personal/CreateMeeting'
import Recordings from '../views/Personal/Recordings'
import MeetingInviteNotification from '../views/Personal/MeetingInviteNotification'

import RoomSystem from '../views/RoomSystem/Index'
import RoomSystemsManage from '../views/RoomSystem/RoomSystemsManage'
import WelcomeAuthorised from "../views/JoinMeeting/Welcome/WelcomeAuthorised";
import VideoDeviceInstructions from "../views/JoinMeeting/Devices/VideoDeviceInstructions";
import PhoneInstructions from "../views/JoinMeeting/Devices/PhoneInstructions";
import SkypeInstructions from "../views/JoinMeeting/Devices/SkypeInstructions";
import AlphaNumericInstructions from "../views/JoinMeeting/Devices/AlphaNumericInstructions";
import NumericInstructions from "../views/JoinMeeting/Devices/NumericInstructions";
import MeetingInvites from "../views/Personal/MeetingInvites";

import Account from '../views/Account/Index'
import BusinessProfile from '../views/Account/BusinessProfile'
import Billing from '../views/Account/Billing'
import Invoices from '../views/Account/Invoices'

import Dashboard2 from '../views/Dashboard2'
import JoinMeeting2 from '../views/CallMeeting/JoinMeeting2'
import OngoingMeeting from '../views/CallMeeting/OngoingMeeting'

import AfterCall from '../views/JoinMeeting/Welcome/AfterCall'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home,
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/email/verify/:code',
    name: 'email-verify',
    props: true,
    component: EmailVerify,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/reset-password/:code',
    name: 'reset-password',
    props: true,
    component: ChangePassword,
  },
  {
    path: '/register-via-invite/:code',
    name: 'register-via-invite',
    props: true,
    component: RegisterViaInvite
  },
  {
    path: '/direct-access/:code',
    name: 'direct-access',
    props: true,
    component: MeetingInviteNotification
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/join-meeting',
    name: 'join-meeting',
    component: JoinMeeting,
    props: true,
    meta: {}
  },
  {
    path: '/join-meeting/:webrtcAlias',
    name: 'welcome-guest',
    component: WelcomeGuest,
    props: true,
    meta: {}
  },
  {
    path: '/video-device-instructions/:webrtcAlias',
    name: 'video-device-instructions',
    component: VideoDeviceInstructions,
    props: true,
    meta: {}
  },
  {
    path: '/alpha-numeric-instructions/:webrtcAlias',
    name: 'alpha-numeric-instructions',
    component: AlphaNumericInstructions,
    props: true,
    meta: {}
  },
  {
    path: '/numeric-instructions/:webrtcAlias',
    name: 'numeric-instructions',
    component: NumericInstructions,
    props: true,
    meta: {}
  },
  {
    path: '/phone-instructions/:webrtcAlias',
    name: 'phone-instructions',
    component: PhoneInstructions,
    props: true,
    meta: {}
  },
  {
    path: '/skype-instructions/:webrtcAlias',
    name: 'skype-instructions',
    component: SkypeInstructions,
    props: true,
    meta: {}
  },
  {
    path: '/host/:spWebrtcAlias',
    name: 'host',
    component: WelcomeAuthorised,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/host-one-time-meeting',
    name: 'host-one-time-meeting',
    component: WelcomeAuthorised,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/call',
    name: 'call',
    component: Call,
    props: true,
    meta: {
    }
  },
  {
    path: '/admin',
    component: Admin,
    // redirect: { name: 'user-management' },
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'admin',
        redirect: { name: 'user-management' }
      },
      {
        path: 'user-management',
        name: 'user-management',
        component: UserManagement
      },
      {
        path: 'create-user',
        name: 'create-user',
        component: CreateUser
      },
      { 
        path: 'plans-role/:id',
        name: 'plans-role',
        component: PlansRole,
        props: true
      },
      {
        path: 'account-plan',
        name: 'account-plan',
        component: PlansRole,
        props: true
      },
      {
        path: 'business-branding',
        name: 'business-branding',
        component: BusinessBranding
      }
    ]
  },
  {
    path: '/personal',
    component: Personal,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'personal',
        redirect: { name: 'profile' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'meetings',
        name: 'meetings',
        component: Meetings
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings
      },
      {
        path: 'personal-branding',
        name: 'personal-branding',
        component: PersonalBranding
      },
      {
        path: 'meeting',
        name: 'meeting',
        component: CreateMeeting,
        props: true

      },
      {
        path: 'meeting-invites/:id',
        name: 'meeting-invites',
        component: MeetingInvites,
        props: true
      },
      {
        path: 'meeting-updated/:id',
        name: 'meeting-updated',
        component: MeetingInvites,
        props: true
      },
      {
        path: 'recordings',
        name: 'recordings',
        component: Recordings
      }
    ]
  },
  {
    path: '/room-system',
    component: RoomSystem,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'room-system',
        redirect: {name: 'room-systems-manage'}
      },
      {
        path: 'room-systems-manage',
        name: 'room-systems-manage',
        component: RoomSystemsManage
      }
    ]
  },
  {
    path: '/account',
    component: Account,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'account',
        redirect: {name: 'business-profile'}
      },
      {
        path: 'business-profile',
        name: 'business-profile',
        component: BusinessProfile
      },
      {
        path: 'billing',
        name: 'billing',
        component: Billing
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: Invoices
      }
    ]
  },
  {
    path: '/dashboard2',
    name: 'dashboard2',
    component: Dashboard2,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/join-meeting2',
    name: 'join-meeting2',
    component: JoinMeeting2,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ongoing-meeting',
    name: 'ongoing-meeting',
    component: OngoingMeeting,
    props: true,
    meta: {
    }
  },
  {
    path: '/after-call',
    name: 'after-call',
    component: AfterCall,
    props: true,
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL ? process.env.BASE_URL : '/dist',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    if (to.name === 'login' && store.getters.isLoggedIn) {
      next('/dashboard')
      return
    }
    if (to.params && to.params.previousRoute) {
      store.dispatch('setPrevRoute', to.params.previousRoute)
    } else {
      store.dispatch('setPrevRoute', {})
    }
    next()
  }
})

export default router
