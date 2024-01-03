<script lang="ts">
  import Downloader from "./lib/Component.svelte";
  import PdfViewer from "./lib/PdfViewer.svelte";

</script>

<main>
  <div style="">
    <PdfViewer url="./default.pdf" showButtons={[]} showBorder={false} data={null} />
  </div>
  <Downloader/>
</main>
