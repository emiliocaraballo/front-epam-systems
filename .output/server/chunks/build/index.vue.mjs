import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useBookStore } from './books.mjs';
import { useRouter } from 'vue-router';
import { u as useAuthStore } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
import 'pinia';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    const bookStore = useBookStore();
    const query = ref("");
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-page" }, _attrs))} data-v-58d9acf1><div class="search-container" data-v-58d9acf1><div class="header" data-v-58d9acf1><h1 class="title" data-v-58d9acf1>Reseñas de Libros</h1><p class="subtitle" data-v-58d9acf1>Descubre y explora miles de libros</p></div><div class="search-box" data-v-58d9acf1><div class="search-input-container" data-v-58d9acf1><svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-58d9acf1><circle cx="11" cy="11" r="8" data-v-58d9acf1></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-58d9acf1></line></svg><input${ssrRenderAttr("value", query.value)} type="text" class="search-input" placeholder="Escribe el título, autor o género de un libro..." data-v-58d9acf1><button class="search-button"${ssrIncludeBooleanAttr(!query.value.trim()) ? " disabled" : ""} data-v-58d9acf1> Buscar </button></div></div>`);
      if (unref(bookStore).recentSearches.length) {
        _push(`<div class="recent-searches-section" data-v-58d9acf1><div class="section-header" data-v-58d9acf1><h3 data-v-58d9acf1>Búsquedas recientes</h3></div><div class="tags-container" data-v-58d9acf1><!--[-->`);
        ssrRenderList(unref(bookStore).recentSearches.slice(0, 8), (search, index) => {
          _push(`<span class="search-tag" data-v-58d9acf1>${ssrInterpolate(search)} <span class="tag-close" data-v-58d9acf1> × </span></span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(bookStore).loading) {
        _push(`<div class="loading-section" data-v-58d9acf1><div class="loader" data-v-58d9acf1></div><p data-v-58d9acf1>Buscando libros...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(bookStore).error) {
        _push(`<div class="error-message" data-v-58d9acf1><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-58d9acf1><circle cx="12" cy="12" r="10" data-v-58d9acf1></circle><line x1="12" y1="8" x2="12" y2="12" data-v-58d9acf1></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-58d9acf1></line></svg><p data-v-58d9acf1>${ssrInterpolate(unref(bookStore).error)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(bookStore).searchResults.length) {
        _push(`<div class="results-section" data-v-58d9acf1><div class="section-header" data-v-58d9acf1><h3 data-v-58d9acf1>Resultados de búsqueda</h3><span class="results-count" data-v-58d9acf1>${ssrInterpolate(unref(bookStore).searchResults.length)} libros encontrados</span></div><div class="books-grid" data-v-58d9acf1><!--[-->`);
        ssrRenderList(unref(bookStore).searchResults, (book) => {
          _push(`<div class="book-card" data-v-58d9acf1><div class="book-cover" data-v-58d9acf1><img${ssrRenderAttr("src", book.cover || "/img/default-book-cover.svg")} alt="Portada del libro" data-v-58d9acf1><div class="book-overlay" data-v-58d9acf1><span data-v-58d9acf1>Ver detalles</span></div></div><div class="book-info" data-v-58d9acf1><h4 class="book-title" data-v-58d9acf1>${ssrInterpolate(book.title)}</h4>`);
          if (book.author) {
            _push(`<p class="book-author" data-v-58d9acf1>${ssrInterpolate(book.author)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (book.publishYear) {
            _push(`<p class="book-year" data-v-58d9acf1>${ssrInterpolate(book.publishYear)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(bookStore).loading && !unref(bookStore).searchResults.length && !unref(bookStore).error) {
        _push(`<div class="empty-state" data-v-58d9acf1><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-58d9acf1><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" data-v-58d9acf1></path></svg><h3 data-v-58d9acf1>Comienza a explorar libros</h3><p data-v-58d9acf1>Busca por título, autor o género para descubrir nuevos libros.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-58d9acf1"]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map
