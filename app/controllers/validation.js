function Validation() {
    //Phương thức
    //kiểm tra ô nhập liệu có bỏ trống hay ko
    this.checkEmpty = function (inputval, spanID, message) {
        //trim() xoá khoảng trắng trước và sau chuỗi
        if (inputval.trim() == "") {
            //khong hop le
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        } else {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }

    //kiểm tra mã trùng
    this.checkID = function (inputval, spanID, message, mang) {
        //kiểm tra mã đã tồn tại trong mảng ?
        var isExist = false;
        //some -> return gái trị true/false dựa vào biểu thức so sánh
        isExist = mang.some(function (item) {
            return item.taiKhoan === inputval.trim()
        });
        if (isExist) {
            //mã bị trùng
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        } else {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }

    //Kiểm tra tên
    this.checkName = function (inputval, spanID, message, mang) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if (pattern.test(inputval)) {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //KO hop le
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        }
    }
    
    //Kiểm tra Email
    this.checkEmail = function (inputval, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputval.match(pattern)) {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //KO hop le
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        }
    }

    //Kiểm tra loại
    this.checkDropdown = function (selID, spanID, message) {
        var optIndex = document.getElementById(selID).selectedIndex;
        
        if (optIndex != 0) {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //KO hop le
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        }
    }

    //Kiểm tra mk
    this.checkpass = function (inputval, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,8}$/;
        if (inputval.match(pattern)) {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //KO hop le
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        }
    }

    //Kiểm tra moTa
    this.checkmoTa = function (inputval, spanID, message) {
        if (inputval.length <= 60) {
            //hop le
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //KO hop le
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "inline-block";
            return false;
        }
    }
}