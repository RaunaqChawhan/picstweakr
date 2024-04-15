				import worker, * as OTHER_EXPORTS from "D:\\Learning\\picstweakr\\node_modules\\wrangler\\templates\\pages-template-worker.ts";
				import * as __MIDDLEWARE_0__ from "D:\\Learning\\picstweakr\\node_modules\\wrangler\\templates\\middleware\\middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "D:\\Learning\\picstweakr\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				
				worker.middleware = [
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
					...(worker.middleware ?? []),
				].filter(Boolean);
				
				export * from "D:\\Learning\\picstweakr\\node_modules\\wrangler\\templates\\pages-template-worker.ts";
				export default worker;