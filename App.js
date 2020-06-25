import React from 'react';
//Mengimport TextInput, FlatList, TouchableHighlight, KeyboardAvoidingView
import { StyleSheet,Text, View, TextInput, 
        FlatList, TouchableHighlight, KeyboardAvoidingView } from 'react-native';

class Pahlawan extends React.Component {
  
  //Hapus inisialisasi state dan kode untuk membuat teks tidak berkedip lagi

  render(){
    return (
      <View style={{ alignItems:'center' }}>        
        <Text style={styles.namaPahlawan}>{this.props.nama}</Text>
        <Text style={[styles.asal,{marginBottom:10}]}>Asal : {this.props.asal}</Text>
      </View>
    );
  }
}

export default class App extends React.Component {

  //Menginisialisasi state pahlawan, nama dan asal.
  state = {
    pahlawan:[
      {
        nama: 'Soedirman',
        asal: 'Rembang, Jawa Tengah'
      },
      {
        nama: 'Hasyim Asyari',
        asal: 'Gedang, Jawa Timur'
      },
      {
        nama: 'Pangeran Diponegoro',
        asal: 'Yogyakarta'
      },
      {
        nama: 'Ki Hadjar Dewantara',
        asal: 'Pakualaman'
      },
      {
        nama: 'Bung Tomo',
        asal: 'Surabaya, Jawa Timur'
      }
    ],
    nama:'',
    asal:''
  }

  //Method untuk menambahkan pahlawan ke dalam array pahlawan yang ada di state
  tambahkanPahlawan = ()=>{
    const {nama,asal,pahlawan} = this.state;    

    if(!!nama && !!asal){//Mengecek apakah nama dan asal kosong
      pahlawan.push({ nama,asal });//Jika tidak kosong maka ditambahkan
    }else{
      //Jika kosong maka akan menampilkan pesan peringatan
      alert('Nama dan asal pahlawan tidak boleh kosong.');
    }

    //Mengubah state pahlawan dan mereset state nama dan asal
    this.setState({pahlawan, nama:'', asal:''});
  }


  render() {
    return (      
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.container}>{/* <-- Untuk menghindari TextInput tertutup keyboard */}

        <View style={{flex:0.8}}>

          {/* Menampilkan array pahlawan dengan FlatList */}
          <FlatList
            ref={ref => this.flatList = ref}
            onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
            onLayout={() => this.flatList.scrollToEnd({animated: true})}
            data={this.state.pahlawan}
            keyExtractor={(item,index)=>item.nama}
            renderItem={({item})=>(
              <Pahlawan nama={item.nama} asal={item.asal} />
            )}
          />

          {/* Membuat TextInput untuk nama dan asal pahlawan. */}
          <TextInput 
            style={styles.textInput}
            placeholder="Nama pahlawan"
            value={this.state.nama}
            onChangeText={(text)=>{
              this.setState({nama:text})
            }}
          />

          <TextInput 
              style={styles.textInput}
              placeholder="Asal Pahlawan"
              value={this.state.asal}
              onChangeText={(text)=>{
              this.setState({asal:text})
            }}
            />

          {/* Tombol untuk menambahkan pahlawan. */}
          <TouchableHighlight          
            onPress={this.tambahkanPahlawan}  >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Tambahkan Pahlawan</Text>
            </View>
          </TouchableHighlight>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff'    
  },
  namaPahlawan:{
    color:'red',
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: 10
  },
  asal:{
    fontSize:18
  },
  textInput:{    
    height:50,
    borderWidth: 1,
    borderColor:'black',
    borderRadius: 5,
    margin:10,
    paddingLeft: 10,
    fontSize: 18    
  },
  btn:{
    backgroundColor:'#0fa0d1',
    height:50,
    margin:10,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center'
  },
  btnText:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  }
});