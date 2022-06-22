import styled from "styled-components";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: white;
`;

export const List = styled.FlatList`
  padding-vertical: 25px;
  padding-horizontal: 20px;
`;

export const ItemsView = styled.View`
  flex-direction: row;
  padding: 15px;
  align-items: center;
  border-radius: 8px;
  justify-content: space-between;
  margin-vertical: 8px;
  background-color: #dcdde1;
`;

export const Item = styled.TouchableOpacity``;

export const ListText = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding-vertical: 15px;
  padding-horizontal: 15px;
`;

export const Input = styled.TextInput`
  background: #dcdde1;
  width: 80%;
  padding: 12px;
  border-radius: 8px;
`;

export const AddIcon = styled.TouchableOpacity`
  background: #2f3640;
  width: 50px;
  height: 50px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const AddIconText = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const EmptyListContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListText = styled.Text`
  margin: 250px 0 250px 0;
  color: #718093;
`;
