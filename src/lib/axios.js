import Axios from 'axios'


const axios = Axios.create({
    baseURL: 'https://api-14dphabrams.kvalifikacija.rvt.lv',
    //baseURL: 'https://api-14dphabrams.kvalifikacija.rvt.lv',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios
