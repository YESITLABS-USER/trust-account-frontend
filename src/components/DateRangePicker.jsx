import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { format } from 'date-fns'; // ✅ import format
import 'rsuite/dist/rsuite.min.css';

const CustomDateRangePicker = ({ onApply, onCancel }) => {
  const [value, setValue] = useState(null);

  const handleApply = (selectedValue) => {
    setValue(selectedValue);

    if (selectedValue?.length === 2) {
      const formattedRange = selectedValue.map((date) =>
        format(date, 'dd/MM/yyyy') // ✅ format as dd/MM/yyyy
      );
      onApply?.(formattedRange); // ✅ send formatted dates
    } else {
      onCancel?.();
    }
  };

  const handleClear = () => {
    setValue(null);
    onCancel?.();
  };

  return (
    <DateRangePicker
      value={value}
      onChange={handleApply}
      onClean={handleClear}
      showHeader={false}
      placeholder="Select Date Range"
      placement="bottomStart"
      style={{ width: 250 }}
    />
  );
};

export default CustomDateRangePicker;
