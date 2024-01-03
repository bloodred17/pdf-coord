<script lang="ts">
  import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


  async function modifyPdf() {
    const url = './default.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 0,
      y: 0,
      size: 50,
      // font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
      // rotate: degrees(-45),
    })

    const pdfBytes = await pdfDoc.save()
    return pdfBytes;
  }

  async function downloadData(name: string){
    const data = await modifyPdf();
    const blob = new Blob([data]);

    const a = document.createElement('a');
    document.body.append(a);

    a.download = name;

    a.href = URL.createObjectURL(blob);

    a.click();

    a.remove();

  }
</script>

<button on:click={() => downloadData("hello.pdf")}>Hello</button>