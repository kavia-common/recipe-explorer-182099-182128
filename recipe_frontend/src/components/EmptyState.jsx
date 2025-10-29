import React from 'react';

/**
 * EmptyState displays a simple title and description when sections have no content yet.
 */
export default function EmptyState({ title = 'Nothing here yet', description = 'This section will be filled in later.' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="surface"
      style={{
        padding: '1rem',
        marginTop: '1rem',
        borderStyle: 'dashed',
        background:
          'radial-gradient(600px 200px at 0% 0%, rgba(236, 72, 153, 0.05), transparent 50%), var(--card-bg)'
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p className="text-muted" style={{ marginBottom: 0 }}>{description}</p>
    </div>
  );
}
