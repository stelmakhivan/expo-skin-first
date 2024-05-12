import { ComponentProps, forwardRef, useMemo } from 'react';
import { CursorValue, ViewStyle } from 'react-native';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { TextInputMask } from '../TextInputMask';

import { useThemeColor } from '@/hooks';

interface DateInputProps extends Omit<DatePicker, 'onChange'> {
  date?: Date;
  onChange?: (date: Date) => void;
  inputClassName?: string;
  style?: ViewStyle;
}

const DateInput = forwardRef<DatePicker, DateInputProps>(
  (
    {
      date,
      onChange,
      inputClassName = 'w-full h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px]',
      style,
      ...props
    },
    ref,
  ) => {
    const textInputBackgroundColor = useThemeColor({}, 'textInputBackground');
    const textInputColor = useThemeColor({}, 'textInputColor');

    const textInputStyle = useMemo(() => {
      return style
        ? [
            {
              backgroundColor: textInputBackgroundColor,
              color: textInputColor,
              cursor: 'pointer' as CursorValue,
            },
            style,
          ]
        : {
            backgroundColor: textInputBackgroundColor,
            color: textInputColor,
            cursor: 'pointer' as CursorValue,
          };
    }, [style, textInputBackgroundColor, textInputColor]);

    const handleChange: ComponentProps<typeof DatePicker>['onChange'] = (date) => {
      if (date instanceof Date) {
        onChange?.(date);
      }
    };

    return (
      <DatePicker
        {...props}
        ref={ref}
        portalId="root-date-portal"
        placeholderText="DD/MM/YYYY"
        selected={date}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        dropdownMode="select"
        showMonthDropdown
        showYearDropdown
        withPortal
        customInput={
          <TextInputMask
            keyboardType="numeric"
            mask="[00]/[00]/[0000]"
            placeholder="DD/MM/YYYY"
            value={date ? format(date, 'dd/MM/yyyy') : undefined}
            editable={false}
            className={inputClassName}
            style={textInputStyle}
          />
        }
      />
    );
  },
);

DateInput.displayName = 'DateInput';

export { DateInput };
