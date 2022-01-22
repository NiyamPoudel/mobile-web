import Vue from "vue";
let apiUrl = process.env.VUE_APP_ROOT_URL;

export default {
    createWinner(type, imei, prize) {
        let orgtoken = localStorage.getItem('token')
        let headers = {
            "Content-Type": "application/json",
            "Authorization": orgtoken
        };
        return Vue.http.post(`${apiUrl}/v1/admin/winner`, {
            type: type,
            imei: imei,
            prize: prize,
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
    deleteWinners() {
        let orgtoken = localStorage.getItem('token')
        let headers = {
            "Content-Type": "application/json",
            "Authorization": orgtoken
        };
        return Vue.http.delete(`${apiUrl}/v1/admin/winner`, {
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
    getAllWinners() {
        let orgtoken = localStorage.getItem('token')
        let headers = {
            "Content-Type": "application/json",
            "Authorization": orgtoken
        };
        return Vue.http.get(`${apiUrl}/v1/public/winner`, {
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