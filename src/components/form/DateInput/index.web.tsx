import { format } from 'date-fns';
import {
  ChangeEventHandler,
  CSSProperties,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useMemo,
} from 'react';

import { useThemeColor } from '@/hooks';

interface DateInputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange'
  > {
  date?: Date | string;
  onChange?: (date: Date) => void;
  inputClassName?: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      date = '',
      onChange,
      inputClassName = 'h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-8',
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
            },
            style,
          ]
        : {
            backgroundColor: textInputBackgroundColor,
            color: textInputColor,
          };
    }, [style, textInputBackgroundColor, textInputColor]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(new Date(event.target.value));
    };

    return (
      <input
        {...props}
        ref={ref}
        type="date"
        placeholder="DD/MM/YYYY"
        value={typeof date === 'string' ? date : format(date, 'yyyy-MM-dd')}
        onChange={handleChange}
        className={inputClassName}
        pattern="\d{2}-\d{2}-\d{4}"
        style={textInputStyle as CSSProperties}
      />
    );
  },
);

DateInput.displayName = 'DateInput';

export { DateInput };
