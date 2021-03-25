import * as native from "./native";
import * as memcached from "./mem";

export default process.env.USE_MEMCACHED === "1" ? memcached : native;
