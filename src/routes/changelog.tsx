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
    <main className="min-h-dvh px-6 pb-24 pt-28">
      <section className="mx-auto max-w-[1200px]">
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
                <div className="absolute bottom-0 top-0 hidden w-px bg-gradient-to-b from-accent/45 to-border md:block" />
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
      <div className="rounded-lg border border-border bg-glass-bg p-2.5 shadow-[inset_0_1px_var(--t-glass-highlight)]">
        <div className="px-2 pb-2 pt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          {t('changelog.versions')}
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:grid lg:overflow-visible" aria-label={t('changelog.versions')}>
          {releases.map((release) => (
            <a
              key={release.id}
              className="shrink-0 rounded-[7px] font-mono text-xs leading-[1.35] no-underline text-muted transition-colors duration-150 hover:bg-surface-raised hover:text-text"
              href={`#${getReleaseDomId(release)}`}
              style={{ minWidth: 132, padding: '9px 10px' }}
              onClick={(event) => {
                event.preventDefault();
                scrollToRelease(release);
              }}
            >
              <span className="block text-text">{release.tagName}</span>
              <span className="block truncate text-[11px] text-muted/50">
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
        className="font-mono text-xs text-muted"
        dateTime={release.publishedAt}
        style={{ paddingTop: 22 }}
      >
        {publishedLabel}
      </time>

      <div className="rounded-lg border border-border bg-glass-bg p-6 shadow-[0_24px_80px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="m-0 text-2xl font-semibold leading-[1.15] text-text">
                {release.name}
              </h2>
              {release.isPrerelease && (
                <span className="rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[11px] text-accent">
                  {t('changelog.prerelease')}
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {publishedLabel}
              </span>
              <span className="font-mono">{release.tagName}</span>
            </div>
          </div>

          <a
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 font-mono text-xs no-underline text-text transition-colors duration-150 hover:text-accent"
            href={release.htmlUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t('changelog.releaseNotes')}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {release.highlights.length > 0 && (
          <ul className="mb-0 mt-6 grid gap-3 p-0" style={{ listStyle: 'none' }}>
            {release.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l-2 border-accent/60 pl-3.5 text-sm leading-[1.7] text-muted"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {visibleAssets.length > 0 && (
          <div className="mt-7 border-t border-border pt-5">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {t('changelog.downloads')}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {visibleAssets.map((asset) => (
                <a
                  key={asset.name}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-border px-2.5 py-2.5 text-xs no-underline text-muted transition-colors duration-150 hover:text-text"
                  href={asset.downloadUrl}
                >
                  <Download className="shrink-0" size={14} />
                  <span className="truncate">{asset.name}</span>
                  <span className="ml-auto shrink-0 text-muted/50">
                    {formatBytes(asset.size)}
                  </span>
                </a>
              ))}
            </div>
            {release.assets.length > visibleAssets.length && (
              <a
                className="mt-3 inline-flex text-xs no-underline text-muted hover:text-accent"
                href={release.htmlUrl}
                rel="noreferrer"
                target="_blank"
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
    <div className="flex items-center gap-3 text-sm text-muted">
      <RotateCw className="anim-spin" size={16} />
      {t('changelog.loading')}
    </div>
  );
}

function ErrorState() {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-border bg-glass-bg p-5">
      <h2 className="m-0 text-lg text-text">{t('changelog.errorTitle')}</h2>
      <p className="mt-2 text-sm text-muted">{t('changelog.errorDescription')}</p>
      <a
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs no-underline text-accent"
        href={TERMLNK_RELEASES_URL}
        rel="noreferrer"
        target="_blank"
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
    <div className="rounded-lg border border-border bg-glass-bg p-5">
      <h2 className="m-0 text-lg text-text">{t('changelog.emptyTitle')}</h2>
      <p className="mt-2 text-sm text-muted">{t('changelog.emptyDescription')}</p>
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
