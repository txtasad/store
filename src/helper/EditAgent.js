import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../helper/BackendConnect";
import { getAllChattingImageAssistantReq } from "../API/Api";
const BASE_URL = getBaseUrl();
export async function EditAgent(id) {
  const { value: formValues } = await Swal.fire({
    title: "Change  Title",
    html: '<input id="swal-title" class="swal2-input" placeholder="Your card title">',

    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Update",
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
    preConfirm: () => {
      const title = document.getElementById("swal-title").value;
      if (!title) {
        Swal.showValidationMessage("Please enter your card title");
        return false;
      }
      return {
        title: title,
        id: id,
      };
    },
  });

  if (formValues) {
    axios
      .post(BASE_URL + "editImageChatAgentTitle", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        getAllChattingImageAssistantReq();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
