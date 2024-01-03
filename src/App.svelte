<script>
  import Component from "./lib/Component.svelte";
  import PdfViewer from "./lib/PdfViewer.svelte";
</script>

<main>
  <PdfViewer url="./default.pdf" showButtons={[]} showBorder={false} data={null} />
  <Component/>
</main>