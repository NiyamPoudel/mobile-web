import Vue from "vue";
let apiUrl = process.env.VUE_APP_ROOT_URL;

export default {
    getCampaign() {
        let headers = {
            "Content-Type": "application/json",
        };
        return Vue.http.get(`${apiUrl}/v1/public/campaign`,{
            headers: headers
        })
            .then(
                response => {
                    let obj = {
                        body: response.data,
                        status: response.status
                    }
                    return obj;
                },
                response => {
                    let obj = {
                        body: response.data,
                        status: response.status
                    }
                    return obj;
                }
            );
    },
    createCustomer(body) {
        let headers = {
            "Content-Type": "application/json",
        };
        return Vue.http.post(`${apiUrl}/v1/public/customer`, body, {
            headers: headers
        })
            .then(
                response => {
                    let obj = {
                        body: response.data,
                        status: response.status
                    }
                    return obj;
                },
                response => {
                    let obj = {
                        body: response.data,
                        status: response.status
                    }
                    return obj;
                }
            );
    },
}