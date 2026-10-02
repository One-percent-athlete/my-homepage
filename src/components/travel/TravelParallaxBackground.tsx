// The shared square camera supplies all scroll motion. A second parallax
// subscription here made photographs fight the parent projection.
interface TravelParallaxBackgroundProps { image: string; opacity?: number; }
export default function TravelParallaxBackground({image,opacity=1}:TravelParallaxBackgroundProps){
 return <div aria-hidden="true" className="travel-parallax-background" style={{backgroundImage: `url('${image}')`,opacity}}/>;
}
