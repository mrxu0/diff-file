import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
// import Components from "unplugin-vue-components/vite";
// import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    jsx(),
    // Components({
    //   resolvers: [
    //     IconsResolver({
    //       prefix: "icon",
    //     }),
    //   ],
    // }),
    Icons({
      autoInstall: false,
      compiler: "vue3",
    }),
  ],
});
