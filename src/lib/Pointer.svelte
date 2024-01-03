<script lang="ts">
  import interact from 'interactjs';
  import {createEventDispatcher} from "svelte";
  import {type Coordinate, effectivePointerStore} from "./stores/store";

  const dispatch = createEventDispatcher();
  const position: Coordinate = { x: 0, y: 0 }

  const effectivePos = (coordinate: Coordinate) => {
    const modifier = 10;
    effectivePointerStore.set({
      x: coordinate?.x,
      y: coordinate?.y
    })
  }

  interact('.draggable').draggable({
    listeners: {
      end (event) {
        console.log(event)
        effectivePos(event.page)
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy

        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },
    }
  })
</script>


<div class="draggable"></div>