<template>
  <div class="m-3" v-if="playersArray && sponcersArray && board">
    <div>
      <h6 class="lead">اختيار الممولين</h6>
      <div class="d-flex justify-content-around align-items-end">
        <BoardSelect
          label="الممول علي يمين الشاشة"
          icon="bi-arrow-right-circle"
          :board="board"
          :options="sponcers"
          :options-array="sponcersArray"
          team="team1"
          model="sponcer"
        />
        <BoardSelect
          label="الممول علي يسار الشاشة"
          icon="bi-arrow-left-circle"
          :board="board"
          :options="sponcers"
          :options-array="sponcersArray"
          team="team2"
          model="sponcer"
        />
      </div>
    </div>

    <hr />
    <div>
      <h6 class="lead">اختيار لاعبين الفريق الاول</h6>
      <div class="d-flex justify-content-around align-items-end">
        <BoardSelect
          label="اللاعب الاول (اعلي الشاشة)"
          icon="bi-arrow-up-circle"
          :board="board"
          :options="players"
          :options-array="playersArray"
          team="team1"
          model="top"
        />
        <BoardSelect
          label="اللاعب الثاني (اسفل الشاشه)"
          icon="bi-arrow-down-circle"
          :board="board"
          :options="players"
          :options-array="playersArray"
          team="team1"
          model="bottom"
        />
      </div>
    </div>

    <hr />
    <div>
      <h6 class="lead">اختيار لاعبين الفريق الثاني</h6>
      <div class="d-flex justify-content-around align-items-end">
        <BoardSelect
          label="اللاعب الاول (يمين الشاشه)"
          icon="bi-arrow-right-circle"
          :board="board"
          :options="players"
          :options-array="playersArray"
          team="team2"
          model="right"
        />
        <BoardSelect
          label="اللاعب الثاني (يسار الشاشه)"
          icon="bi-arrow-left-circle"
          :board="board"
          :options="players"
          :options-array="playersArray"
          team="team2"
          model="left"
        />
      </div>
    </div>

    <hr />
    <div class="d-flex justify-content-around">
      <label for="opacity" class="form-label d-inline-block"
        >درجة الشفافية : {{ board.opacity }}</label
      >
      <input
        type="range"
        class="form-range d-inline-block"
        style="width: 75%"
        min="0"
        max="100"
        step="5"
        v-model="board.opacity"
        id="opacity"
      />
    </div>

    <div class="text-danger">
      {{ updatingError }}
    </div>

    <div class="text-center">
      <button
        class="btn btn-warning mt-1 px-5"
        :disabled="loadingUpdates"
        @click.prevent="handleUpdate"
      >
        تحديث
        <span
          v-if="loadingUpdates"
          class="spinner-border spinner-border-sm ms-3"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Preview } from "vue-advanced-cropper";
import vSelect from "vue-select";
import BoardSelect from "./BoardSelect.vue";
import useDocument from "@/composables/useDocument";
import { computed, onBeforeUnmount } from "vue";
const props = defineProps(["players", "sponcers", "board", "ENV"]);
const playersArray = computed(() => {
  let result = null;
  if (props.players) {
    result = [
      {
        id: null,
        name: "لا يوجد لاعب",
      },
    ];
    for (let playerId in props.players) {
      result.push(props.players[playerId]);
    }
  }
  return result;
});

const sponcersArray = computed(() => {
  let result = null;
  if (props.sponcers) {
    result = [
      {
        id: null,
        name: "لا يوجد ممول",
      },
    ];
    for (let sponcerId in props.sponcers) {
      result.push(props.sponcers[sponcerId]);
    }
  }
  return result;
});

const {
  error: updatingError,
  isPending: loadingUpdates,
  updateDoc,
} = useDocument("board");

onBeforeUnmount(async () => {
  await updateDoc(props.ENV, props.board);
});
const handleUpdate = async () => {
  await updateDoc(props.ENV, props.board);
};
</script>

<style>
</style>