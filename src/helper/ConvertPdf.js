import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../assets/fonts/vfs_fonts";
pdfMake.vfs = pdfFonts;

export const downloadPdf = (chat, bot) => {
  try {
    const docDefinition = {
      content: [{ text: "Conversation history", style: "header" }, "\n"],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        name: {
          fontSize: 14,
          color: "#f714eb",
          bold: true,
        },
        message: {
          fontSize: 12,
          color: "#2c2c2c",
          bold: false,
          lineHeight: 1.2,
          marginTop: 4,
        },
        date: {
          marginTop: 5,
          fontSize: 10,
          color: "#787878",
        },
        defaultStyle: {
          font: "Roboto",
        },
      },
    };

    for (let i = 0; i < chat.length; i++) {
      const message = chat[i];
      const name = {
        text: `${message["sender"] === "ChatGPT" ? bot : "You"}: `,
        style: "name",
      };

      // Check if message is defined and not empty
      if (message && message["message"]) {
        const messageText = {
          text: message["message"]
            .replace(/\p{Emoji}/gu, "")
            .replace(/↵↵.*?\./gs, ""),
          style: "message",
        };

        docDefinition.content.push(name);
        docDefinition.content.push(messageText);
        docDefinition.content.push({
          text: message["sendTime"],
          style: "date",
        });
        docDefinition.content.push("\n");
      }
    }

    // Create an instance of pdfMake and download the PDF
    const pdfMakeInstance = pdfMake.createPdf(docDefinition);
    pdfMakeInstance.download("chat.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
