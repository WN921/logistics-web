
export function fix(target, decimal = 2){
    if(typeof target === 'string'){
        target = Number(target);
    }
    return target.toFixed(decimal);
}