import { StyleSheet, TextInput } from 'react-native';
import React, { Ref, useEffect, useRef, useState } from 'react';
import { OTPInputContainer, TextInputHidden, SplitOTPBoxesContainer, SplitBoxes, SplitBoxText, SplitBoxesFocused } from "@constants/ComponentStyled";

interface OTPInputProps {
  code: string;
  setCode: Function;
  maximumLength: number;
  setIsPinReady: Function;
}

export default function OTPInput(props: OTPInputProps) {
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const inputRef = useRef<TextInput>();
  const boxArray = new Array(props.maximumLength).fill(0);

  useEffect(() => {
    props.setIsPinReady(props.code.length === props.maximumLength);
   
    return () => {
      props.setIsPinReady(false);
    };
  }, [props.code]);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current!.focus();
  };
 
  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  const boxDigit = (_value : string, index: number) => {
    const emptyInput = "";
   const digit = props.code[index] || emptyInput;

   const isCurrentValue = index === props.code.length;
   const isLastValue = index === props.maximumLength - 1;
   const isCodeComplete = props.code.length === props.maximumLength;

   const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

   const StyledSplitBoxes =
     isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
   return (
     <StyledSplitBoxes key={index}>
       <SplitBoxText>{digit}</SplitBoxText>
     </StyledSplitBoxes>
   );
  };

  return (
      <OTPInputContainer style={{ marginVertical: 20 }}>
         <SplitOTPBoxesContainer onPress={handleOnPress}>{boxArray.map(boxDigit)}</SplitOTPBoxesContainer>
        <TextInputHidden
        keyboardType='numeric'
          value={props.code}
          onChangeText={props.setCode}
          maxLength={props.maximumLength}
          ref={inputRef}
          onBlur={handleOnBlur}
        />
      </OTPInputContainer>
  );
};

const styles = StyleSheet.create({});