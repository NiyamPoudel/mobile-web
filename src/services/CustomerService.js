import Vue from "vue";
let apiUrl = process.env.VUE_APP_ROOT_URL;

export default {
    createCustomer(name, phone, imei) {
        let headers = {
            "Content-Type": "application/json"
        };
        return Vue.http.post(`${apiUrl}/v1/public/customer`, {
            name: name,
            phone: phone,
            imei: imei,
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
    fetchCustomers(date) {
        let orgtoken = localStorage.getItem('token')
        let headers = {
            "Content-Type": "application/json",
            "Authorization": orgtoken
        };
        let query = ""
        if (date !== "none") {
            query = `?date=${date}`
        }
        return Vue.http.get(`${apiUrl}/v1/admin/customer${query}`, {
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