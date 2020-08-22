import axios from 'axios';

const axiosCall = axios.create({
   baseURL: 'https://jaydoc-cb1af.firebaseio.com/'
});

export default axiosCall;
