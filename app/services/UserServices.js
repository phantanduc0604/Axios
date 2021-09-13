

function UserServices() {
    //Lấy danh sách sản phẩm 
    this.layDS = function () {
        return axios({
            method: 'get',
            url: 'https://6131b6187287b70017e641eb.mockapi.io/Axios',

        });
    }

    this.them = function (sp) {
        return axios({
            method: 'post',
            url: 'https://6131b6187287b70017e641eb.mockapi.io/Axios',
            data: sp
        });
    }

    this.layND = function (id) {
        return axios({
            method: 'get',
            url: `https://6131b6187287b70017e641eb.mockapi.io/Axios/${id}`,

        });
    }

    this.capNhapND = function (sp, id) {
        return axios({
            method: 'put',
            url: `https://6131b6187287b70017e641eb.mockapi.io/Axios/${id}`,
            data: sp
        });
    }

    this.xoaND = function (id) {
        return axios({
            method: 'delete',
            url: `https://6131b6187287b70017e641eb.mockapi.io/Axios/${id}`,

        });
    }
}