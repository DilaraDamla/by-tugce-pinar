import {decode,encode} from 'fast-png';
export function cropPng(input:Uint8Array,rect:{x:number;y:number;width:number;height:number}){
 if(input.length<33||Array.from(input.subarray(0,8)).join(',')!=='137,80,78,71,13,10,26,10')throw Error('Geçerli PNG hazırlanamadı.');
 const view=new DataView(input.buffer,input.byteOffset,input.byteLength),width=view.getUint32(16),height=view.getUint32(20);if(width>1600||height>1600||width<20||height<20)throw Error('Görsel en fazla 1600 piksel olmalı.');
 if(![rect.x,rect.y,rect.width,rect.height].every(Number.isInteger)||rect.x<0||rect.y<0||rect.width<20||rect.height<20||rect.x+rect.width>width||rect.y+rect.height>height||rect.width*rect.height>=width*height)throw Error('Geçerli bir kırpma alanı seçin.');
 const source=decode(input,{checkCrc:true});if(source.depth!==8||![3,4].includes(source.channels))throw Error('Fotoğrafı panelden yeniden seçin.');const data=new Uint8Array(rect.width*rect.height*4);
 for(let y=0;y<rect.height;y++)for(let x=0;x<rect.width;x++){const from=((y+rect.y)*width+x+rect.x)*source.channels,to=(y*rect.width+x)*4;data[to]=source.data[from];data[to+1]=source.data[from+1];data[to+2]=source.data[from+2];data[to+3]=source.channels===4?source.data[from+3]:255;}
 return {data:encode({data,width:rect.width,height:rect.height,channels:4,depth:8},{zlib:{level:6}}),width:rect.width,height:rect.height};
}
