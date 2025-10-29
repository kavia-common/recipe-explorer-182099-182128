import React from 'react';

/**
 * EmptyState displays a simple title and description when sections have no content yet.
 */
export default function EmptyState({ title = 'Nothing here yet', description = 'This section will be filled in later.' }) {
  return (
    <div role="status" aria-live="polite" style={{ padding: '1rem', marginTop: '1rem', border: `1px dashed var(--border-color)`, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>{description}</p>
    </div>
  );
}
