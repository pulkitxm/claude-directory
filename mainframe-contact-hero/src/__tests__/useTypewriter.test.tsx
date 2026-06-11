import { describe, expect, it, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTypewriter } from '../hooks/useTypewriter';

describe('useTypewriter', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('waits for the start delay before typing', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypewriter('hi!', 10, 100));

    expect(result.current).toEqual({ displayed: '', done: false });

    act(() => {
      vi.advanceTimersByTime(99);
    });
    expect(result.current.displayed).toBe('');
  });

  it('builds the string slice by slice and reports done', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypewriter('hi!', 10, 100));

    act(() => {
      vi.advanceTimersByTime(110);
    });
    expect(result.current).toEqual({ displayed: 'h', done: false });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(result.current).toEqual({ displayed: 'hi', done: false });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(result.current).toEqual({ displayed: 'hi!', done: true });
  });

  it('uses the documented defaults (38ms speed, 600ms delay)', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypewriter('ab'));

    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(result.current.displayed).toBe('');

    act(() => {
      vi.advanceTimersByTime(38 * 2);
    });
    expect(result.current).toEqual({ displayed: 'ab', done: true });
  });

  it('cleans up timers on unmount without erroring', () => {
    vi.useFakeTimers();
    const { unmount } = renderHook(() => useTypewriter('hello', 10, 100));
    unmount();
    expect(() => vi.runAllTimers()).not.toThrow();
  });
});
