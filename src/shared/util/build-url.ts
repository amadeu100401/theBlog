type QueryParams = Record<string, string | number | boolean | undefined | null>;

export function buildUrl(endpoint: string, params?: QueryParams): string {
  const baseUrl = process.env.BASE_URL as string;

  const cleanBaseUrl = baseUrl.trim();
  const cleanEndpoint = endpoint.trim();

  const url = new URL(cleanEndpoint, cleanBaseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}
