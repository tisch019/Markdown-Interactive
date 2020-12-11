export default function transform(content: any){ 
    let contentJson = JSON.parse(content);
    let htmlSnippet: string = `
    <div class="map">
        <script>
        function initMap() {
            var mapOptions = {
              zoom: 15,
              center: new google.maps.LatLng(
                ${contentJson.position[0]},
                ${contentJson.position[1]}
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
                lat: ${contentJson.position[0]},
                lng: ${contentJson.position[1]}
              }
            });
        
            infowindow = new google.maps.InfoWindow({
              content: "<strong>${contentJson.title}</strong><div>${contentJson.description}</div>"
            });
        
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });
        
            infowindow.open(map, marker);
          }
        </script>
        <div style="position:relative;height:${contentJson.height}px;width:${contentJson.width}px;line-height:1.3">
            <div id="googlemap" style="height:${contentJson.height}px;width:${contentJson.width}px;"></div>
        </div>
        <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=${contentJson.key}&callback=initMap"></script>
    </div>`;
    return htmlSnippet;
 } 