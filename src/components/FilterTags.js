'use client';

/**
 * FilterTags component to display active filters with remove buttons
 * @param {Object} props
 * @param {Object[]} props.activeFilters - Array of active filter objects
 * @param {Function} props.onClearAll - Callback to clear all filters
 */
const FilterTags = ({ activeFilters = [], onClearAll }) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="filter-tags mb-3">
      <div className="d-flex flex-wrap align-items-center gap-2">
        <span className="text-muted small">Active Filters:</span>
        
        {activeFilters.map((filter, index) => (
          <span
            key={`${filter.type}-${filter.value}-${index}`}
            className="badge bg-primary d-inline-flex align-items-center gap-1"
            style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
          >
            {filter.label}
            <button
              type="button"
              className="btn-close btn-close-white"
              style={{ fontSize: '0.6rem' }}
              onClick={filter.onRemove}
              aria-label={`Remove ${filter.label} filter`}
            />
          </span>
        ))}
        
        {activeFilters.length > 1 && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onClearAll}
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterTags;
