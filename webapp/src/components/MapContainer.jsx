import * as React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  height: "100%",
  width: "80%"
};

class MapContainer extends React.Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onMapClicked = (props, map, e) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
    this.props.onMapClicked(e.latLng.lng(), e.latLng.lat());
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        onClick={this.onMapClicked}
      >
        {this.props.children}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBW_HD5p38bRNcdM2ax9KkiEQ0t0FZAL3s"
})(MapContainer);
