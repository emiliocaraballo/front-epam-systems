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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const name = ref("");
    const lastname = ref("");
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const localError = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "register-page" }, _attrs))} data-v-411055cf><div class="register-container" data-v-411055cf><div class="header" data-v-411055cf><h2 class="title" data-v-411055cf>Crear cuenta</h2><p class="subtitle" data-v-411055cf>Únete a nuestra comunidad</p></div><form class="form" data-v-411055cf><div class="form-row" data-v-411055cf><div class="form-group" data-v-411055cf><label for="name" data-v-411055cf>Nombre</label><input id="name"${ssrRenderAttr("value", name.value)} type="text" required placeholder="Tu nombre" data-v-411055cf></div><div class="form-group" data-v-411055cf><label for="lastname" data-v-411055cf>Apellido</label><input id="lastname"${ssrRenderAttr("value", lastname.value)} type="text" required placeholder="Tu apellido" data-v-411055cf></div></div><div class="form-group" data-v-411055cf><label for="username" data-v-411055cf>Usuario</label><input id="username"${ssrRenderAttr("value", username.value)} type="text" required placeholder="Nombre de usuario" data-v-411055cf></div><div class="form-group" data-v-411055cf><label for="email" data-v-411055cf>Correo electrónico</label><input id="email"${ssrRenderAttr("value", email.value)} type="email" required placeholder="correo@ejemplo.com" data-v-411055cf></div><div class="form-row" data-v-411055cf><div class="form-group" data-v-411055cf><label for="password" data-v-411055cf>Contraseña</label><input id="password"${ssrRenderAttr("value", password.value)} type="password" required placeholder="Mínimo 6 caracteres" data-v-411055cf></div><div class="form-group" data-v-411055cf><label for="confirmPassword" data-v-411055cf>Confirmar contraseña</label><input id="confirmPassword"${ssrRenderAttr("value", confirmPassword.value)} type="password" required placeholder="Repite tu contraseña" data-v-411055cf></div></div>`);
      if (localError.value || unref(authStore).error) {
        _push(`<div class="error-container" data-v-411055cf>`);
        if (localError.value) {
          _push(`<p class="error" data-v-411055cf>${ssrInterpolate(localError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).error) {
          _push(`<p class="error" data-v-411055cf>${ssrInterpolate(unref(authStore).error)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(authStore).loading) ? " disabled" : ""} class="submit-btn" data-v-411055cf>${ssrInterpolate(unref(authStore).loading ? "Registrando..." : "Crear cuenta")} `);
      if (!unref(authStore).loading) {
        _push(`<span class="icon" data-v-411055cf>→</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></form><div class="login-redirect" data-v-411055cf><p data-v-411055cf>¿Ya tienes una cuenta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "login-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Iniciar sesión`);
          } else {
            return [
              createTextVNode("Iniciar sesión")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-411055cf"]]);

export { register as default };
//# sourceMappingURL=register.vue.mjs.map
