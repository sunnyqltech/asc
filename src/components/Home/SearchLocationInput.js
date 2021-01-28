import React, { useState, useEffect, useRef } from "react";
import { Container,Image,Row,Col,Button,ListGroup,Form } from 'react-bootstrap';
import $ from "jquery";
import Cookies from 'universal-cookie';
let autoComplete;
const cookies = new Cookies();

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(regions)"], componentRestrictions: { country: "au" } }
  );
  
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
	var latitude = addressObject.geometry.location.lat();
	var longitude = addressObject.geometry.location.lng();
	cookies.set('lat', latitude, { path: '/' });
	cookies.set('lng', longitude, { path: '/' });
	if(!$.inArray( "postal_code", addressObject.types )){
		console.log(addressObject.address_components[1].short_name);
		cookies.set('loc', addressObject.address_components[1].short_name, { path: '/' });
		
	}
	else{
		console.log(addressObject.address_components[2].short_name);
		cookies.set('loc', addressObject.address_components[2].short_name, { path: '/' });
	}	
	cookies.set('locationName', query, { path: '/' });	
	
  console.log(addressObject);
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyA-w1yIFUC5apNzpwsAGIxmhPQ2enVHfTE&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
   
     
	  <Form.Control
                                      className="mb-0 full"
                                      ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
                                      placeholder="Location"
									  value={query}
                                  />
	  
    
  );
}

export default SearchLocationInput;