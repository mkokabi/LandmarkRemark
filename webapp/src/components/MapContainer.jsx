import * as React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  height: "100%",
  width: "80%"
};

export const default_center = {
  x: -122.12,
  y: 47.67
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => { 
    default_center.x = position.coords.longitude;
    default_center.y = position.coords.latitude;
  }, error => {
    alert('Can not use your GPS ' + error);
  }
)} else {
  alert('Can not use your GPS');
}

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
        initialCenter={{ lat: default_center.y, lng: default_center.x }}
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
