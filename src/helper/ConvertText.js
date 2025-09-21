import Blob from "blob";
export const createTextFile = (data, name) => {
  let text = "";

  data.forEach((chat) => {
    text += `${chat["sender"] === "ChatGPT" ? name : "You"}: ${
      chat["message"]
    }\r\n`;
  });

  // Create a Blob object with the text
  const blob = new Blob([text], { type: "text/plain" });
  return blob;
};
export const downloadTextFile = (fileName, content) => {
  const blob = new Blob([content], { type: "text/plain" });

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const handleTextClick = (data, name) => {
  const processedText = data;
  const blob = new Blob([processedText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${name}_chat.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
