import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";
import { fileURLToPath } from "url";
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const typesArray = await loadFiles(path.join(__dirname, '..', 'schemas'), {extensions: ['js']});

export default mergeTypeDefs(typesArray);