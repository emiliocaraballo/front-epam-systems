import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
import { LogIn, LogOut } from 'lucide-vue-next';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-container" }, _attrs))}><nav class="navbar"><div class="container">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reseña de libros `);
          } else {
            return [
              createTextVNode(" Reseña de libros ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="nav-links">`);
      if (unref(authStore).isAuthenticated) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/my-library",
          class: "nav-link library-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="icon"${_scopeId}>📚</span><span${_scopeId}>Mi Biblioteca</span>`);
            } else {
              return [
                createVNode("span", { class: "icon" }, "📚"),
                createVNode("span", null, "Mi Biblioteca")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(authStore).isAuthenticated) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "nav-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(LogIn), { class: "icon" }, null, _parent2, _scopeId));
              _push2(` Iniciar Sesión `);
            } else {
              return [
                createVNode(unref(LogIn), { class: "icon" }),
                createTextVNode(" Iniciar Sesión ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(authStore).isAuthenticated) {
        _push(`<div class="user-section"><div class="user-info"><span class="user-email">${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.name)}</span></div><button class="nav-link logout">`);
        _push(ssrRenderComponent(unref(LogOut), { class: "icon" }, null, _parent));
        _push(` Cerrar Sesión </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></nav><main class="main-content">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.vue.mjs.map
