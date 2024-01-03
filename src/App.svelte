<script lang="ts">
  import Component from "./lib/Component.svelte";
  import PdfViewer from "./lib/PdfViewer.svelte";

</script>

<main>
  <div style="">
    <PdfViewer url="./default.pdf" showButtons={[]} showBorder={false} data={null} />
  </div>
  <Component/>
</main>

<style>
    /*.draggable {*/
    /*    width: 50px;*/
    /*    height: 50px;*/
    /*    background-color: red;*/
    /*}*/
</style>