import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");
    const localError = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-d5cbbaa8><div class="login-container" data-v-d5cbbaa8><div class="header" data-v-d5cbbaa8><h2 class="title" data-v-d5cbbaa8>Iniciar sesión</h2><p class="subtitle" data-v-d5cbbaa8>Bienvenido de vuelta</p></div><form class="form" data-v-d5cbbaa8><div class="form-group" data-v-d5cbbaa8><label for="username" data-v-d5cbbaa8>Nombre de usuario</label><input id="username"${ssrRenderAttr("value", username.value)} type="text" required placeholder="Ingresa tu nombre de usuario" data-v-d5cbbaa8></div><div class="form-group" data-v-d5cbbaa8><label for="password" data-v-d5cbbaa8>Contraseña</label><input id="password"${ssrRenderAttr("value", password.value)} type="password" required placeholder="Ingresa tu contraseña" data-v-d5cbbaa8></div>`);
      if (localError.value || unref(authStore).error) {
        _push(`<div class="error-container" data-v-d5cbbaa8>`);
        if (localError.value) {
          _push(`<p class="error" data-v-d5cbbaa8>${ssrInterpolate(localError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).error) {
          _push(`<p class="error" data-v-d5cbbaa8>${ssrInterpolate(unref(authStore).error)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="submit-btn"${ssrIncludeBooleanAttr(unref(authStore).loading) ? " disabled" : ""} data-v-d5cbbaa8>${ssrInterpolate(unref(authStore).loading ? "Ingresando..." : "Iniciar Sesión")} `);
      if (!unref(authStore).loading) {
        _push(`<span class="icon" data-v-d5cbbaa8>→</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></form><div class="register-redirect" data-v-d5cbbaa8><p data-v-d5cbbaa8>¿No tienes cuenta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "register-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Regístrate aquí`);
          } else {
            return [
              createTextVNode("Regístrate aquí")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5cbbaa8"]]);

export { login as default };
//# sourceMappingURL=login.vue.mjs.map
