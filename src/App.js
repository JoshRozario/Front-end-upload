import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js'
import Upload from './components/Upload.js'
import { height } from '@mui/system';



function App() {
  return (
    
    <div style={styles.container} className="App">
      <Navbar style = {styles.navbar}></Navbar>
      <h3>Simply upload a file with an Abn number and this app will return some information</h3>
      <div style={styles.upload} >
        <Upload></Upload>
      </div>
    </div>
  );
}

export default App;

let styles = {
  container:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  navbar:{
    width:"100%",
  },
  upload: {
    width: "30%",
  }
}
