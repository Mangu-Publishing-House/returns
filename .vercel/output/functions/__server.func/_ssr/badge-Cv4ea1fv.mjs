import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as cn } from "./progress-B2fNqhk8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Cv4ea1fv.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "ink", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-medium tracking-wide", {
			ink: "bg-ink text-bg-elevated",
			sage: "bg-sage/15 text-sage",
			amber: "bg-amber/15 text-amber",
			brick: "bg-brick/12 text-brick",
			muted: "bg-surface text-muted",
			rail: "bg-rail-active text-rail-muted"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
