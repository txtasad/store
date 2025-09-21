import Swal from "sweetalert2";

export function DeleteAlert() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You want to Delete this!!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
}
export function UpdateOrderAlert() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You want to Update this Order Status!!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update!",
  });
}
export function DeactivateAlert(status) {
  return Swal.fire({
    title: "Are you sure?",
    text: "A deactivated product won't appear in any search !!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: !status?"Yes, deactivate it!":"Yes, reactivate it!",
  });
}

export function addFavoriteAlert() {
  return Swal.fire({
    title: "Added the template to favorites",
     text: "Template has been successfully added to favorites",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok",
  });
}

export function removeFavoriteAlert() {
  return Swal.fire({
    title: "Remove the template from favorites",
    text: "Template has been successfully remove from favorites",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok",
  });
}
export function addCryptoAlert() {
  return Swal.fire({
    title: "Crypto Transfer",
    text: "Are you sure you want to transfer crypto instead of paying with credit card or other fiat methods?",
    icon: "success",
    confirmButtonColor: "#3085d6",
    showCancelButton: true,
    confirmButtonText: "Yes, transfer crypto assets!",
  });
}

export function confirmCryptoAdrAlert(adr) {
  return Swal.fire({
    title: "Make sure your crypto address is correct!",
    text: "This can not be changed! Your address is \n "+adr,
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, I confirm I have transferred from this address!",
    cancelButtonColor: "#d33",
    cancelButtonText:"No",
    showCancelButton: true,
  });
}

export function requestCancellationCrypto() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You want to cancel this? Assets if tranfered can not be transferred back!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "NO",
    confirmButtonText: "Yes, cancel!",
  });
}