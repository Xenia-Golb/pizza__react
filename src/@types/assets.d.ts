declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}
declare module "lodash/pickBy" {
  import { pickBy } from "lodash";
  export = pickBy;
}
declare module "lodash.debounce";
declare module "lodash/identity";
