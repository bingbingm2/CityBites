'use client';

import { ActionLogEntry } from '@/lib/types';

interface Props {
  logs: ActionLogEntry[];
  isRunning: boolean;
}

export default function LiveActionLog({ logs, isRunning }: Props) {
  return (
    <div className="card" style={{ padding: '24px' }}>
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: isRunning ? 'var(--accent-teal)' : 'var(--text-muted)',
            boxShadow: isRunning ? '0 0 8px var(--accent-teal)' : 'none',
          }}
        />
        Live Action Log
        {isRunning && (
          <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
            Processing...
          </span>
        )}
      </h3>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {logs.length === 0 && !isRunning && (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Waiting to start...
          </p>
        )}

        {logs.map((log, i) => (
          <div
            key={i}
            className="flex items-start gap-3 animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Status icon */}
            <div className="mt-0.5 flex-shrink-0">
              {log.status === 'done' && (
                <span className="text-base animate-check-pop" style={{ color: 'var(--accent-teal)' }}>
                  ✓
                </span>
              )}
              {log.status === 'running' && (
                <span
                  className="inline-block w-4 h-4 border-2 rounded-full"
                  style={{
                    borderColor: 'var(--accent-primary)',
                    borderTopColor: 'transparent',
                    animation: 'spin-slow 1s linear infinite',
                  }}
                />
              )}
              {log.status === 'error' && (
                <span style={{ color: '#ff3b30' }}>✕</span>
              )}
              {log.status === 'pending' && (
                <span style={{ color: 'var(--text-muted)' }}>○</span>
              )}
            </div>

            {/* Message */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm"
                style={{
                  color:
                    log.status === 'done'
                      ? 'var(--text-primary)'
                      : log.status === 'running'
                      ? 'var(--accent-primary)'
                      : log.status === 'error'
                      ? '#ff3b30'
                      : 'var(--text-muted)',
                }}
              >
                {log.message}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isRunning && (
          <div className="animate-shimmer rounded-lg h-8" />
        )}
      </div>
    </div>
  );
}
