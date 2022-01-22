import Vue from "vue";
let apiUrl = process.env.VUE_APP_ROOT_URL;

export default {
    adminLogin(username, password) {
        let headers = {
            "Content-Type": "application/json",
        };
        return Vue.http.post(`${apiUrl}/v1/admin/login`, {
            username: username,
            password: password,
        }, {
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