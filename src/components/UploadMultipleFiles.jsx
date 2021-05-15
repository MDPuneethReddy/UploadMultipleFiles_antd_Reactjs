import React from "react"
import {  Upload,message } from "antd"
import { InboxOutlined } from "@ant-design/icons";
import * as path from "path"
  const { Dragger } = Upload;

export const UploadMultipleFiles=()=>{
  const props = {
    name: 'file',
    multiple: true,
    beforeUpload(info){
      console.log(info.name)
    const ext=path.extname(info.name)
    console.log(ext)
    if(ext!== '.docx' && ext!== '.doc'){
      message.error('You can only upload DOCX/DOC file!');
      return false
    }
    else{
      return true
    }
    },
    action: `${process.env.REACT_SERVER_URL}api/docxToPdf`,
    onChange(info) {
      const { status } = info.file;
      console.log(info)
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
      
    
    return(
        <>
        <h1 style={{textAlign:"center"}}>Convert DOCX/DOC to PDF</h1>
        <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>
        </>
    )
}