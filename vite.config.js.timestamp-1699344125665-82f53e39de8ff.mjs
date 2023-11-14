// vite.config.js
import { fileURLToPath, URL } from "node:url";
import AutoImport from "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { ElementPlusResolver } from "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/94901/Desktop/GitHub/ScholarHub-Frontend/vite.config.js";
var vite_config_default = defineConfig({
  // css: {
  //   devSourcemap: true,
  // },
  // 在plugins中配置插件
  plugins: [
    vue(),
    // VueAPI的自动导入
    AutoImport({
      // import目标
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/
        // .vue
      ],
      // 自动导入的包
      imports: ["vue", "vue-router", "@vueuse/core"],
      resolvers: [ElementPlusResolver()]
    }),
    // 组件自动导入
    Components({
      // 文件夹
      dirs: ["src/components"],
      extensions: ["vue"],
      // 支持深度导入
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/
      ],
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true
    }),
    // vite 项目的 template 使用 svg
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定 symbolId 格式，匹配 src/libs/svg-icon/index.vue 中的格式 `#icon-${props.svgName}`
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    // 定义别名
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    // import时可以省略的后缀文件名 from 'ABC.vue'可以写成 from 'ABC'
    extensions: [".js", ",ts", ".json", ".jsx", ".tsx", ".vue"]
  },
  build: {
    minify: "terser",
    // sourcemap: true,
    terserOptions: {
      compress: {
        // 生产环境中移除console.log()和debugger
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw5NDkwMVxcXFxEZXNrdG9wXFxcXEdpdEh1YlxcXFxTY2hvbGFySHViLUZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw5NDkwMVxcXFxEZXNrdG9wXFxcXEdpdEh1YlxcXFxTY2hvbGFySHViLUZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy85NDkwMS9EZXNrdG9wL0dpdEh1Yi9TY2hvbGFySHViLUZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG4vLyBcdTY1MkZcdTYzMDFcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVlbGVtZW50UGx1c1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5cclxuLyoqXHJcbiAqIEBub3RlICAgMjAyMi4xMS4yOFxyXG4gKiBAYXV0aG9yIGNsb3VkLWlyaXNcclxuICogdml0ZVx1OUVEOFx1OEJBNFx1NEUwRFx1NEYxQVx1NTkwNFx1NzQwNlx1NUYwMFx1NTNEMVx1ODAwNVx1NTcyOEg1XHU0RTJEXHU0RTNCXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0c3ZnXHU3N0UyXHU5MUNGXHU1NkZFXHU2ODA3XHVGRjBDXHU0RTVGXHU1QzMxXHU2NjJGXHU4QkY0XHJcbiAqIFx1ODY3RFx1NzEzNlx1NjIxMVx1NEVFQ1x1NjI4QSBzdmcgXHU1NkZFXHU2ODA3XHU2NTNFXHU1MTY1XHU0RTg2XHU5ODc5XHU3NkVFXHU0RTJEXHVGRjBDXHU0RjQ2XHU2NjJGIHZpdGUgXHUyMDFDXHU2NUUwXHU2Q0Q1XHU0RjdGXHU3NTI4XHUyMDFEIFx1NUI4M1x1NEVFQ1xyXG4gKiBcdTk3MDBcdTg5ODFcdTYzMDlcdTcxNjcgdml0ZSBcdTc2ODRcdTYzRDJcdTRFRjZwbHVnaW4sICB2aXRlLXBsdWdpbi1zdmctaWNvbnNcclxuICogcG5wbSBpIHZpdGUtcGx1Z2luLXN2Zy1pY29ucyAtRFxyXG4gKiBcdTVFNzZcdTU3MjggbWFpbi5qcyB2aXRlLmNvbmZpZy5qcyBcdTkxQ0NcdTk3NjJcdTUyMDZcdTUyMkJcdTZDRThcdTUxOENcclxuICovXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cclxuICAgIC8vIGNzczoge1xyXG4gICAgLy8gICBkZXZTb3VyY2VtYXA6IHRydWUsXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIFx1NTcyOHBsdWdpbnNcdTRFMkRcdTkxNERcdTdGNkVcdTYzRDJcdTRFRjZcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB2dWUoKSxcclxuICAgICAgICAvLyBWdWVBUElcdTc2ODRcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgLy8gaW1wb3J0XHU3NkVFXHU2ODA3XHJcbiAgICAgICAgICAgIGluY2x1ZGU6W1xyXG4gICAgICAgICAgICAgICAgL1xcLlt0al1zeD8kLywgLy8gLnRzLCAudHN4LCAuanMsIC5qc3hcclxuICAgICAgICAgICAgICAgIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0XHU1MzA1XHJcbiAgICAgICAgICAgIGltcG9ydHM6Wyd2dWUnLCd2dWUtcm91dGVyJywnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgLy8gXHU3RUM0XHU0RUY2XHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHJcbiAgICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXHJcbiAgICAgICAgICAgIC8vIFx1NjUyRlx1NjMwMVx1NkRGMVx1NUVBNlx1NUJGQ1x1NTE2NVxyXG4gICAgICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXHJcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXS8sXHJcbiAgICAgICAgICAgICAgICAvW1xcXFwvXVxcLmdpdFtcXFxcL10vLFxyXG4gICAgICAgICAgICAgICAgL1tcXFxcL11cXC5udXh0W1xcXFwvXS8sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIC8vIHZpdGUgXHU5ODc5XHU3NkVFXHU3Njg0IHRlbXBsYXRlIFx1NEY3Rlx1NzUyOCBzdmdcclxuICAgICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuICAgICAgICAgICAgLy8gXHU2MzA3XHU1QjlBIHN5bWJvbElkIFx1NjgzQ1x1NUYwRlx1RkYwQ1x1NTMzOVx1OTE0RCBzcmMvbGlicy9zdmctaWNvbi9pbmRleC52dWUgXHU0RTJEXHU3Njg0XHU2ODNDXHU1RjBGIGAjaWNvbi0ke3Byb3BzLnN2Z05hbWV9YFxyXG4gICAgICAgICAgICBzeW1ib2xJZDogJ2ljb24tW25hbWVdJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICAvLyBcdTVCOUFcdTRFNDlcdTUyMkJcdTU0MERcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gaW1wb3J0XHU2NUY2XHU1M0VGXHU0RUU1XHU3NzAxXHU3NTY1XHU3Njg0XHU1NDBFXHU3RjAwXHU2NTg3XHU0RUY2XHU1NDBEIGZyb20gJ0FCQy52dWUnXHU1M0VGXHU0RUU1XHU1MTk5XHU2MjEwIGZyb20gJ0FCQydcclxuICAgICAgICBleHRlbnNpb25zOiBbJy5qcycsJyx0cycsJy5qc29uJywnLmpzeCcsJy50c3gnLCcudnVlJ10sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6e1xyXG4gICAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgICAgLy8gc291cmNlbWFwOiB0cnVlLFxyXG4gICAgICAgIHRlcnNlck9wdGlvbnM6e1xyXG4gICAgICAgICAgICBjb21wcmVzczp7XHJcbiAgICAgICAgICAgICAgICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTRFMkRcdTc5RkJcdTk2NjRjb25zb2xlLmxvZygpXHU1NDhDZGVidWdnZXJcclxuICAgICAgICAgICAgICAgIGRyb3BfY29uc29sZTp0cnVlLFxyXG4gICAgICAgICAgICAgICAgZHJvcF9kZWJ1Z2dlcjp0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcclxuICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxlQUFlLFdBQVc7QUFDcFgsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBRWhCLFNBQVMsMkJBQTJCO0FBV3BDLE9BQU8sVUFBVTtBQUNqQixTQUFTLDRCQUE0QjtBQWxCZ0wsSUFBTSwyQ0FBMkM7QUFxQnRRLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBO0FBQUEsSUFFSixXQUFXO0FBQUE7QUFBQSxNQUVQLFNBQVE7QUFBQSxRQUNKO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFBVTtBQUFBO0FBQUEsTUFDZDtBQUFBO0FBQUEsTUFFQSxTQUFRLENBQUMsT0FBTSxjQUFhLGNBQWM7QUFBQSxNQUMxQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBQUE7QUFBQSxJQUVELFdBQVc7QUFBQTtBQUFBLE1BRVAsTUFBTSxDQUFDLGdCQUFnQjtBQUFBLE1BQ3ZCLFlBQVksQ0FBQyxLQUFLO0FBQUE7QUFBQSxNQUVsQixNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsVUFBVSxZQUFZO0FBQUEsTUFDaEMsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ2pDLHNCQUFzQjtBQUFBLElBQzFCLENBQUM7QUFBQTtBQUFBLElBRUQscUJBQXFCO0FBQUE7QUFBQSxNQUVqQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUE7QUFBQSxJQUVBLFlBQVksQ0FBQyxPQUFNLE9BQU0sU0FBUSxRQUFPLFFBQU8sTUFBTTtBQUFBLEVBQ3pEO0FBQUEsRUFDQSxPQUFNO0FBQUEsSUFDRixRQUFRO0FBQUE7QUFBQSxJQUVSLGVBQWM7QUFBQSxNQUNWLFVBQVM7QUFBQTtBQUFBLFFBRUwsY0FBYTtBQUFBLFFBQ2IsZUFBYztBQUFBLE1BQ2xCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNILFFBQVE7QUFBQSxRQUNKLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNsQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBR0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
