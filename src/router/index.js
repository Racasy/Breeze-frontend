import { createWebHistory, createRouter } from 'vue-router'
import { useUsers } from '@/stores/user'
import Welcome from '@/pages/Welcome.vue'
import PageNotFound from '@/pages/errors/404.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import VerifyEmail from '@/pages/auth/VerifyEmail.vue'
import UserAllFiles from '@/pages/UserAllFiles.vue'
import AdminAllFiles from '@/pages/AdminAllFiles.vue'
import UploadFiles from '@/pages/UploadFiles.vue'
import UserProfile from '@/pages/UserProfile.vue';
import CompanyProfile from '@/pages/CompanyProfile.vue';

const APP_NAME = import.meta.env.VITE_APP_NAME

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        meta: {
            title: 'Welcome',
            metaTags: [
                {
                    name: 'Welcome',
                    content:
                        'An application / authentication starter kit frontend in Vue.js 3 for Laravel Breeze.',
                },
                {
                    property: 'og:Welcome',
                    content:
                        'An application / authentication starter kit frontend in Vue.js 3 for Laravel Breeze.',
                },
            ],
        },
    },
    {
        path: '/home',
        redirect: '/dashboard',
        component: Dashboard,
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            guard: 'auth',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        query: {
            reset: 'reset',
        },
        meta: {
            title: 'Log in',
            guard: 'guest',
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            guard: 'guest',
        },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            title: 'Forget Password',
            guard: 'guest',
        },
    },
    {
        path: '/password-reset/:token',
        name: 'password-reset',
        component: ResetPassword,
        query: {
            email: 'email',
        },
        meta: {
            title: 'Reset Password',
            guard: 'guest',
        },
    },
    {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Email Verification',
            guard: 'auth',
        },
    },
    {
        path: '/page-not-found',
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-not-found',
    },
    {
        path: '/all-files-user',
        name: 'UserAllFiles',
        component: UserAllFiles,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Your files',
            guard: 'auth',
        },
        
    },
    {
        path: '/all-files-admin',
        name: 'AdminAllFiles',
        component: AdminAllFiles,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Your files',
            guard: 'auth',
            requiresAdmin: true
        },
        
    },
    {
        path: '/upload-files',
        name: 'UploadFiles',
        component: UploadFiles,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Upload files',
            guard: 'auth',
        },
        
    },
    {
        path: '/user-profile',
        name: 'UserProfile',
        component: UserProfile,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Your Profile',
            guard: 'auth',
        },
        
    },
    {
        path: '/company-profile',
        name: 'CompanyProfile',
        component: CompanyProfile,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Company Profile',
            guard: 'auth',
        },
        
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard

router.beforeEach((to, from, next) => {
    const store = useUsers()

    const auth = store.authUser

    if (to.matched.some(route => route.meta.guard === 'guest') && auth)
        next({ name: 'dashboard' })
    else if (to.matched.some(route => route.meta.guard === 'auth') && !auth)
        next({ name: 'login' })
    else next()
})

// Page Title and Metadata

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title
    } else {
        document.title = APP_NAME
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
        el => el.parentNode.removeChild(el),
    )

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })

        .forEach(tag => document.head.appendChild(tag))

    next()
})

// Admin check
router.beforeEach((to, from, next) => {
    const userStore = useUsers();
    const auth = userStore.authUser
    //if (to.matched.some(route => route.meta.requiresAdmin === 'true') && auth)
        //next({ name: 'AdminAllFiles' })

    if (to.matched.some(record => record.meta.requiresAdmin) && auth) {
        console.log(userStore.company)
        console.log()
        if (userStore.userData.is_admin) {
            next();
        } else {
            next({ name: 'dashboard' });
        }
    } else {
        next();
    }
});

export default router
