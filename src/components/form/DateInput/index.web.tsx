import { forwardRef, useMemo, MouseEvent, KeyboardEvent } from 'react';
import { CursorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { TextInputMask } from '../TextInputMask';

import { useThemeColor } from '@/hooks';

type DateInputProps = {
  date?: Date;
  onChange?: (date: Date) => void;
  inputClassName?: string;
  style?: ViewStyle;
} & DatePickerProps;

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

    const textInputStyle = useMemo<StyleProp<TextStyle> | StyleProp<TextStyle>[]>(() => {
      return style
        ? ([
            {
              backgroundColor: textInputBackgroundColor,
              color: textInputColor,
              cursor: 'pointer' as CursorValue,
            },
            style,
          ] as StyleProp<TextStyle>[])
        : ({
            backgroundColor: textInputBackgroundColor,
            color: textInputColor,
            cursor: 'pointer' as CursorValue,
          } as StyleProp<TextStyle>);
    }, [style, textInputBackgroundColor, textInputColor]);

    const handleChange = (
      date: Date | null,
      _event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    ) => {
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
        selectsRange={undefined}
        selectsMultiple={undefined}
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
