<template>
  <div class="card m-4" v-if="player && player !== -1">
    <div class="card-header">
      Updating
      <span class="mark"
        >{{ player.name }}
        <span v-if="inBoard && inBoard.inBoard" class="mark">
          <i :class="`bi ${icons[inBoard.direction]} d-inline-block `"></i>
        </span>
      </span>
      Image
    </div>
    <div class="card-body">
      <cropper
        ref="cropperElm"
        class="cropper"
        :src="player.image.src"
        :debounce="false"
        :stencil-props="{
          handlers: {},
          movable: false,
          resizable: false,
        }"
        :stencil-size="{
          width: 257,
          height: 257,
        }"
        image-restriction="stencil"
      />
    </div>
    <div class="card-footer">
      <button
        class="btn btn-warning me-2"
        :disabled="updateDataloading || updateBoardloading"
        @click.prevent="handleUpdate"
      >
        Update
        <span
          v-if="updateDataloading || updateBoardloading"
          class="spinner-border spinner-border-sm ms-3"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
      <router-link
        class="btn btn-outline-secondary"
        :to="{ name: 'all-players' }"
        >cancel</router-link
      >
    </div>
  </div>
  <div v-if="player === -1">
    <h3 class="m-3">Oops! :( Player Not Found.</h3>
  </div>
  <div v-if="!player">
    <h3 class="m-3 lead">Loading</h3>
  </div>
  <div class="text-danger">
    <p>{{ updateDataError }}</p>
    <p>{{ updateBoardError }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Cropper } from "vue-advanced-cropper";
import { useRouter } from "vue-router";
import useDocument from "@/composables/useDocument";
const props = defineProps(["players", "board", "id", "ENV"]);
const cropperElm = ref(null);
const router = useRouter();

const player = computed(() => {
  if (props.players) {
    const matches = props.players.filter((player) => {
      return player.id === props.id;
    });
    return matches.length > 0 ? matches[0] : -1;
  } else {
    return null;
  }
});
const inBoard = computed(() => {
  let result = null;
  if (props.board) {
    result = { inBoard: false, direction: [] };
    for (let dir in props.board) {
      if (props.board[dir] && props.board[dir].id === props.id) {
        result.inBoard = true;
        result.direction.push(dir);
      }
    }
  }
  return result;
});

const icons = {
  top: "bi-arrow-up-circle",
  bottom: "bi-arrow-down-circle",
  left: "bi-arrow-left-circle",
  right: "bi-arrow-right-circle",
};

const {
  error: updateDataError,
  isPending: updateDataloading,
  updateDoc,
} = useDocument("players");

const {
  error: updateBoardError,
  isPending: updateBoardloading,
  updateDoc: updateBoard,
} = useDocument("board");

const handleUpdate = async () => {
  const { coordinates } = cropperElm.value.getResult();
  if (inBoard.value.inBoard) {
    inBoard.value.direction.forEach(async (dir) => {
      props.board[dir].coordinates = coordinates;
      await updateBoard(props.ENV, props.board);
    });
  }
  await updateDoc(props.id, { coordinates: coordinates });
  if (!updateDataError.value) {
    router.push({ name: "all-players" });
  }
};
</script>

<style>
.cropper {
  height: 25rem;
  background: #ddd;
}
</style>