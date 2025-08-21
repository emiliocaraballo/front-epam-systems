import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, computed, mergeProps, useSSRContext, withCtx, createVNode, createTextVNode, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useBookStore } from './books.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
import { storeToRefs } from 'pinia';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditBookModal",
  __ssrInlineRender: true,
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "saved"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useBookStore();
    const rating = ref(props.book.rating || 0);
    const hoverRating = ref(0);
    const review = ref(props.book.review || "");
    const loading = ref(false);
    const error = ref("");
    const showSuccess = ref(false);
    const isValid = computed(() => {
      return rating.value > 0 && review.value.trim().length >= 10;
    });
    const validationMessage = computed(() => {
      if (rating.value === 0) return "Debes seleccionar una calificación";
      if (review.value.trim().length < 10) return "La review debe tener al menos 10 caracteres";
      return "";
    });
    function getRatingText(value) {
      const texts = {
        1: "Malo",
        2: "Regular",
        3: "Bueno",
        4: "Muy bueno",
        5: "Excelente"
      };
      return texts[value] || "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "edit-modal" }, _attrs))} data-v-46748ccf><div class="modal-content" data-v-46748ccf><button class="close-button" data-v-46748ccf>×</button><div class="edit-form" data-v-46748ccf><h2 data-v-46748ccf>Editar Libro</h2><div class="book-info" data-v-46748ccf><h3 data-v-46748ccf>${ssrInterpolate(__props.book.title)}</h3><p data-v-46748ccf>${ssrInterpolate(__props.book.author)}</p></div><div class="rating-section" data-v-46748ccf><h4 data-v-46748ccf>Calificación</h4><div class="rating" data-v-46748ccf><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<span class="${ssrRenderClass([{
          active: i <= rating.value,
          "hover-active": i <= hoverRating.value
        }, "star"])}" data-v-46748ccf> ★ </span>`);
      });
      _push(`<!--]-->`);
      if (rating.value > 0) {
        _push(`<span class="rating-text" data-v-46748ccf>${ssrInterpolate(getRatingText(rating.value))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="review-section" data-v-46748ccf><h4 data-v-46748ccf>Review</h4><textarea class="review-textarea" placeholder="Escribe tu review (máximo 500 caracteres)" maxlength="500" data-v-46748ccf>${ssrInterpolate(review.value)}</textarea><p class="char-count" data-v-46748ccf>${ssrInterpolate(review.value.length)}/500</p></div>`);
      if (!isValid.value && !error.value) {
        _push(`<div class="validation-message" data-v-46748ccf>${ssrInterpolate(validationMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="error-message" data-v-46748ccf>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showSuccess.value) {
        _push(`<div class="success-message" data-v-46748ccf> ¡Cambios guardados exitosamente! </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="save-button"${ssrIncludeBooleanAttr(loading.value || !isValid.value && !error.value) ? " disabled" : ""} data-v-46748ccf>`);
      if (loading.value) {
        _push(`<span data-v-46748ccf>Guardando...</span>`);
      } else {
        _push(`<span data-v-46748ccf>Guardar Cambios</span>`);
      }
      _push(`</button></div></div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EditBookModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-46748ccf"]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "confirm-dialog" }, _attrs))} data-v-1e97acc8><div class="dialog-content" data-v-1e97acc8><h3 data-v-1e97acc8>${ssrInterpolate(__props.title)}</h3><p data-v-1e97acc8>${ssrInterpolate(__props.message)}</p><div class="dialog-actions" data-v-1e97acc8><button class="cancel-button" data-v-1e97acc8> Cancelar </button><button class="confirm-button" data-v-1e97acc8> Confirmar </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConfirmDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConfirmDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1e97acc8"]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "my-library",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useBookStore();
    const selectedBook = ref(null);
    const bookToDelete = ref(null);
    const showDeleteConfirm = ref(false);
    const showSuccess = ref(false);
    const successMessage = ref("");
    function showSuccessMessage(message) {
      successMessage.value = message;
      showSuccess.value = true;
      setTimeout(() => {
        showSuccess.value = false;
        successMessage.value = "";
      }, 3e3);
    }
    const filters = ref({
      title: "",
      author: "",
      excludeNoReview: false,
      sortByRating: ""
    });
    const { myLibrary, loading, error } = storeToRefs(store);
    const hasFilters = computed(() => {
      return filters.value.title !== "" || filters.value.author !== "" || filters.value.excludeNoReview || filters.value.sortByRating !== "";
    });
    const deleteMessage = computed(() => {
      if (!bookToDelete.value) return "";
      return `¿Estás seguro de que deseas eliminar el libro "${bookToDelete.value.title}" de tu biblioteca?`;
    });
    async function loadLibrary() {
      await store.getMyLibrary();
    }
    async function confirmDelete() {
      if (!bookToDelete.value) return;
      try {
        await store.deleteBook(bookToDelete.value._id);
        await loadLibrary();
        showDeleteConfirm.value = false;
        showSuccessMessage("Libro eliminado exitosamente");
        bookToDelete.value = null;
      } catch (error2) {
        console.error("Error al eliminar el libro:", error2);
      }
    }
    async function handleBookUpdated() {
      selectedBook.value = null;
      await loadLibrary();
      showSuccessMessage("Libro actualizado exitosamente");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_EditBookModal = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "library-page" }, _attrs))} data-v-31f31fbc>`);
      if (showSuccess.value) {
        _push(`<div class="success-message" data-v-31f31fbc><span class="success-icon" data-v-31f31fbc>✓</span> ${ssrInterpolate(successMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-31f31fbc><div class="library-header" data-v-31f31fbc><div class="header-content" data-v-31f31fbc><h1 data-v-31f31fbc><span class="icon" data-v-31f31fbc>📚</span> Mi Biblioteca</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "button back-button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="button-icon" data-v-31f31fbc${_scopeId}>←</span> Volver al Buscador `);
          } else {
            return [
              createVNode("span", { class: "button-icon" }, "←"),
              createTextVNode(" Volver al Buscador ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="filters-section" data-v-31f31fbc><h2 data-v-31f31fbc>Filtrar y ordenar</h2><div class="filters" data-v-31f31fbc><div class="form-row" data-v-31f31fbc><div class="form-group" data-v-31f31fbc><label for="title" data-v-31f31fbc>Título</label><input id="title"${ssrRenderAttr("value", filters.value.title)} type="text" placeholder="Buscar por título" class="filter-input" data-v-31f31fbc></div><div class="form-group" data-v-31f31fbc><label for="author" data-v-31f31fbc>Autor</label><input id="author"${ssrRenderAttr("value", filters.value.author)} type="text" placeholder="Buscar por autor" class="filter-input" data-v-31f31fbc></div></div><div class="form-row" data-v-31f31fbc><div class="form-group" data-v-31f31fbc><label for="rating" data-v-31f31fbc>Ordenar por Calificación</label><select id="rating" class="filter-select" data-v-31f31fbc><option value="" data-v-31f31fbc${ssrIncludeBooleanAttr(Array.isArray(filters.value.sortByRating) ? ssrLooseContain(filters.value.sortByRating, "") : ssrLooseEqual(filters.value.sortByRating, "")) ? " selected" : ""}>Sin orden</option><option value="asc" data-v-31f31fbc${ssrIncludeBooleanAttr(Array.isArray(filters.value.sortByRating) ? ssrLooseContain(filters.value.sortByRating, "asc") : ssrLooseEqual(filters.value.sortByRating, "asc")) ? " selected" : ""}>Menor a Mayor</option><option value="desc" data-v-31f31fbc${ssrIncludeBooleanAttr(Array.isArray(filters.value.sortByRating) ? ssrLooseContain(filters.value.sortByRating, "desc") : ssrLooseEqual(filters.value.sortByRating, "desc")) ? " selected" : ""}>Mayor a Menor</option></select></div><div class="form-group checkbox-group" data-v-31f31fbc><label class="checkbox-label" data-v-31f31fbc><input${ssrIncludeBooleanAttr(Array.isArray(filters.value.excludeNoReview) ? ssrLooseContain(filters.value.excludeNoReview, null) : filters.value.excludeNoReview) ? " checked" : ""} type="checkbox" class="checkbox-input" data-v-31f31fbc><span class="checkmark" data-v-31f31fbc></span> Excluir libros sin review </label></div></div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-31f31fbc><div class="spinner" data-v-31f31fbc></div><p data-v-31f31fbc>Cargando tu biblioteca...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-state" data-v-31f31fbc><span class="error-icon" data-v-31f31fbc>⚠️</span><p data-v-31f31fbc>${ssrInterpolate(unref(error))}</p><button class="button retry-button" data-v-31f31fbc>Reintentar</button></div>`);
      } else if (unref(myLibrary).length === 0) {
        _push(`<div class="empty-state" data-v-31f31fbc><div class="empty-icon" data-v-31f31fbc>📖</div><h3 data-v-31f31fbc>Tu biblioteca está vacía</h3><p data-v-31f31fbc>Comienza agregando libros desde el buscador</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "button primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Explorar libros`);
            } else {
              return [
                createTextVNode("Explorar libros")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="book-grid-container" data-v-31f31fbc><div class="results-info" data-v-31f31fbc><p data-v-31f31fbc>Mostrando ${ssrInterpolate(unref(myLibrary).length)} libro(s)</p>`);
        if (hasFilters.value) {
          _push(`<button class="clear-filters" data-v-31f31fbc> Limpiar filtros </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="book-grid" data-v-31f31fbc><!--[-->`);
        ssrRenderList(unref(myLibrary), (book) => {
          _push(`<div class="book-card" data-v-31f31fbc><div class="card-content" data-v-31f31fbc><div class="cover-container" data-v-31f31fbc>`);
          if (book.cover) {
            _push(`<img${ssrRenderAttr("src", book.cover)}${ssrRenderAttr("alt", book.title)} class="book-cover" data-v-31f31fbc>`);
          } else {
            _push(`<div class="cover-placeholder" data-v-31f31fbc><span class="placeholder-icon" data-v-31f31fbc>📚</span></div>`);
          }
          if (book.rating) {
            _push(`<div class="book-rating-badge" data-v-31f31fbc>${ssrInterpolate(book.rating)}/5 </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="book-info" data-v-31f31fbc><h3 class="book-title" data-v-31f31fbc>${ssrInterpolate(book.title)}</h3><p class="book-author" data-v-31f31fbc>${ssrInterpolate(book.author)}</p>`);
          if (book.rating) {
            _push(`<div class="rating-section" data-v-31f31fbc><div class="rating" data-v-31f31fbc><!--[-->`);
            ssrRenderList(5, (i) => {
              _push(`<span class="${ssrRenderClass([{ active: i <= (book.rating || 0) }, "star"])}" data-v-31f31fbc> ★ </span>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<div class="no-rating" data-v-31f31fbc><span class="no-rating-text" data-v-31f31fbc>Sin calificación</span></div>`);
          }
          if (book.review) {
            _push(`<div class="review-section" data-v-31f31fbc><p class="review-label" data-v-31f31fbc>Reseña:</p><p class="review-text" data-v-31f31fbc>${ssrInterpolate(book.review)}</p></div>`);
          } else {
            _push(`<div class="no-review" data-v-31f31fbc><span class="no-review-text" data-v-31f31fbc>Sin reseña</span></div>`);
          }
          _push(`<div class="actions" data-v-31f31fbc><button class="button edit-button" data-v-31f31fbc><span class="button-icon" data-v-31f31fbc>✏️</span> Editar </button><button class="button danger-button" data-v-31f31fbc><span class="button-icon" data-v-31f31fbc>🗑️</span> Eliminar </button></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      if (selectedBook.value) {
        _push(ssrRenderComponent(_component_EditBookModal, {
          book: selectedBook.value,
          onClose: ($event) => selectedBook.value = null,
          onSaved: handleBookUpdated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ConfirmDialog, {
        show: showDeleteConfirm.value,
        title: "Confirmar eliminación",
        message: deleteMessage.value,
        onConfirm: confirmDelete,
        onCancel: ($event) => showDeleteConfirm.value = false
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-library.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const myLibrary = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31f31fbc"]]);

export { myLibrary as default };
//# sourceMappingURL=my-library.vue.mjs.map
