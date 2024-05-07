import { format } from 'date-fns';
import { forwardRef, useState } from 'react';
import { Pressable } from 'react-native';
import DateTimePickerModal, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

// Use relative path to remove require cycles
import { View } from '../../Themed/View';
import { TextInputMask } from '../TextInputMask';

interface DateInputProps extends Omit<DateTimePickerProps, 'onConfirm' | 'onCancel'> {
  onChange?: (date: Date) => void;
  inputClassName?: string;
}

const DateInput = forwardRef<DateTimePickerModal, DateInputProps>(
  (
    {
      date,
      onChange,
      inputClassName = 'h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-8',
      ...props
    },
    ref,
  ) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
      onChange?.(date);
      hideDatePicker();
    };

    return (
      <>
        <DateTimePickerModal
          {...props}
          ref={ref}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={date}
        />
        <Pressable onPress={showDatePicker}>
          <View pointerEvents="none">
            <TextInputMask
              keyboardType="numeric"
              mask="[00]/[00]/[0000]"
              placeholder="DD/MM/YYYY"
              value={date ? format(date, 'dd/MM/yyyy') : undefined}
              editable={false}
              className={inputClassName}
            />
          </View>
        </Pressable>
      </>
    );
  },
);

export { DateInput };
