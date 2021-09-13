var spServices = new UserServices();
var validation = new Validation();
var DSNV = [];

function getSEL(id) {
    return document.querySelector(id);
}

function resetForm() {
    getSEL("#formQLND").reset();
    getSEL("#TaiKhoan").disabled = false;
}

function resetSpan(spanID) {
    getSEL(spanID).innerHTML = "";
    getSEL(spanID).style.display = "none";
}

function resetInput() {

    resetSpan("#spanTk");
    resetSpan("#spanHT");
    resetSpan("#spanMK");
    resetSpan("#spanEmail");
    resetSpan("#spanHA");
    resetSpan("#spanND");
    resetSpan("#spanNN");
    resetSpan("#spanMT");

}

function layDSND() {
    spServices.layDS()
        .then(function (response) {

            hienthiTable(response.data);
            DSNV = response.data;
            // console.log(DSNV);
        })
        .catch(function (error) {
            // console.log(error);
        });
};

layDSND();

function hienthiTable(mangSP) {
    var content = "";
    mangSP.map(function (item, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoa('${item.id}')">Xoá</button>
                    <button class="btn btn-info" onclick="layChiTiet('${item.id}')" data-toggle="modal" data-target="#myModal" id="btb-Xem">Xem</button>
                </td>
            </tr>
        `;
    })

    getSEL("#tblDanhSachNguoiDung").innerHTML = content;
}

function themND() {
    //lấy thông tin từ Form
    var taiKhoan = getSEL("#TaiKhoan").value;
    var hoTen = getSEL("#HoTen").value;
    var matKhau = getSEL("#MatKhau").value;
    var email = getSEL("#Email").value;
    var loaiND = getSEL("#loaiNguoiDung").value;
    var ngonNgu = getSEL("#loaiNgonNgu").value;
    var hinhAnh = getSEL("#HinhAnh").value;
    var moTa = getSEL("#MoTa").value;

    var isValid = true;

    //Kiểm tra TK
    isValid = validation.checkEmpty(taiKhoan, "spanTk", "TK không được để trống") && validation.checkID(taiKhoan, "spanTk", "TK bị trùng", DSNV);

    //Kiểm tra tên
    isValid &= validation.checkEmpty(hoTen, "spanHT", "Tên ND ko đc để trống") && validation.checkName(hoTen, "spanHT", "Tên ND ko hợp lệ");

    //Kiểm tra email
    isValid &= validation.checkEmpty(email, "spanEmail", "Enail không đc để trống") && validation.checkEmail(email, "spanEmail", "Enail không đúng định dạng");

    //Kiểm tra pass
    isValid &= validation.checkEmpty(matKhau, "spanMK", "Mật khẩu không được để trống") && validation.checkpass(matKhau, "spanMK", "Mật khẩu không đúng định dạng");

    //Kiểm tra hình ảnh
    isValid &= validation.checkEmpty(hinhAnh, "spanHA", "Hình ảnh không được để trống");

    //Kiểm tra người dùng
    isValid &= validation.checkDropdown("loaiNguoiDung", "spanND", "Chọn người dùng");

    //Kiểm tra ngôn ngữ
    isValid &= validation.checkDropdown("loaiNgonNgu", "spanNN", "Chọn ngôn ngữ");

    //Kiểm tra mô tả
    isValid &= validation.checkEmpty(moTa, "spanMT", "Mô tả không đc để trống") && validation.checkmoTa(moTa, "spanMT", "Mô tả không đúng định dạng");

    if (isValid) {
        // console.log(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

        var nd = new User(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
        // console.table(nd);

        spServices.them(nd)
            .then(function (response) {
                // console.log(response);
                layDSND();
                getSEL("#myModal .close").click();
                resetForm();

            })
            .catch(function (error) {
                // console.log(error);
            });
    }

}


getSEL("#btnThemNguoiDung").addEventListener("click", function () {
    resetInput();
    resetForm();
    getSEL(".modal-footer").innerHTML = `
        <button class="btn btn-success" onclick="themND()" >Thêm</button>
    `
});

function layChiTiet(id) {
    spServices.layND(id)
        .then(function (response) {
            resetInput();
            // console.log(response.data);
            getSEL("#TaiKhoan").disabled = true;
            getSEL("#TaiKhoan").value = response.data.taiKhoan;
            getSEL("#HoTen").value = response.data.hoTen;
            getSEL("#MatKhau").value = response.data.matKhau;
            getSEL("#Email").value = response.data.email;
            getSEL("#loaiNguoiDung").value = response.data.loaiND;
            getSEL("#loaiNgonNgu").value = response.data.ngonNgu;
            getSEL("#HinhAnh").value = response.data.hinhAnh;
            getSEL("#MoTa").value = response.data.moTa;

            getSEL(".modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="capNhap('${response.data.id}')">Cập Nhập</button>`;

        })
        .catch(function (error) {
            // console.log(error);
        });
};

function capNhap(id) {
    var taiKhoan = getSEL("#TaiKhoan").value;
    var hoTen = getSEL("#HoTen").value;
    var matKhau = getSEL("#MatKhau").value;
    var email = getSEL("#Email").value;
    var loaiND = getSEL("#loaiNguoiDung").value;
    var ngonNgu = getSEL("#loaiNgonNgu").value;
    var hinhAnh = getSEL("#HinhAnh").value;
    var moTa = getSEL("#MoTa").value;

    var isValid = true;

    //Kiểm tra tên
    isValid &= validation.checkEmpty(hoTen, "spanHT", "Tên ND ko đc để trống") && validation.checkName(hoTen, "spanHT", "Tên ND ko hợp lệ");

    //Kiểm tra email
    isValid &= validation.checkEmpty(email, "spanEmail", "Enail không đc để trống") && validation.checkEmail(email, "spanEmail", "Enail không đúng định dạng");

    //Kiểm tra pass
    isValid &= validation.checkEmpty(matKhau, "spanMK", "Mật khẩu không được để trống") && validation.checkpass(matKhau, "spanMK", "Mật khẩu không đúng định dạng");

    //Kiểm tra hình ảnh
    isValid &= validation.checkEmpty(hinhAnh, "spanHA", "Hình ảnh không được để trống");

    //Kiểm tra người dùng
    isValid &= validation.checkDropdown("loaiNguoiDung", "spanND", "Chọn người dùng");

    //Kiểm tra ngôn ngữ
    isValid &= validation.checkDropdown("loaiNgonNgu", "spanNN", "Chọn ngôn ngữ");

    //Kiểm tra mô tả
    isValid &= validation.checkEmpty(moTa, "spanMT", "Mô tả không đc để trống") && validation.checkmoTa(moTa, "spanMT", "Mô tả không đúng định dạng");


    if (isValid) {
        // console.log(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

        var nd = new User(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
        // console.table(nd);

        spServices.capNhapND(nd, id)
            .then(function (response) {
                // console.log(response.data);
                layDSND();
                getSEL(".modal-header .close").click();
                resetForm();
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}

function xoa(id) {
    spServices.xoaND(id).
        then(function (response) {
            // console.log(response.data);
            layDSND();

        })
        .catch(function (error) {
            // console.log(error);
        });
}