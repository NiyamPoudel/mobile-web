import Vue from "vue";
let apiUrl = process.env.VUE_APP_ROOT_URL;

export default {
    updateCampaign(id, form) {
        let orgtoken = localStorage.getItem('token')
        let headers = {
            "Content-Type": "application/json",
            "Authorization": orgtoken
        };
        return Vue.http.put(`${apiUrl}/v1/admin/campaign/${id}`, form, {
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