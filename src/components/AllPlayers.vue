<template>
  <div class="players m-3">
    <div class="mb-3 d-flex flex-row justify-content-between align-items-end">
      <label for="search" class="form-label d-inline-block me-2">Search</label>
      <input
        type="text"
        v-model="search"
        class="form-control d-inline-block"
        id="search"
        placeholder="search Token"
      />
    </div>
    <p
      dir="rlt"
      class="text-end bg-warning p-1 rounded mb-1"
      style="font-size: 0.9rem"
    >
      <span class="py-1 px-1 rounded" style="background-color: #ddd">
        Ctrl +
        <i class="bi bi-trash3 text-danger p-0 m-0"></i>
      </span>
      لحذف اي لاعب يمكنك الضفط علي

      <i class="bi bi-exclamation-triangle p-1"></i>
    </p>
    <p
      dir="rlt"
      class="text-end bg-warning p-1 rounded mt-1"
      style="font-size: 0.9rem"
    >
      لحذف اي لاعب بالرجاء التأكد من انه غير موجود في البورد لإتاحة حذفه
      <i class="bi bi-exclamation-triangle p-1"></i>
    </p>
    <div
      v-if="filteredPlayers"
      class="grid text-center overflow-scroll"
      style="height: 50vh"
    >
      <template v-for="player in filteredPlayers" :key="player.id">
        <PlayerCard :player="player" :inBoard="ckeckInBoard(player.id)" />
      </template>
    </div>
  </div>
</template>

<script setup>
import PlayerCard from "./PlayerCard.vue";
import { ref, computed } from "vue";
const props = defineProps(["players", "board"]);
const search = ref("");
const filteredPlayers = computed(() => {
  if (props.players) {
    return props.players.filter((player) => {
      return player.name.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    return null;
  }
});
const ckeckInBoard = (id) => {
  for (let dir in props.board) {
    if (props.board[dir] && props.board[dir].id === id) {
      return { inBoard: true, direction: dir };
    }
  }
  return { inBoard: false };
};
</script>

<style>
</style>