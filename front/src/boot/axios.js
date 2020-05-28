import Vue from 'vue'
import axios from 'axios'
import {
  urlbase
} from './global'


let instance = axios.create({
  baseURL: urlbase
})

Vue.prototype.$axios = instance
