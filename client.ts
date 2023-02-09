import createClient from "@sanity/client"
import imageUrlBuilder  from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


export const client = createClient({
    projectId : process.env.SANITY_PROJECT_ID,
    dataset : "production",
    apiVersion : "2022-02-01",
    useCdn : true,
    token : process.env.SANITY_TOKEN
})

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);