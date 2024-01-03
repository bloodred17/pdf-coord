<script lang="ts">
  import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
  import {canvasDimensionStore, type Coordinate, effectivePointerStore, viewportStore} from "./stores/store";
  import {onMount} from "svelte";
  import type {PageViewport} from "pdfjs-dist";

  const pdfPos: Coordinate = {x: 0, y: 0};

  let pdfDoc;
  let pages: any[];

  let viewport: PageViewport;
  viewportStore.subscribe((_viewport) => {
    viewport = _viewport;
    console.log(viewport)
  });

  window.addEventListener("click", (event) => {
    console.log(event.offsetX, event.offsetY);
  });

  // canvasDimensionStore.subscribe((canvasDimension) => {
  //   console.log("Canvas: ", canvasDimension)
  // })

  const adjustWebPos = (coord: Coordinate) => {
    // const offset = 0.75 * 10; // px
    const offset = 0; // px
    coord.y += offset;
    coord.x += offset;

    // const multiplier = 1.5
    // coord.x /= multiplier;
    // coord.y /= multiplier;
  }

  effectivePointerStore.subscribe((_pos: Coordinate) => {
    const pos = JSON.parse(JSON.stringify(_pos));
    console.log("actual pos: ", pos)
    adjustWebPos(pos);
    console.log("calculated pos: ", pos)

    if (viewport?.viewBox) {
      // const firstPage = pages?.at(0);
      // const { width, height } = firstPage.getSize()
      const [x, y, width, height] = viewport?.viewBox;
      // pdfPos.y = height - pos.y;
      pdfPos.y = height - ((pos.y * height) / viewport?.height);
      pdfPos.x = (pos.x * width) / viewport?.width;
      adjustPdfPos(pdfPos)
      console.log("pdf pos: ", pdfPos)
    }

  })

  const adjustPdfPos = (coord: Coordinate) => {
    const offset = {x: 0, y: 0}
    // coord.x *= 0.72;
    // coord.y *= 0.50;
    coord.x += offset.x;
    coord.y += offset.y;
  }

  // onMount(async () => {
  //   const url = './default.pdf'
  //   const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  //
  //   pdfDoc = await PDFDocument.load(existingPdfBytes)
  //   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  //
  //   pages = pdfDoc.getPages()
  // })


  async function modifyPdf() {
    const url = './default.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()

    firstPage.drawText('Hello world', {
      x: pdfPos.x,
      y: pdfPos.y,
      size: 11,
      // font: helveticaFont,
      color: rgb(0, 0, 1),
      // rotate: degrees(-45),
    })

    // const coordinates: Coordinate[] = [
    //   // {x: 0, y: height/2},
    //   // {x: 0, y: height/3},
    //   // {x: 0, y: height/4},
    //   // {x: 0, y: height/5},
    //   // {x: 0, y: height/6},
    //   {x: 0, y: 100},
    //   {x: 0, y: 200},
    //   {x: 0, y: 300},
    //   {x: 0, y: 400},
    //   {x: 0, y: 500},
    //   {x: 0, y: 600},
    //   {x: 0, y: 700},
    //   {x: 0, y: 800},
    // ]

    // for (const coordinate of coordinates) {
    //   firstPage.drawText(`Position: ${coordinate.x}, ${coordinate.y}`, {
    //     x: coordinate.x,
    //     y: coordinate.y,
    //   })
    // }

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

<button on:click={() => downloadData("hello.pdf")}>Download</button>