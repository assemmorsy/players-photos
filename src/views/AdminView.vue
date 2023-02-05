<template>
  <main>
    <div class="card text-left my-5 px-0" style="width: 97%">
      <div class="card-header d-flex flex-row justify-content-between">
        <h2 class="d-inline-block mt-2">لوحة التحكم</h2>
        <button
          class="d-inline-block btn btn-primary px-3"
          @click.prevent="handleLogout"
          :disabled="loading"
        >
          تسجيل خروج
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm ms-3"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      <div class="card-body px-1">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="route.path === '/admin' ? 'active' : ''"
              :to="{ name: 'board' }"
            >
              <i class="bi bi-microsoft"></i>
              <!-- التحكم بالمجلس -->
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="route.path === '/admin/all-players' ? 'active' : ''"
              :to="{ name: 'all-players' }"
            >
              <i class="bi bi-people-fill"></i>
              <!-- جميع اللاعبين -->
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="route.path === '/admin/settings' ? 'active' : ''"
              :to="{ name: 'settings' }"
            >
              <!-- الاعدادات -->

              <i class="bi bi-sliders"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="route.path === '/admin/all-sponcers' ? 'active' : ''"
              :to="{ name: 'all-sponcers' }"
            >
              <!-- جميع الممولين -->
              <i class="bi bi-cash-coin"></i>
            </router-link>
          </li>

          <!-- <li
            class="nav-item"
            v-if="route.path.includes('/admin/update-sponcer')"
          >
            <a
              class="nav-link"
              :class="
                route.path.includes('/admin/update-sponcer') ? 'active' : ''
              "
              >تعديل ممول
            </a>
          </li> -->

          <!-- <li
            class="nav-item"
            v-if="route.path.includes('/admin/update-player')"
          >
            <a
              class="nav-link"
              :class="
                route.path.includes('/admin/update-player') ? 'active' : ''
              "
              >تعديل لاعب</a
            >
          </li> -->
        </ul>
        <router-view
          :players="players"
          :board="board"
          :ENV="ENV"
          :sponcers="sponcers"
        ></router-view>
        <div class="errors text-danger">
          <p>{{ loadingPlayersError }}</p>
          <p>{{ loadingSponcersError }}</p>
          <p>{{ boardError }}</p>
          <p>{{ logoutError }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getCollection from "@/composables/getCollectionAsDictionary";
import getDocument from "@/composables/getDocument";

const ENV = "prod";

const { error: loadingPlayersError, documents: players } =
  getCollection("players");
const { error: loadingSponcersError, documents: sponcers } =
  getCollection("sponcers");
const { error: boardError, doc: board, getDoc } = getDocument("board");
onBeforeMount(async () => {
  await getDoc(ENV);
});
const { error: logoutError, loading, logout } = useLogout();
const route = useRoute();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  if (!logoutError.value) {
    console.log("Successfuly logged out");
    router.push({ name: "login" });
  }
};
</script>

<style scoped>
main {
  background: linear-gradient(to right, #34e89e, #0f3443);
  width: 100vw;
  /* height: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  font-family: "CairoSemiBold";
}
</style>