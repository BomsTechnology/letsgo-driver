/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity} from 'react-native';

interface ButtonProps {
  onPress?: Function;
  onFocus?: Function;
  onBlur?: Function;
  style?: {};
  children: JSX.Element;
}

const Button = ({onPress, style, children, onBlur, onFocus}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress ? onPress() : null;
      }}
      style={style}
      onBlur={() => {
        onBlur ? onBlur() : null;
      }}
      onFocus={() => {
        onFocus ? onFocus() : null;
      }}>
      {children}
    </TouchableOpacity>
  );
};
export default Button;
