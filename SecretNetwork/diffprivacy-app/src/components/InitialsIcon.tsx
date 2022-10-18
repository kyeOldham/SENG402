import {Text, View} from 'react-native';


const InitialIcon = ({initials} : {initials:string}) => {
    return (
      <View
        style={{
          backgroundColor: '#8A96AA',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          width: 54,
          height: 54,
        }}>
        <Text style={{ color: 'white', fontSize: 15 }}>{initials}</Text>
      </View>
    );
  };

  export default InitialIcon;