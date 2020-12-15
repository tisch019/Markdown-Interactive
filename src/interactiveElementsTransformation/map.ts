const YAML = require('yaml');

export default function transform(content: any){ 
    let contentYaml = YAML.parse(content);
    let htmlSnippet: string = `
    <div class="map">
        <script>
        function initMap() {
            var mapOptions = {
              zoom: 15,
              center: new google.maps.LatLng(
                ${contentYaml.position.lat},
                ${contentYaml.position.lng}
              ),
              styles: null,
              mapTypeId:
                google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(
              document.getElementById('googlemap'), mapOptions
            );
        
            marker = new google.maps.Marker({
              map: map,
              position: {
                lat: ${contentYaml.position.lat},
                lng: ${contentYaml.position.lng}
              }
            });
        
            infowindow = new google.maps.InfoWindow({
              content: "<strong>${contentYaml.title}</strong><div>${contentYaml.description}</div>"
            });
        
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });
        
            infowindow.open(map, marker);
          }
        </script>
        <div style="position:relative;height:${contentYaml.height}px;width:${contentYaml.width}px;line-height:1.3">
            <div id="googlemap" style="height:${contentYaml.height}px;width:${contentYaml.width}px;"></div>
        </div>
        <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=${contentYaml.key}&callback=initMap"></script>
    </div>`;
    return htmlSnippet;
 } 