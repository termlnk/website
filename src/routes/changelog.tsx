import type { IReleaseSummary } from '@/lib/github-releases';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, CalendarDays, Download, RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchTermlnkReleases, TERMLNK_RELEASES_URL } from '@/lib/github-releases';

type ReleaseState =
  | { status: 'error'; releases: IReleaseSummary[] }
  | { status: 'loading'; releases: IReleaseSummary[] }
  | { status: 'ready'; releases: IReleaseSummary[] };

export const Route = createFileRoute('/changelog')({
  component: ChangelogPage,
});

function ChangelogPage() {
  const { i18n } = useTranslation();
  const [releaseState, setReleaseState] = useState<ReleaseState>({ releases: [], status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadReleases() {
      setReleaseState((current) => ({ releases: current.releases, status: 'loading' }));

      try {
        const releases = await fetchTermlnkReleases(controller.signal);
        setReleaseState({ releases, status: 'ready' });
      } catch {
        if (!controller.signal.aborted) {
          setReleaseState((current) => ({ releases: current.releases, status: 'error' }));
        }
      }
    }

    void loadReleases();

    return () => controller.abort();
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '112px 24px 96px' }}>
      <section className="mx-auto" style={{ maxWidth: 1120 }}>
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          {releaseState.releases.length > 0 && (
            <ReleaseVersionList
              language={i18n.resolvedLanguage || i18n.language}
              releases={releaseState.releases}
            />
          )}

          <div>
            {releaseState.status === 'loading' && releaseState.releases.length === 0 && <LoadingState />}
            {releaseState.status === 'error' && releaseState.releases.length === 0 && <ErrorState />}
            {releaseState.status === 'ready' && releaseState.releases.length === 0 && <EmptyState />}

            {releaseState.releases.length > 0 && (
              <div className="relative pb-2">
                <div
                  className="absolute bottom-0 top-0 hidden md:block"
                  style={{
                    background: 'linear-gradient(rgba(217,119,87,0.45), rgba(255,255,255,0.06))',
                    left: 0,
                    width: 1,
                  }}
                />
                <div className="grid gap-5 pl-0 md:pl-7">
                  {releaseState.releases.map((release) => (
                    <ReleaseCard
                      key={release.id}
                      language={i18n.resolvedLanguage || i18n.language}
                      release={release}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ReleaseVersionList({ language, releases }: { language: string; releases: IReleaseSummary[] }) {
  const { t } = useTranslation();

  return (
    <aside className="lg:sticky lg:top-24">
      <div
        className="border border-border bg-glass-bg"
        style={{
          borderRadius: 8,
          boxShadow: 'inset 0 1px rgba(255,255,255,0.06)',
          padding: 10,
        }}
      >
        <div
          className="px-2 pb-2 pt-1 uppercase text-muted"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}
        >
          {t('changelog.versions')}
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:grid lg:overflow-visible" aria-label={t('changelog.versions')}>
          {releases.map((release) => (
            <a
              key={release.id}
              className="shrink-0 no-underline transition-colors duration-150 text-muted hover:text-text"
              href={`#${getReleaseDomId(release)}`}
              style={{
                borderRadius: 7,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                lineHeight: 1.35,
                minWidth: 132,
                padding: '9px 10px',
              }}
              onClick={(event) => {
                event.preventDefault();
                scrollToRelease(release);
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = 'transparent';
              }}
            >
              <span className="block text-text">{release.tagName}</span>
              <span className="block truncate" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>
                {formatDate(release.publishedAt, language)}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function ReleaseCard({ language, release }: { language: string; release: IReleaseSummary }) {
  const { t } = useTranslation();
  const publishedLabel = formatDate(release.publishedAt, language);
  const visibleAssets = release.assets.slice(0, 6);

  return (
    <article
      id={getReleaseDomId(release)}
      className="grid gap-4 scroll-mt-28 md:grid-cols-[86px_minmax(0,1fr)]"
    >
      <time
        className="text-muted"
        dateTime={release.publishedAt}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 12, paddingTop: 22 }}
      >
        {publishedLabel}
      </time>

      <div
        className="border border-border bg-glass-bg"
        style={{
          borderRadius: 8,
          boxShadow: '0 24px 80px rgba(0,0,0,0.22), inset 0 1px rgba(255,255,255,0.06)',
          padding: '24px min(5vw, 30px)',
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-text" style={{ fontSize: 24, fontWeight: 620, lineHeight: 1.15, margin: 0 }}>
                {release.name}
              </h2>
              {release.isPrerelease && (
                <span
                  className="text-accent"
                  style={{
                    border: '1px solid rgba(217,119,87,0.34)',
                    borderRadius: 999,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    padding: '2px 8px',
                  }}
                >
                  {t('changelog.prerelease')}
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-muted" style={{ fontSize: 13 }}>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {publishedLabel}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{release.tagName}</span>
            </div>
          </div>

          <a
            className="inline-flex items-center gap-2 no-underline transition-colors duration-150 text-text hover:text-accent"
            href={release.htmlUrl}
            rel="noreferrer"
            target="_blank"
            style={{
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              padding: '9px 11px',
            }}
          >
            {t('changelog.releaseNotes')}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {release.highlights.length > 0 && (
          <ul className="mt-6 grid gap-3" style={{ listStyle: 'none', marginBottom: 0, padding: 0 }}>
            {release.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-muted"
                style={{
                  borderLeft: '2px solid rgba(217,119,87,0.65)',
                  fontSize: 14,
                  lineHeight: 1.7,
                  paddingLeft: 13,
                }}
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {visibleAssets.length > 0 && (
          <div className="mt-7 border-t border-border pt-5">
            <div
              className="mb-3 text-muted uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}
            >
              {t('changelog.downloads')}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {visibleAssets.map((asset) => (
                <a
                  key={asset.name}
                  className="flex min-w-0 items-center gap-2 no-underline transition-colors duration-150 text-muted hover:text-text"
                  href={asset.downloadUrl}
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    fontSize: 12,
                    padding: '9px 10px',
                  }}
                >
                  <Download className="shrink-0" size={14} />
                  <span className="truncate">{asset.name}</span>
                  <span className="ml-auto shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {formatBytes(asset.size)}
                  </span>
                </a>
              ))}
            </div>
            {release.assets.length > visibleAssets.length && (
              <a
                className="mt-3 inline-flex no-underline text-muted hover:text-accent"
                href={release.htmlUrl}
                rel="noreferrer"
                target="_blank"
                style={{ fontSize: 12 }}
              >
                {t('changelog.moreAssets', { count: release.assets.length - visibleAssets.length })}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function getReleaseDomId(release: IReleaseSummary) {
  return `release-${release.tagName.replace(/[^a-z0-9_-]+/gi, '-')}`;
}

function scrollToRelease(release: IReleaseSummary) {
  const id = getReleaseDomId(release);
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

function LoadingState() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 text-muted" style={{ fontSize: 14 }}>
      <RotateCw className="anim-spin" size={16} />
      {t('changelog.loading')}
    </div>
  );
}

function ErrorState() {
  const { t } = useTranslation();

  return (
    <div className="border border-border bg-glass-bg" style={{ borderRadius: 8, padding: 22 }}>
      <h2 className="text-text" style={{ fontSize: 18, margin: 0 }}>{t('changelog.errorTitle')}</h2>
      <p className="text-muted" style={{ fontSize: 14, margin: '8px 0 0' }}>{t('changelog.errorDescription')}</p>
      <a
        className="mt-4 inline-flex items-center gap-2 no-underline text-accent"
        href={TERMLNK_RELEASES_URL}
        rel="noreferrer"
        target="_blank"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
      >
        {t('changelog.viewAll')}
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

function EmptyState() {
  const { t } = useTranslation();

  return (
    <div className="border border-border bg-glass-bg" style={{ borderRadius: 8, padding: 22 }}>
      <h2 className="text-text" style={{ fontSize: 18, margin: 0 }}>{t('changelog.emptyTitle')}</h2>
      <p className="text-muted" style={{ fontSize: 14, margin: '8px 0 0' }}>{t('changelog.emptyDescription')}</p>
    </div>
  );
}

function formatDate(value: string, language: string) {
  if (!value) return '-';

  return new Intl.DateTimeFormat(language, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '-';

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
