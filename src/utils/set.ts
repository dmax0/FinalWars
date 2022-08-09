/**
 * 对于srcObj中的每一个键值对<key, value>
 * 都调用destObj中的callback(key, value)
 * 
 * @param destObj 
 * @param srcObj 
 * @param callback 
 */
export const set = (
  destObj: object,
  srcObj: object,
  callback: (key: string, value: any) => any
) => {
  if (!destObj || !srcObj) {
    throw new Error(`set: ${destObj} or ${srcObj} is null`);
  }
  if (!destObj.hasOwnProperty(callback)) {
    throw new Error(`set: ${destObj} has no property ${callback}`);
  }

  for (const key in srcObj) {
    try {
        destObj.callback(key, srcObj[key]);
    } catch (error) {
        console.log(error);
    }

  }
};
