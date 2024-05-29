import axios from "axios";
import { env } from "env.mjs";

interface SiteMapRes {
  data: Array<{
    gid: string;
    lastmod: string;
    priority: string;
  }>
}

export const revalidate = 60 * 60 * 24;

export async function getSiteMapsIds() {
  try {
    const response: SiteMapRes = await axios({
      method: 'GET',
      url: '/v2/company/sitemap',
      baseURL: env.NEXT_PUBLIC_API_URL,
      headers: {
        'api-key': env.NEXT_PUBLIC_API_KEY
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export default async function sitemap() {
  const paths = await getSiteMapsIds();

  return paths.data.map(path => ({
    ...path,
    priority: Number(path.priority),
  }))
}