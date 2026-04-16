import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@/components/icons/apple-icon';
import { LinuxIcon } from '@/components/icons/linux-icon';
import { WindowsIcon } from '@/components/icons/windows-icon';
import { TERMLNK_LATEST_RELEASE_API_URL, TERMLNK_RELEASES_URL } from '@/lib/github-releases';
import { cn } from '@/lib/utils';

type DownloadKey =
  | 'linux-x64'
  | 'mac-arm64'
  | 'mac-x64'
  | 'windows-x64';

type DownloadLabelKey =
  | 'downloadMenu.linux'
  | 'downloadMenu.macAmd64'
  | 'downloadMenu.macArm64'
  | 'downloadMenu.windows';

type ReleaseStatus = 'error' | 'idle' | 'loading' | 'ready';

interface IDownloadTarget {
  key: DownloadKey;
  labelKey: DownloadLabelKey;
  matcher: RegExp;
  meta: string;
  platform: 'linux' | 'mac' | 'windows';
}

interface IGitHubReleaseAsset {
  browser_download_url: string;
  name: string;
}

interface IGitHubRelease {
  assets?: IGitHubReleaseAsset[];
}

const DOWNLOAD_TARGETS: IDownloadTarget[] = [
  {
    key: 'mac-arm64',
    labelKey: 'downloadMenu.macArm64',
    matcher: /^Termlnk-.+-mac-arm64\.dmg$/i,
    meta: 'arm64',
    platform: 'mac',
  },
  {
    key: 'mac-x64',
    labelKey: 'downloadMenu.macAmd64',
    matcher: /^Termlnk-.+-mac-x64\.dmg$/i,
    meta: 'amd64',
    platform: 'mac',
  },
  {
    key: 'windows-x64',
    labelKey: 'downloadMenu.windows',
    matcher: /^Termlnk-.+-win-x64-setup\.exe$/i,
    meta: 'setup',
    platform: 'windows',
  },
  {
    key: 'linux-x64',
    labelKey: 'downloadMenu.linux',
    matcher: /^Termlnk-.+-linux-x64\.AppImage$/i,
    meta: 'AppImage',
    platform: 'linux',
  },
];

export function DownloadButton() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [assetLinks, setAssetLinks] = useState<Partial<Record<DownloadKey, string>>>({});
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatus>('idle');
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLatestRelease() {
      setReleaseStatus('loading');

      try {
        const response = await fetch(TERMLNK_LATEST_RELEASE_API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`GitHub release request failed: ${response.status}`);

        const release = await response.json() as IGitHubRelease;
        const nextAssetLinks: Partial<Record<DownloadKey, string>> = {};

        for (const target of DOWNLOAD_TARGETS) {
          const asset = release.assets?.find((item) => target.matcher.test(item.name));
          if (asset) nextAssetLinks[target.key] = asset.browser_download_url;
        }

        setAssetLinks(nextAssetLinks);
        setReleaseStatus('ready');
      } catch {
        if (!controller.signal.aborted) setReleaseStatus('error');
      }
    }

    void loadLatestRelease();

    return () => controller.abort();
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handleEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(setOpen, 180, false);
  };

  const renderIcon = (platform: IDownloadTarget['platform']) => {
    if (platform === 'mac') return <AppleIcon size={16} />;
    if (platform === 'windows') return <WindowsIcon size={16} />;
    return <LinuxIcon size={16} />;
  };

  const getMeta = (target: IDownloadTarget) => {
    if (assetLinks[target.key]) return target.meta;
    if (releaseStatus === 'error') return t('downloadMenu.githubReleases');
    if (releaseStatus === 'ready') return t('downloadMenu.unavailable');
    return t('downloadMenu.loadingLatest');
  };

  return (
    <div
      ref={rootRef}
      className="relative z-[160] inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-0 bg-[#fff] px-7 py-3 text-sm font-medium text-[#000] shadow-[0_18px_42px_rgba(255,255,255,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
        aria-expanded={open}
        onFocus={handleEnter}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{t('hero.download')}</span>
        <span className={cn('text-[10px] opacity-65 transition-transform duration-200', { 'rotate-180': open })}>
          ▼
        </span>
      </button>

      <div
        className="pointer-events-none invisible absolute left-1/2 top-[52px] z-[200] w-[300px] origin-top translate-x-[-50%] translate-y-[-8px] scale-[0.98] overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.12)] bg-[rgba(22,20,32,0.94)] p-[5px] opacity-0 shadow-[0_22px_70px_rgba(0,0,0,0.55),inset_0_1px_rgba(255,255,255,0.08)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-[180ms] ease-spring data-[open=true]:pointer-events-auto data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:scale-100 data-[open=true]:opacity-100 data-[open=true]:duration-[220ms]"
        data-open={open}
      >
        {DOWNLOAD_TARGETS.map((target, index) => {
          const directHref = assetLinks[target.key];
          const href = directHref || TERMLNK_RELEASES_URL;
          const isLoading = !directHref && releaseStatus !== 'error' && releaseStatus !== 'ready';

          return (
            <a
              key={target.key}
              href={href}
              target={directHref ? undefined : '_blank'}
              rel={directHref ? undefined : 'noreferrer'}
              aria-disabled={isLoading}
              className={cn(
                'flex translate-y-[-4px] items-center gap-3 rounded-[10px] bg-transparent px-[11px] py-2.5 text-text no-underline opacity-0 transition-[background-color,color,opacity,transform] duration-[180ms] hover:translate-x-0.5 hover:bg-[rgba(255,255,255,0.07)] hover:text-text focus-visible:translate-x-0.5 focus-visible:bg-[rgba(255,255,255,0.07)] focus-visible:text-text focus-visible:outline-none data-[open=true]:translate-y-0 data-[open=true]:opacity-100',
                {
                  'cursor-pointer': !isLoading,
                  'cursor-wait data-[open=true]:opacity-60': isLoading,
                }
              )}
              data-open={open}
              style={{ transitionDelay: open ? `${index * 22}ms` : '0ms' }}
              tabIndex={open ? 0 : -1}
              onClick={(event) => {
                if (isLoading) {
                  event.preventDefault();
                  return;
                }
                setOpen(false);
              }}
            >
              <span className="flex w-[18px] items-center justify-center text-[rgba(255,255,255,0.72)]">
                {renderIcon(target.platform)}
              </span>
              <span className="flex-1 text-left text-[13px]">{t(target.labelKey)}</span>
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.38)]">{getMeta(target)}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
