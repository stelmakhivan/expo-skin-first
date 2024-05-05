import { renderHook } from '@testing-library/react-native';

import { useClientOnlyValue } from '.';

describe('useClientOnlyValue', () => {
  it('returns client value after component is mounted', () => {
    const { result } = renderHook(() => useClientOnlyValue('server', 'client'));
    expect(result.current).toBe('client');
  });

  it('updates value when client value changes', () => {
    const { result, rerender } = renderHook(({ client }) => useClientOnlyValue('server', client), {
      initialProps: { client: 'client1' },
    });

    expect(result.current).toBe('client1');

    rerender({ client: 'client2' });
    expect(result.current).toBe('client2');
  });

  it('does not update value when server value changes', () => {
    const { result, rerender } = renderHook(({ server }) => useClientOnlyValue(server, 'client'), {
      initialProps: { server: 'server1' },
    });

    expect(result.current).toBe('client');

    rerender({ server: 'server2' });
    expect(result.current).toBe('client');
  });
});
