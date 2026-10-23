import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Animated, Linking, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const WEB_URL = 'https://kwdks94kpr-stonne.github.io/jarvis-webapp/';
const CYAN = '#73e8ff';
export default function App(){
  const [section,setSection]=useState('home');
  const [ready,setReady]=useState(false);
  const spin=useRef(new Animated.Value(0)).current;
  useEffect(()=>{const a=Animated.loop(Animated.timing(spin,{toValue:1,duration:14000,useNativeDriver:true}));a.start();return ()=>a.stop()},[spin]);
  const rotation=spin.interpolate({inputRange:[0,1],outputRange:['0deg','360deg']});
  const openShortcut=async()=>{const url='shortcuts://x-callback-url/run-shortcut?name='+encodeURIComponent('JARVIS Lokale KI')+'&x-success='+encodeURIComponent(WEB_URL+'tests/local-ai-hud-return.html');try{await Linking.openURL(url)}catch(_error){Alert.alert('Kurzbefehle nicht erreichbar','Bitte prüfe, ob der bestehende Kurzbefehl „JARVIS Lokale KI“ auf dem iPhone verfügbar ist. Es wurde nichts verändert.')}};
  return <SafeAreaView style={styles.root}><StatusBar barStyle="light-content" backgroundColor="#030c17"/>
  {section==='home'?<ScrollView contentContainerStyle={styles.home}>
   <Text style={styles.brand}>J.A.R.V.I.S.</Text><Text style={styles.caption}>PERSÖNLICHE KI · NATIVER IPHONE-PROTOTYP</Text>
   <View style={styles.orbitBox}><Animated.View style={[styles.orbit,{transform:[{rotate:rotation}]}]}/><View style={styles.core}><Text style={styles.j}>J</Text></View></View>
   <Text style={styles.heading}>{ready?'JARVIS ONLINE':'SYSTEM BEREIT'}</Text>
   <Text style={styles.description}>{ready?'Alle verfügbaren Systeme bereit.':'Bereit für den Start. Lokale KI und bestehende Webzentrale bleiben erhalten.'}</Text>
   <Pressable accessibilityRole="button" style={styles.primary} onPress={()=>setReady(true)}><Text style={styles.primaryText}>{ready?'SYSTEM BEREIT':'JARVIS STARTEN'}</Text></Pressable>
   <Pressable accessibilityRole="button" style={styles.button} onPress={openShortcut}><Text style={styles.buttonText}>LOKALE KI STARTEN ↗</Text></Pressable>
   <Pressable accessibilityRole="button" style={styles.button} onPress={()=>setSection('legacy')}><Text style={styles.buttonText}>BESTEHENDE JARVIS-ZENTRALE ↗</Text></Pressable>
   <Text style={styles.note}>Entwicklungsstand: Native Oberfläche vorbereitet, noch nicht auf deinem iPhone getestet. Die lokale KI wird weiterhin über den vorhandenen Kurzbefehl gestartet und ihre Antwort öffnet Safari – noch keine native Rückgabe. Keine neue Geräteberechtigung und keine automatische Aktion.</Text>
  </ScrollView>:<View style={styles.legacy}><Pressable style={styles.back} onPress={()=>setSection('home')}><Text style={styles.buttonText}>‹ NATIVER JARVIS-START</Text></Pressable><WebView source={{uri:WEB_URL}} startInLoadingState renderLoading={()=> <ActivityIndicator color={CYAN} style={styles.loading}/>} onShouldStartLoadWithRequest={request=>{const url=request.url;if(url==='about:blank')return true;if(url.startsWith('shortcuts://')){Linking.openURL(url).catch(()=>Alert.alert('Kurzbefehle nicht erreichbar','Bitte den vorhandenen JARVIS-Kurzbefehl prüfen.'));return false}if(url.startsWith(WEB_URL))return true;if(url.startsWith('https://chatgpt.com/')){Linking.openURL(url).catch(()=>Alert.alert('ChatGPT konnte nicht geöffnet werden','Der Befehl wurde nicht automatisch abgesendet.'));return false}if(url.startsWith('http://')||url.startsWith('https://')){Linking.openURL(url).catch(()=>Alert.alert('Link nicht geöffnet','Externe Webseite konnte nicht geöffnet werden.'));return false}return false}}/></View>}
  </SafeAreaView>
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#030c17'},home:{alignItems:'center',paddingHorizontal:22,paddingTop:36,paddingBottom:54},brand:{fontSize:31,letterSpacing:6,fontWeight:'800',color:'#d5faff'},caption:{marginTop:8,fontSize:10,letterSpacing:2,color:'#80b4c9'},orbitBox:{width:278,height:288,alignItems:'center',justifyContent:'center'},orbit:{position:'absolute',width:235,height:235,borderRadius:120,borderWidth:3,borderStyle:'dashed',borderColor:'#3cdcff'},core:{width:165,height:165,borderRadius:90,borderWidth:2,borderColor:CYAN,backgroundColor:'#10405a',alignItems:'center',justifyContent:'center',shadowColor:CYAN,shadowOpacity:.9,shadowRadius:36},j:{fontSize:87,color:'#e4fcff',fontWeight:'200'},heading:{color:CYAN,letterSpacing:3,fontSize:14,fontWeight:'700'},description:{color:'#9ec1d2',lineHeight:20,fontSize:13,textAlign:'center',marginTop:13,marginBottom:26},primary:{backgroundColor:'#057ea6',borderColor:'#63daff',borderWidth:1,width:'100%',padding:17,borderRadius:12,alignItems:'center',marginBottom:10},primaryText:{color:'white',fontWeight:'700',letterSpacing:2},button:{backgroundColor:'#0c2b42',borderColor:'#24688a',borderWidth:1,width:'100%',padding:17,borderRadius:12,alignItems:'center',marginBottom:10},buttonText:{color:'#c4f5ff',fontWeight:'600',letterSpacing:1},note:{color:'#6f9fb1',fontSize:11,lineHeight:18,marginTop:18},legacy:{flex:1},back:{padding:14,backgroundColor:'#09273b'},loading:{flex:1,justifyContent:'center'}});
