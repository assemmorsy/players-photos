import { projectAuth } from "@/firebase/config";
import { ref } from "vue";
const useLogout = () => {
  const error = ref(null);
  const loading = ref(false);
  const logout = async () => {
    error.value = null;
    loading.value = false;
    try {
      error.value = null;
      loading.value = true;
      const res = await projectAuth.signOut();
      error.value = null;
      loading.value = false;

      return res;
    } catch (err) {
      console.log(err);
      error.value = "Error happend during logging out";
      loading.value = false;
    }
  };
  return { error, loading, logout };
};
export default useLogout;
