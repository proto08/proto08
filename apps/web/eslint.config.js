import { globalIgnores } from "eslint/config"
import { config } from "@workspace/eslint-config/react-internal"

/** @type {import("eslint").Linter.Config[]} */
export default [...config, globalIgnores(["dist/**", "src/routeTree.gen.ts"])]
