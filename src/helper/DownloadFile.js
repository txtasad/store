import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../assets/fonts/vfs_fonts";
pdfMake.vfs = pdfFonts;

// Function to download the file
export const downloadFile = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const stripHTMLTags = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const downloadPdfFile = (textPdf) => {
  const docDefinition = {
    content: [
      {
        text: stripHTMLTags(textPdf),
      },
    ],
  };
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.download("social_content.pdf");
};

export const toDataURL2 = async (src) => {
  var img = new Image();
  img.src = src;
  img.crossOrigin = 'Anonymous';
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var dataURL;
  canvas.height = img.naturalHeight;
  canvas.width = img.naturalWidth;
  ctx.drawImage(img, 0, 0);
  dataURL = canvas.toDataURL();
  return dataURL;
}
