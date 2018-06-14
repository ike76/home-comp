import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import request from "superagent";
import { Image } from "cloudinary-react";
const CLOUDINARY_UPLOAD_PRESET = "homecomp";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/homecomp/upload";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: "",
      cloudPublicId: "",
      images: [
        "homecomp/uuhtruwznqfxuftmom32",
        "homecomp/ksahe7evkjegxtfvqqmc",
        "homecomp/b7ct8bpakfdybvqwzbxt"
      ],
      selectedImageIndex: 0
    };
  }
  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[[0]]);
  }
  onClickSave = () => {
    this.props.setImagePublicID(this.state.images[0]);
  };
  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
        // TODO tell the user that there was an error - toast?
      }
      if (response.body.secure_url !== "") {
        console.log("response body", response.body);
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          images: [response.body.public_id, ...this.state.images]
        });
      }
    });
  }
  dropZone = (
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}
      style={{ background: "lightblue", padding: "1rem" }}
      activeStyle={{ background: "blue" }}
    >
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
  );

  render() {
    return (
      <ImageGrid>
        <Header>
          {this.state.uploadedFileCloudinaryUrl === "" ? (
            this.dropZone
          ) : (
            <div>
              <Image
                cloudName="homecomp"
                publicId={this.state.images[0]}
                width="250"
                crop="scale"
              />
              <button onClick={this.onClickSave}>Use This Image</button>
            </div>
          )}
        </Header>
      </ImageGrid>
    );
  }
}

const ImageGrid = styled.div`
  background: lightgrey;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const Header = styled.div`
  grid-column: 1 / -1;
  text-align: center;
`;

// const rex = {
//   bytes: 1634825,
//   created_at: "2018-06-12T14:07:02Z",
//   etag: "31ce9c49967da42a82f0ced8505f0d65",
//   format: "jpg",
//   height: 4032,
//   original_extension: "JPG",
//   original_filename: "IMG_1317",
//   placeholder: false,
//   public_id: "homecomp/rhbriedlijjnwumssomt",
//   resource_type: "image",
//   secure_url:
//     "https://res.cloudinary.com/homecomp/image/upload/v1528812422/homecomp/rhbriedlijjnwumssomt.jpg",
//   signature: "defc452c7deea9b6dcf114ed92e88bbddfccba00",
//   tags: [],
//   type: "upload",
//   url:
//     "http://res.cloudinary.com/homecomp/image/upload/v1528812422/homecomp/rhbriedlijjnwumssomt.jpg",
//   version: 1528812422,
//   width: 3024
// };
