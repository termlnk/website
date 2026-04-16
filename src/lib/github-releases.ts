const TERMLNK_RELEASES_API_URL = 'https://api.github.com/repos/termlnk/termlnk/releases?per_page=20';
export const TERMLNK_LATEST_RELEASE_API_URL = 'https://api.github.com/repos/termlnk/termlnk/releases/latest';
export const TERMLNK_RELEASES_URL = 'https://github.com/termlnk/termlnk/releases';

export interface IReleaseAsset {
  downloadUrl: string;
  name: string;
  size: number;
}

export interface IReleaseSummary {
  assets: IReleaseAsset[];
  body: string;
  highlights: string[];
  htmlUrl: string;
  id: number;
  isPrerelease: boolean;
  name: string;
  publishedAt: string;
  tagName: string;
}

interface IGitHubReleaseAssetResponse {
  browser_download_url: string;
  name: string;
  size: number;
}

interface IGitHubReleaseResponse {
  assets?: IGitHubReleaseAssetResponse[];
  body?: string | null;
  draft: boolean;
  html_url: string;
  id: number;
  name?: string | null;
  prerelease: boolean;
  published_at?: string | null;
  tag_name: string;
}

export async function fetchTermlnkReleases(signal?: AbortSignal) {
  const response = await fetch(TERMLNK_RELEASES_API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub releases request failed: ${response.status}`);
  }

  const releases = await response.json() as IGitHubReleaseResponse[];
  return releases
    .filter((release) => !release.draft)
    .map(normalizeRelease);
}

function normalizeRelease(release: IGitHubReleaseResponse): IReleaseSummary {
  const body = release.body?.trim() || '';

  return {
    assets: (release.assets || []).map((asset) => ({
      downloadUrl: asset.browser_download_url,
      name: asset.name,
      size: asset.size,
    })),
    body,
    highlights: extractHighlights(body),
    htmlUrl: release.html_url,
    id: release.id,
    isPrerelease: release.prerelease,
    name: release.name?.trim() || release.tag_name,
    publishedAt: release.published_at || '',
    tagName: release.tag_name,
  };
}

function extractHighlights(markdown: string) {
  const highlights: string[] = [];
  const lines = markdown.split(/\r?\n/);
  let hasEnteredHighlights = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^#{2,3}\s+.*(highlights|core highlights|核心亮点|亮點)/i.test(trimmed)) {
      hasEnteredHighlights = true;
      continue;
    }

    if (hasEnteredHighlights && /^#{2,3}\s+/.test(trimmed)) break;

    if (hasEnteredHighlights && /^[-*]\s+/.test(trimmed)) {
      const text = normalizeMarkdownText(trimmed.replace(/^[-*]\s+/, ''));
      if (text) highlights.push(text);
    }

    if (highlights.length >= 5) break;
  }

  if (highlights.length > 0) return highlights;

  return lines
    .map((line) => normalizeMarkdownText(line.trim().replace(/^>\s*/, '')))
    .filter((line) => line && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('---'))
    .slice(0, 3);
}

function normalizeMarkdownText(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
