<template>
  <div class="m-3" v-if="players && board">
    <template v-for="elm in boardElments" :key="elm.name">
      <div class="d-flex flex-row justify-content-between align-items-end">
        <i
          :class="`bi ${elm.icon} d-inline-block me-3`"
          style="font-size: 3rem"
        ></i>
        <div class="d-inline-block" style="width: 60%">
          <label :for="`select-${elm.model}`" class="form-label"
            >{{ elm.name }} Player Name</label
          >
          <select
            :name="`select-${elm.model}`"
            class="form-select"
            :id="`select-${elm.model}`"
            v-model="board[elm.model]"
            @change="handleUpdate"
          >
            <option :value="null">No Player</option>
            <template v-for="player in players" :key="player.id">
              <option :value="player">{{ player.name }}</option>
            </template>
          </select>
        </div>

        <div class="d-inline-block">
          <preview
            v-if="board[elm.model]"
            :width="70"
            :height="70"
            :image="board[elm.model].image"
            :coordinates="board[elm.model].coordinates"
          />
        </div>
      </div>
      <hr />
    </template>

    <label for="opacity" class="form-label"
      >Opacity range : {{ board.opacity }}</label
    >
    <input
      type="range"
      class="form-range"
      min="0"
      max="100"
      step="5"
      v-model="board.opacity"
      id="opacity"
      @change="handleUpdate"
    />
    <div
      v-if="loadingUpdates"
      class="d-flex justify-content-around align-items-end"
    >
      <h4 class="d-inline-block">Updating ...</h4>
      <div class="spinner-border text-primary d-inline-block" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="text-danger">
      {{ updatingError }}
    </div>
  </div>
</template>

<script setup>
import { Preview } from "vue-advanced-cropper";

import useDocument from "@/composables/useDocument";
const props = defineProps(["players", "board", "ENV"]);

const {
  error: updatingError,
  isPending: loadingUpdates,
  updateDoc,
} = useDocument("board");

const boardElments = [
  { name: "Top", icon: "bi-arrow-up-circle", model: "top" },
  { name: "Bottom", icon: "bi-arrow-down-circle", model: "bottom" },
  { name: "Left", icon: "bi-arrow-left-circle", model: "left" },
  { name: "Right", icon: "bi-arrow-right-circle", model: "right" },
];

const handleUpdate = async () => {
  await updateDoc(props.ENV, props.board);
};
</script>

<style>
</style>