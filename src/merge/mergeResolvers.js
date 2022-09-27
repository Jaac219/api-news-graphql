import { mergeResolvers } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";
import { fileURLToPath } from "url";
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolversArray = await loadFiles(path.join(__dirname, '..', 'resolvers'), {extensions: ['js']});   
export default mergeResolvers(resolversArray);