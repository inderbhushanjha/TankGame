/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { breakStatement } from '@babel/types';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';

const gitaData = require('./src/assets/verses.json')

const Roulette = (props) => {
  const spinValue = new Animated.Value(0)
  let randomDegree = 0;
  // console.log("randomdeg ", randomDegree)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10000deg']
  });

  const setSpinning = () => {
    props.setSpinning(true)
  }

  const spinWheel = () => {
    randomDegree = (Math.random() + 0.1).toFixed(4);
    Animated.timing(spinValue, {
      toValue: randomDegree,
      duration: 5000,
      useNativeDriver: false
    }).start(() => {
      props.setSpinning(false)
      // console.log("spin ",spin)
      let value = (parseFloat(JSON.stringify(spinValue))*10000)%360;
      if(value > 0 && value < 21) {
        props.setChapter("6")
      } else if (value > 20 && value < 41) {
        props.setChapter("14")
      }else if (value > 40 && value < 61) {
        props.setChapter("17")
      }else if (value > 60 && value < 81) {
        props.setChapter("11")
      }else if (value > 80 && value < 101) {
        props.setChapter("18")
      }else if (value > 100 && value < 121) {
        props.setChapter("9")
      }else if (value > 120 && value < 141) {
        props.setChapter("16")
      }else if (value > 140 && value < 161) {
        props.setChapter("3")
      }else if (value > 160 && value < 181) {
        props.setChapter("13")
      }else if (value > 180 && value < 201) {
        props.setChapter("15")
      }else if (value > 200 && value < 221) {
        props.setChapter("12")
      }else if (value > 220 && value < 241) {
        props.setChapter("7")
      }else if (value > 240 && value < 261) {
        props.setChapter("10")
      }else if (value > 260 && value < 281) {
        props.setChapter("1")
      }else if (value > 280 && value < 301) {
        props.setChapter("4")
      }else if (value > 300 && value < 321) {
        props.setChapter("8")
      }else if (value > 320 && value < 341) {
        props.setChapter("2")
      }else if (value > 340) {
        props.setChapter("5")
      }
    });
  }

  React.useEffect(() => {
    if(props.spinning) {
      spinWheel()
    }
  }, [props.spinning])

  return (
    <View>
      <View style={styles.instructions}>
        <Text style={styles.mantraText}>Keep chanting</Text>
        <Text style={styles.mantraText}>Hare Krishna Hare Krishna</Text>
        <Text style={styles.mantraText}>Krishna Krishna Hare Hare</Text>
        <Text style={styles.mantraText}>Hare Rama Hare Rama</Text>
        <Text style={styles.mantraText}>Rama Rama Hare Hare</Text>
      </View>
      <View style={styles.rouletteContainer}>
        <Animated.Image source={require('./roulette.png')} style={{ height: 300, width: 300, transform: [{ rotate: spin }] }} />
      </View>
      <View style={styles.spinButtonContainer}>
        <TouchableOpacity onPress={setSpinning} disabled={props.spinning} style={styles.spinButton}>
          <Text style={styles.spinButtonText} >Spin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ResultText = (props) => {
  return (
    <Text style={styles.resultText}>{props.text}</Text>
  );
}

const Result = (props) => {
  // React.useEffect(() => {
  // }, [props])
  const openModal = () => {
    props.setModalVisible(true)
  }

  React.useEffect(() => {
    if(props.verse) {
      setTimeout(() => {
        // openModal()
      }, 2000);
    }
  }, [props.verse])
  return (
    <View style={styles.resultContainer}>
      <View style={styles.alignCenter}>
        <ResultText text="Chapter" />
        <ResultText text={props.chapter === "" ? '00' : props.chapter} />
      </View>
      <View style={styles.alignCenter}>
        <ResultText text="Verse" />
        <ResultText text={props.verse ? props.verse : '00'} />
      </View>
    </View>
  );
}

const App = () => {
  const [chapter, setChapter] = React.useState("")
  const [verse, setVerse] = React.useState(null)
  const [spinning, setSpinning] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false)


  React.useEffect(() => {
    if(verse) {
      // let possible_verses = Object.keys(gitaData).filter(key => key.includes('1/'))
      // let possible_verse = possible_verses.filter(key => key.split('/')[0]=='1'&&key.includes('1/32'))
      // console.log(possible_verse)
      // console.log(possible_verse)
      let chap = '16' 
      let ver = '1'
      console.log(gitaData[chap][ver])
      if(gitaData[chap][ver] === undefined) {
        let possible_verse = Object.keys(gitaData[chap]).filter(key => key.includes(ver+"-")||key.includes("-"+ver))
        if(possible_verse) {
          console.log("possible verse", possible_verse)
        } else {
          console.log('none')
        }
      }
    }
  }, [verse])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={{ flex: 1 }}>
        <Roulette setChapter={setChapter} setSpinning={setSpinning} spinning={spinning} />
        <Result chapter={chapter} verse={verse} setModalVisible={setModalVisible} />
        {verse?<View style={styles.openModalArrowContainer}>
          <TouchableOpacity onPress={() => {setModalVisible(true)}}>
            <Text style={styles.openModalArrow}>▲</Text>
          </TouchableOpacity>
        </View>:null}
      </View>
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContentContainer}>
          <Text>Chapter: {chapter} verse: {verse}</Text>
          <View style={styles.closeModalContainer}>
            <TouchableOpacity onPress={() => { setModalVisible(false) }}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor:'white',
  },
  alignCenter: {
    alignItems: 'center',
  },
  instructions: {
    alignItems: 'center',
    height: 180,
  },
  mantraText: {
    fontSize: 24,
    fontFamily: 'monospace',
  },
  rouletteContainer: {
    alignItems: 'center',
  },
  spinButtonContainer: {
    alignItems: 'center',
    height: 50,
    // backgroundColor: 'blue',
  },
  spinButton: {
    borderRadius: 18,
    width: 150,
    height: 40,
    backgroundColor: 'green',
    justifyContent:'center',
  },
  spinButtonText: {
    textAlign: 'center',
    fontSize: 25,
  },
  resultContainer: {
    height: 100,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  resultText: {
    fontSize: 25,
  },
  openModalArrowContainer: {
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  openModalArrow: {
    fontSize: 25,
    color: 'grey',
  },
  modalContentContainer: {
    flex: 1,
    marginTop: '5%',
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: '3%',
    paddingTop: '7%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 23,
  },
  closeModalContainer: {
    position:'absolute',
    right: '5%',
    top: '1.5%',
  },
});

export default App;
