import { AnyARecord } from "dns";
import React from "react";

import styles from "./mainContainer.module.scss"

export const Drawing = (
  props: {
    document?: Document,
  }
) => {
 
  if(props.document == null){
    return <>no data</>;
  }
  const rootElement = props.document.children.item(0);
  if(rootElement != null){
    return (
      <DrawElement element={rootElement} />
    );
  }
  else{
    return <>no data</>;
  }
};

function convertProperty(propertyName: string, value?: string){
  return (function () {
    switch(propertyName){
      case "class": return {name: "className", value: value};
      case "style": return {name: propertyName, value: styleToObject(value)};
      case "xmlns:xlink": return {name: "xmlnsXlink", value: styleToObject(value)};
      default: return {name: propertyName, value: value};
    }
  }());
}
function styleToObject(style?: string){
  if (style == null) {
    return {};
  }

  const converted = style.split(";").filter(item => item != null && item.length > 0).reduce(
    (previouseValue, currentStyle) => {
      const [nameBase, value] = currentStyle.split(/^([^:]+):/)
                              .filter((val, i) => i > 0)
                              .map(item => item.trim().toLowerCase());
      const name = nameBase
        .replace(/^-ms-/, 'ms-')
        .replace(/-(.)/g, (_, character) => character.toUpperCase());
      previouseValue[name] = value;
      return previouseValue;
    },
    {} as any
  );

  return converted;
}
const DrawElement = (
  props: {
    element: Element,
  }
) => {

  const reactElement = (function () {
    switch(props.element.tagName){
      case "a": return <a/>;
      case "animate": return <animate/>;
      case "animateMotion": return <animateMotion />;
      case "animateTransform": return <animateTransform/>;
      case "circle": return <circle/>;
      case "clipPath": return <clipPath/>;
      // case "color-profile": return <color-profile/>;
      case "defs": return <defs/>;
      case "desc": return <desc/>;
      // case "discard": return <discard/>;
      case "ellipse": return <ellipse/>;
      case "feBlend": return <feBlend/>;
      case "feColorMatrix": return <feColorMatrix/>;
      case "feComponentTransfer": return <feComponentTransfer/>;
      case "feComposite": return <feComposite/>;
      case "feConvolveMatrix": return <feConvolveMatrix/>;
      case "feDiffuseLighting": return <feDiffuseLighting/>;
      case "feDisplacementMap": return <feDisplacementMap/>;
      case "feDistantLight": return <feDistantLight/>;
      case "feDropShadow": return <feDropShadow/>;
      case "feFlood": return <feFlood/>;
      case "feFuncA": return <feFuncA/>;
      case "feFuncB": return <feFuncB/>;
      case "feFuncG": return <feFuncG/>;
      case "feFuncR": return <feFuncR/>;
      case "feGaussianBlur": return <feGaussianBlur/>;
      case "feImage": return <feImage/>;
      case "feMerge": return <feMerge/>;
      case "feMergeNode": return <feMergeNode/>;
      case "feMorphology": return <feMorphology/>;
      case "feOffset": return <feOffset/>;
      case "fePointLight": return <fePointLight/>;
      case "feSpecularLighting": return <feSpecularLighting/>;
      case "feSpotLight": return <feSpotLight/>;
      case "feTile": return <feTile/>;
      case "feTurbulence": return <feTurbulence/>;
      case "filter": return <filter/>;
      case "foreignObject": return <foreignObject/>;
      case "g": return <g/>;
      // case "hatch": return <hatch/>;
      // case "hatchpath": return <hatchpath/>;
      case "image": return <image/>;
      case "line": return <line/>;
      case "linearGradient": return <linearGradient/>;
      case "marker": return <marker/>;
      case "mask": return <mask/>;
      // case "mesh": return <mesh/>;
      // case "meshgradient": return <meshgradient/>;
      // case "meshpatch": return <meshpatch/>;
      // case "meshrow": return <meshrow/>;
      case "metadata": return <metadata/>;
      case "mpath": return <mpath/>;
      case "path": return <SvgElementWrapper additinal={{child: <path/>}} />;
      case "pattern": return <pattern/>;
      case "polygon": return <polygon/>;
      case "polyline": return <polyline/>;
      case "radialGradient": return <radialGradient/>;
      case "rect": return <rect/>;
      case "script": return <script/>;
      // case "set": return <set/>;
      // case "solidcolor": return <solidcolor/>;
      case "stop": return <stop/>;
      case "style": return <style/>;
      case "svg": return <svg/>;
      case "switch": return <switch/>;
      case "symbol": return <symbol/>;
      case "text": return <text/>;
      case "textPath": return <textPath/>;
      case "title": return <title/>;
      case "tspan": return <tspan/>;
      // case "unknown": return <unknown/>;
      case "use": return <use/>;
      case "view": return <view/>;
    }
  }());
  if(reactElement != null){
    //■プロパティの構成
    const elementProps = props.element.getAttributeNames().reduce((previous, propertyName) => {
      const attribute = props.element.getAttribute(propertyName);
      const property = convertProperty(propertyName, attribute == null ? undefined : attribute);
      previous[property.name] = property.value;
      return previous;
    }, {} as any);

    //■childlenの追加
    const childElements: Element[] = [];
    for(var i = 0; i < props.element.children.length; i++){
      const childElement = props.element.children.item(i);
      if(childElement != null){
        childElements.push(childElement);
      }
    }
    elementProps["children"] = (<>
      {childElements.map((childElement, index) => <DrawElement key={index} element={childElement} />)}
    </>);
    const resultElement = React.cloneElement(reactElement, elementProps);
    return <>{resultElement}</>;
  }
  else{
    return <></>;
  }
};

const SvgElementWrapper = <T extends SVGGraphicsElement> (
  props: {
    additinal: {
      child: React.ReactElement,
    }
    
  } & React.SVGProps<T>
) => {
  const [selectionRect, setSelectionRect] = React.useState<SVGRect | undefined>(undefined);
  const element = React.useRef<T>(null);
  const chidProps: any = { ...props}; 
  delete chidProps.additinal;
  chidProps.ref = element;
  chidProps.onClick = (event: React.MouseEvent<T, MouseEvent>) => {
    if(element.current == null) return;
    console.log("★" ,element.current.getBBox())

    if(selectionRect == null){
      setSelectionRect(element.current.getBBox());
    }
    else{
      setSelectionRect(undefined);
    }
  };
  const child = React.cloneElement(props.additinal.child, chidProps);
  return (
    <>
      
      {selectionRect != null ?
        <rect x={selectionRect.x} y={selectionRect.y} width={selectionRect.width} height={selectionRect.height} stroke="black" strokeWidth={1} opacity={0.1}/>
      : <></>}
      {child}
      
    </>
  )
}