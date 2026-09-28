import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LoopingClip } from './LoopingClip';

const media = { src: '/media/clip.jpg', video: '/media/clip.mp4', alt: 'The card flipping open' };

const mockReducedMotion = (reduce: boolean) =>
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) => ({ matches: reduce, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn() }) as unknown as MediaQueryList,
  );

afterEach(() => {
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
  });

  it('pauses and resumes from its button', async () => {
    render(<LoopingClip media={media} />);
    const button = screen.getByRole('button', { name: /^pause/i });
    await userEvent.click(button);
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(button).toHaveAccessibleName(/^play/i);
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
