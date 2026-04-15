import React from 'react';
import { CATEGORIES, Task } from '../types';

interface CategorySliderProps {
  selectedCategory: Task['category'];
  onCategoryChange: (category: Task['category']) => void;
  taskCounts: Record<string, number>;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  selectedCategory,
  onCategoryChange,
  taskCounts,
}) => {
  return (
    <div className="category-slider">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
          <span className="count-badge">{taskCounts[category] || 0}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
