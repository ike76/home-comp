import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class ImageDropBox extends Component {
  handleDrop = files => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "homecomp"); // Replace the preset name with your own
    // formData.append("api_key", "785168849222268"); // Replace API key with your own Cloudinary key
    // formData.append("timestamp", (Date.now() / 1000) | 0);
    const reqParams = { file, upload_preset: "homecomp" };
    return axios
      .post(
        "https://api.cloudinary.com/v1_1/homecomp/image/upload",
        reqParams,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }
      )
      .then(response => {
        const data = response.data;
        console.log(data);
      });
  };

  render() {
    return <Dropzone onDrop={this.handleDrop} />;
  }
}

export default ImageDropBox;
