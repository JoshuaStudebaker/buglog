import Swal from "sweetalert2";

export default class SweetAlert {
  static async sweetDelete(
    title = "Are you sure you want to close this Humbug!?",
    text = "You will no longer be able to edit this or any of its contents!",
    confirm = "Yes, close it down!"
  ) {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#DC3545",
        cancelButtonColor: "#28A745",
        confirmButtonText: confirm,
      });
      if (res.value) {
        return true;
      }
    } catch (error) {}
  }

  static toast(title = "You did a thing", timer = 3000) {
    Swal.fire({
      title: title,
      icon: "success",
      timer: timer,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
    });
  }
}
