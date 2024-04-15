import { onRequestPost as __api_describe_ts_onRequestPost } from "D:\\Learning\\picstweakr\\functions\\api\\describe.ts"
import { onRequestPost as __api_fiction_ts_onRequestPost } from "D:\\Learning\\picstweakr\\functions\\api\\fiction.ts"
import { onRequestPost as __api_image_ts_onRequestPost } from "D:\\Learning\\picstweakr\\functions\\api\\image.ts"

export const routes = [
    {
      routePath: "/api/describe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_describe_ts_onRequestPost],
    },
  {
      routePath: "/api/fiction",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_fiction_ts_onRequestPost],
    },
  {
      routePath: "/api/image",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_image_ts_onRequestPost],
    },
  ]