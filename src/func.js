import axios from 'axios';
export default {
    install(Vue, options) {
        let http_url = 'http://bx.js-cx.cn';
        Vue.prototype.http_url = http_url;
        Vue.prototype.getSystem = axios.get(http_url+'/system/get_system');
        Vue.prototype.guolv = function (obj) {
            if (!obj) return []

            for (let v of obj) {
                if (typeof (v.repair) !== "undefined" && !isNaN(v.repair))  //维修
                    v.repair = !!v.repair ? "约定送修比以内" : "约定送修比以外";
                if (typeof (v.via_sign) !== "undefined" && !isNaN(v.via_sign)) //过户标志
                    v.via_sign = !!v.via_sign ?"Y" :'N';
                if (typeof (v.dan3_sign) !== "undefined" && !isNaN(v.dan3_sign))  //单三者标志
                    v.dan3_sign=!!v.dan3_sign ?'Y':'N';
            }
            return obj
        }
        
    }
}   