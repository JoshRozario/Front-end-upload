import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import Button from '@mui/material/Button';
import axios from 'axios'
import svg from '../logo.svg';
var api_key = 'pk_test_ee95329563dab4bb69da1119d489aabb'

let searchVal = "ABN";


export default function Upload(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [response, setResponse]= useState('')
  const [error, setError]= useState(null)


  const validateABN = async (params) => {
    if (params!="error"){
      axios.request({
          method: 'POST',
          url: 'https://api.vatstack.com/v1/validations?query=54633372666',
          headers:{
              'X-API-KEY': api_key
          },
          data: {
              query: params
          },
      })
      .then(function(result) {
          console.log(result.data)
          setResponse(result)
        })
      .catch(function(err) {
      console.error(err.response.data)
      })
    } else{
      setError("Invalid ABN or no ABN was found")
    }
  }


  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    if (response){
      console.log(response)
    } else{
      //pass
    }
  }, [response])

  useEffect(() => {
    setError(null)
    if (acceptedFiles[0]){
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log(acceptedFiles[0])
        var formData = new FormData();
        formData.append("pdf", acceptedFiles[0])
         uploadFile(formData)
      }
      reader.readAsDataURL(acceptedFiles[0])
    }
  }, [acceptedFiles])


  const uploadFile = async (params) => {
    axios.post('http://localhost:9000',params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(result) {
      if(typeof(result.data.results) !== "undefined" ){
        let searchArr = (result.data.results.fields[0].value.fields)
        let abnFound = false
        searchArr.forEach(element =>{
          if (element.label.search(/abn/i) > 1){
              console.log("abn found!")
              let abn = element.value.replace(/ /g,'').match(/[0-9]{11}/)
              validateABN(abn[0])
              abnFound = true
          }
        })
        if (abnFound!=true){
          setError("Invalid ABN or no ABN was found")
        }
      }else{
      validateABN("error")
    }
    })
    .catch(function(err) {
    // Handle the error.
    console.error(err)
    })
  }


  return (
    <section className="container">
      <div style={styles.container} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      
      <aside>
        <ul>{files}</ul>
      {response.data &&
  
      <div>
        <h1>
          Extracted Data based on ABN from document
        </h1>
        <h1>
          Company Name: {response.data.company_name}
        </h1>
        <h1>
          Address: {response.data.company_address}
        </h1>
        <h1>
          ABN number: {response.data.vat_number}
        </h1>
        <h1>
          Valid ABN: {response.data.valid.toString()}
        </h1>
        
      </div>}
      {error &&
      <div>
        <h1>{error}</h1>
      </div>}
      </aside>
    </section>
  );
}


let styles = {
  container: {
    backgroundColor: "#fafafa",
    borderStyle: "dashed",
    borderRadius: "5px",
    color: "#bdbdbd",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: "5%"
  }
}