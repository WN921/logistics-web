import { mapConfig } from './config';

export function fix(target, decimal = 2) {
    if (typeof target === 'string') {
        target = Number(target);
    }
    return target.toFixed(decimal);
}

export function color16() {
    const r = Math.floor(Math.random() * 16);
    const g = Math.floor(Math.random() * 16);
    const b = Math.floor(Math.random() * 16);
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}
export const transform = (origin, isLong = true) => {
    const defaultLongitude = mapConfig.mapCenter[0];
    const defaultLatitude = mapConfig.mapCenter[1];

    let result;
    if(isLong){
        result = defaultLongitude + (origin / mapConfig.denominator);
    }
    else{
        result = defaultLatitude + (origin / mapConfig.denominator);
    }
    return result;
}