import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoopingClip } from './LoopingClip';

const media = { src: '/media/clip.jpg', video: '/media/clip.mp4', alt: 'The card flipping open' };

const mockReducedMotion = (reduce: boolean) =>
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) => ({ matches: reduce, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn() }) as unknown as MediaQueryList,
  );

// Every observed clip reports itself on screen.
class OnScreenObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = () => this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  disconnect = vi.fn();
}

const { IntersectionObserver: SetupObserver } = window;
beforeEach(() => {
  window.IntersectionObserver = OnScreenObserver as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  window.IntersectionObserver = SetupObserver;
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe('LoopingClip', () => {
  it('plays the video with its still as the poster and describes it for screen readers', () => {
    const { container } = render(<LoopingClip media={media} />);
    const video = container.querySelector('video')!;
    expect(video).toHaveAttribute('poster', media.src);
    expect(video.querySelector('source')).toHaveAttribute('src', media.video);
    expect(screen.getByText(media.alt)).toHaveClass('visually-hidden');
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('pauses and resumes from its button', async () => {
    render(<LoopingClip media={media} />);
    await userEvent.click(screen.getByRole('button', { name: /^pause/i }));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAccessibleName(/^play/i);
  });

  it('waits for a mouse hover when set to play on hover', () => {
    const { container } = render(<LoopingClip media={media} playOn="hover" />);
    const clip = container.firstElementChild!;
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAccessibleName(/^play/i);

    fireEvent.pointerEnter(clip, { pointerType: 'mouse' });
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    fireEvent.pointerLeave(clip, { pointerType: 'mouse' });
    expect(screen.getByRole('button')).toHaveAccessibleName(/^play/i);
  });

  it('plays on hover from the button for touch and keyboard', async () => {
    render(<LoopingClip media={media} playOn="hover" />);
    await userEvent.click(screen.getByRole('button', { name: /^play/i }));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('shows the still, with no button, for reduced motion', () => {
    mockReducedMotion(true);
    const { container } = render(<LoopingClip media={media} />);
    expect(screen.getByRole('img', { name: media.alt })).toHaveAttribute('src', media.src);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('shows the image when there is no video', () => {
    render(<LoopingClip media={{ src: media.src, alt: media.alt }} />);
    expect(screen.getByRole('img', { name: media.alt })).toBeInTheDocument();
  });
});
