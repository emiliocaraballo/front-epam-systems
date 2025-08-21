import { defineComponent, ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useBookStore } from './books.mjs';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
import 'pinia';
import './server.mjs';
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
  __name: "book-detail",
  __ssrInlineRender: true,
  setup(__props) {
    const bookStore = useBookStore();
    useRouter();
    const review = ref("");
    const rating = ref(0);
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(bookStore).selectedBook) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "book-detail-page" }, _attrs))} data-v-ea3ab678><div class="container" data-v-ea3ab678><button class="back-button" data-v-ea3ab678><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ea3ab678><path d="M19 12H5M12 19l-7-7 7-7" data-v-ea3ab678></path></svg> Volver </button><div class="book-detail-container" data-v-ea3ab678><div class="book-info-section" data-v-ea3ab678><div class="book-cover-large" data-v-ea3ab678><img${ssrRenderAttr("src", unref(bookStore).selectedBook.cover || "/img/default-book-cover.svg")}${ssrRenderAttr("alt", unref(bookStore).selectedBook.title)} data-v-ea3ab678></div><div class="book-details" data-v-ea3ab678><h1 class="book-title" data-v-ea3ab678>${ssrInterpolate(unref(bookStore).selectedBook.title)}</h1>`);
        if (unref(bookStore).selectedBook.author) {
          _push(`<div class="detail-row" data-v-ea3ab678><span class="label" data-v-ea3ab678>Autor:</span><span class="value" data-v-ea3ab678>${ssrInterpolate(unref(bookStore).selectedBook.author)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(bookStore).selectedBook.publishYear) {
          _push(`<div class="detail-row" data-v-ea3ab678><span class="label" data-v-ea3ab678>Año de publicación: </span><span class="value" data-v-ea3ab678>${ssrInterpolate(unref(bookStore).selectedBook.publishYear)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="review-section" data-v-ea3ab678><h2 data-v-ea3ab678>Agregar reseña y calificación</h2><div class="rating-container" data-v-ea3ab678><span class="rating-label" data-v-ea3ab678>Calificación:</span><div class="stars" data-v-ea3ab678><!--[-->`);
        ssrRenderList(5, (star) => {
          _push(`<span class="${ssrRenderClass([{ filled: star <= rating.value }, "star"])}" data-v-ea3ab678> ★ </span>`);
        });
        _push(`<!--]--></div><span class="rating-value" data-v-ea3ab678>${ssrInterpolate(rating.value)}/5</span></div><div class="review-container" data-v-ea3ab678><label for="review" class="review-label" data-v-ea3ab678>Reseña (máximo 500 caracteres):</label><textarea id="review" class="review-textarea" placeholder="Escribe tu reseña sobre este libro..." maxlength="500" rows="5" data-v-ea3ab678>${ssrInterpolate(review.value)}</textarea><div class="character-count" data-v-ea3ab678>${ssrInterpolate(review.value.length)}/500 caracteres</div></div><button class="save-button"${ssrIncludeBooleanAttr(rating.value === 0 || isLoading.value) ? " disabled" : ""} data-v-ea3ab678>`);
        if (isLoading.value) {
          _push(`<span data-v-ea3ab678>Guardando...</span>`);
        } else {
          _push(`<span data-v-ea3ab678>Guardar en Mi Biblioteca</span>`);
        }
        _push(`</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/book-detail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bookDetail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea3ab678"]]);

export { bookDetail as default };
//# sourceMappingURL=book-detail.vue.mjs.map
