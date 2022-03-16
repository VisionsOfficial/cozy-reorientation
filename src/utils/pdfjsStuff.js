import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import * as worker from "pdfjs-dist/legacy/build/pdf.worker";
import * as workerEntry from "pdfjs-dist/legacy/build/pdf.worker.entry";
import * as sandbox from "pdfjs-dist/legacy/build/pdf.sandbox";

export const getPdfText = async src => {
  return new Promise(res => {
    const fr = new FileReader();
    fr.onload = async function() {
      let typedArray = new Uint8Array(this.result);
      const doc = await pdfjs.getDocument(typedArray).promise;
      const page = await doc.getPage(1);
      const text = await page.getTextContent();
      const items = text.items.map(item => item.str);
      const finalText = items.join("");
      res(finalText);
    };

    fr.readAsArrayBuffer(src);
  });
};

// Unused just to stop linting errors or unused-vars
// Needed for pdfjs to work
export const lintFix = () => {
  const x = {
    worker,
    workerEntry,
    sandbox
  };
  return x;
};
