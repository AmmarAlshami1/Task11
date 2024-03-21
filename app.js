var initialMapExtent = {};

document.addEventListener("DOMContentLoaded", () => {
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Point",
    "esri/widgets/Home",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Measurement",
    "esri/geometry/Circle",
  ], function (
    Map,
    MapView,
    Graphic,
    GraphicsLayer,
    SimpleMarkerSymbol,
    Point,
   
    Home,
    BasemapGallery,
    Measurement,
    Circle,
  ) {
    // Create a map
    let map = new Map({
      basemap: "streets-navigation-vector",
    });

    // Create a map view
    let view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-100, 40],
      zoom: 4,
    });

    /// Add widgets to the view UI
    let homeWidget = new Home({
      view: view,
    });

    let basemapGallery = new BasemapGallery({
      view: view,
    });

    // adds the home widget to the top left corner of the MapView
    view.ui.add(homeWidget, "top-left");

    // // Add widget to the top right corner of the view
    // view.ui.add(basemapGallery, {
    //   position: "top-right",
    // });

    // const measurement = new Measurement({
    //   view: view,
    //   activeTool: "area",
    // });
    // view.ui.add(measurement, "top-right");

    // Create a GraphicsLayer to hold icons
    let graphicsLayerPoints = new GraphicsLayer();

    // Add the GraphicsLayer to the map
    map.add(graphicsLayerPoints);

    // Create a SimpleMarkerSymbol for the icons

    let radioButtons = document.querySelectorAll('input[type="radio"][name="options"]');
  
    radioButtons.forEach(function(radioButton) {
      radioButton.addEventListener('click', function() {
        let selectedValue = document.querySelector('input[type="radio"][name="options"]:checked').value;
       if (selectedValue == "point"){
        
        let iconSymbol = new SimpleMarkerSymbol({
          color: "blue",
          size: "24px", // You can adjust the size of the icons here
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        });
        view.on("click", (e) => {
          // Create a graphic for the point
          const graphic = new Graphic({
            geometry: e.mapPoint,
            symbol: iconSymbol,
          });
          // Add the graphic to the GraphicsLayer
          graphicsLayerPoints.add(graphic);
        });
       }
       
       else if(selectedValue == "circle"){
        view.on("click", (e) => {
           // Create a graphic for the circle
          const radius = document.getElementById('radius').value
        var circleGeometry = new Circle({
          center: e.mapPoint,
          geodesic: true,
          numberOfPoints: 100,
          radius: radius,
          radiusUnit: "kilometers"
        });
        const graphic = new Graphic({ geometry: circleGeometry,
          symbol: {
            type: "simple-fill",
            style: "none",
            outline: {
              width: 2,
              color: "red"
            }
          }})
        // Add the graphic to the GraphicsLayer
        graphicsLayerPoints.add(graphic);

        });
       }
      });
    });

const deleteCircleButton= document.getElementById('DeleteCircleBtn')
const deletePointButton= document.getElementById('DeletePointBtn')
deleteCircleButton.addEventListener('click',(e)=>{
 const graphics= graphicsLayerPoints.graphics.items
for(let i=0;i<graphics.length;i++){
  
  if(graphics[i].geometry.type=="polygon"){
    graphicsLayerPoints.removeAll(graphics)
  }
}

 
 

})
deletePointButton.addEventListener('click',(e)=>{
  const graphics= graphicsLayerPoints.graphics.items
  graphics.forEach((graphic)=>{
    if(graphic.geometry.type=="point"){
      graphicsLayerPoints.removeAll(graphics)
    }
  })
   
 

})
  });

});
