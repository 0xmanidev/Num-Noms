export default class TapInput{
    constructor(element,tapRegions){
        this.element = element !== undefined?element:document;
        this.tapRegions = Array.isArray(tapRegions)?tapRegions:[];
        this.upCount = 0;
        this.listeners={
            touchStart:this.tapRegions.bind(this),
            mouseDown:this.tapRegions.bind(this)
        };
    }
    add(tapRegion){
            this.tapRegion.push(tapRegion);
    }
    listen(){
        this.element.addEventListener("touchstart",this.listeners.touchStart);
        this.element.addEventListener("mousedown",this.listeners.mouseDown);
    }
    tap(event){
        event.preventDefault();

        const isTouchEvent = event.type === "touchstart";
        const targetRect = event.target.getBoundingClientRect();
        const scaleX = (
            this.element.width || this.element.clientWidth)/
            this.element.clientWidth;
        const scaleY = (
            this.element.height||this.element.clientHeight
        )/this.element.clientHeight;
        const x = (
            (isTouchEvent
                ? event.touches[0].clientX
                : event.clientX)-
                targetRect.left
            )*scaleX;
        const y=
        (
            (isTouchEvent
                ?event.touches[0].clientY
                :event.clientY
            )-
            targetRect.top
        )*scaleY;
        for(let i= 0;i< this.tapRegions.length;i++){
            const tapRegion = this.tapRegions[i];
            if(
                tapRegion.boundingBox.isPointWithin(x,y)&&
                typeof tapRegion.onTap ==="function"
            ){
                tapRegion.onTap(x,y);
            }
        }
    }
    detach(){
        this.element.removeEventListener(
            "touchstart",
            this.listeners.touchStart
        );
        this.element.removeEventListener(
            "mousedown",
            this.listeners.mouseDown
        )
    }
}