import styled from "styled-components/native";
import Colors from "./colors";


export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const TextInputHidden = styled.TextInput`
 width: 300px;
 border-color: #e5e5e5;
 border-width: 1px;
 border-radius: 5px;
 padding: 15px;
 position: absolute;
 opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 95%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
 borderWidth: 1px;
 borderColor: ${Colors.primaryColor};
 border-radius: 5px;
 padding: 12px;
 min-width: 50px;
 shadowColor: '#171717';
 elevation: 0;
 backgroundColor: ${Colors.whiteTone2};
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: ${Colors.grayTone1};
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
 border-color: #ecdbba;
 background-color: grey;
`;

export const Divider = styled.View`
 width: 100%;
 height: 1px;
 background-color: ${Colors.grayTone4};
`;

export const SeatBoxWhite = styled.Text`
 font-size: 20px;
 text-align: center;
 font-family: Poppins_600SemiBold;
 padding: 5px;
 width: 40px;
 height: 40px;
 border-radius: 8px;
 backgroundColor: ${Colors.whiteTone1};
 color: ${Colors.grayTone1};
`;

export const SeatBoxYellow = styled.Text`
 font-size: 20px;
 text-align: center;
 font-family: Poppins_600SemiBold;
 padding: 5px;
 width: 40px;
 height: 40px;
 border-radius: 8px;
 backgroundColor: ${Colors.primaryColor};
 color: ${Colors.whiteTone1};
`;

export const SeatBoxGreen = styled.Text`
 font-size: 20px;
 text-align: center;
 font-family: Poppins_600SemiBold;
 padding: 5px;
 width: 40px;
 height: 40px;
 border-radius: 8px;
 backgroundColor: ${Colors.accentGreen};
 color: ${Colors.whiteTone1};
`;

export const SeatBoxGray = styled.Text`
 font-size: 20px;
 text-align: center;
 font-family: Poppins_600SemiBold;
 padding: 5px;
 width: 40px;
 height: 40px;
 border-radius: 8px;
 backgroundColor: ${Colors.grayTone4};
 color: ${Colors.grayTone2};
`;