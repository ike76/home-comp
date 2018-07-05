import React, { Fragment } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import request from "superagent";
import { Image } from "cloudinary-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const CLOUDINARY_UPLOAD_PRESET = "homecomp";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/homecomp/upload";

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  grid-template-rows: 1fr 6.5rem;
  align-items: center;
`;
const Header = styled.div`
  grid-column: 1 / -1;
  text-align: center;
`;

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class ContactForm extends React.Component {
  state = {
    cloudPublicId: "",
    newImage: false,
    uploading: false
  };
  componentDidMount() {
    if (this.props.imagePublicId)
      this.setState({ cloudPublicId: this.props.imagePublicId });
  }
  onImageDrop(files) {
    this.setState({ uploading: true });
    // this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[[0]]);
  }
  onClickSave = () => {
    this.props.setImagePublicID(this.state.cloudPublicId);
    this.props.closeModal();
  };
  onCancel = () => {
    this.props.closeModal();
  };
  onRemoveImage = () => {
    this.setState({ cloudPublicId: "" });
    this.props.setImagePublicID("");
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
          cloudPublicId: response.body.public_id,
          newImage: true,
          uploading: false
        });
      }
    });
  }
  dropZoneStyle = {
    padding: "1rem",
    height: "293px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  render() {
    const { classes } = this.props;
    const dropZone = (
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}
        style={this.dropZoneStyle}
        activeStyle={{ background: "blue" }}
      >
        {this.state.uploading ? (
          <CircularProgress className={classes.progress} size={50} />
        ) : (
          <p>Drop an image or click to select a file to upload.</p>
        )}
      </Dropzone>
    );
    return (
      <ImageGrid>
        <Header>
          {this.state.cloudPublicId ? (
            <Fragment>
              <div>
                <Image
                  cloudName="homecomp"
                  publicId={this.state.cloudPublicId}
                  width="250"
                  crop="scale"
                />
              </div>
            </Fragment>
          ) : (
            dropZone
          )}
        </Header>
        {this.state.newImage ? (
          <Button
            onClick={this.onClickSave}
            style={{ gridColumn: "1" }}
            variant="outlined"
          >
            SAVE
          </Button>
        ) : this.state.cloudPublicId ? (
          <Button
            onClick={this.onRemoveImage}
            style={{ gridColumn: "1" }}
            variant="outlined"
          >
            REMOVE
          </Button>
        ) : null}
        <Button
          onClick={this.onCancel}
          style={{ gridColumn: "3" }}
          variant="outlined"
        >
          CANCEL
        </Button>
        {/* {this.state.uploadedFileCloudinaryUrl === "" ? (
            this.dropZone
          ) : (
            <div>
              <Image
                cloudName="homecomp"
                publicId={this.state.cloudPublicId}
                width="250"
                crop="scale"
              />
              <button onClick={this.onClickSave}>Use This Image</button>
            </div>
          )} */}
      </ImageGrid>
    );
  }
}

export default withStyles(styles)(ContactForm);
